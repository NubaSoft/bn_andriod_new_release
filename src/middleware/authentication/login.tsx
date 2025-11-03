import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { Alert } from "react-native"
import * as Device from "expo-device"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setLoginLoader } from "../../redux/store/auth/loginSlice"
import { init_token } from "../../network"
import { Trans } from "../../translation"
import { userData } from "../storage/user"

interface UserPersonlInfoArgs {
  mobilephone?: string
  password?: string
  navigation?: any
}
interface LoginArgs {
  mobilephone?: string
  password?: string
  navigation?: any
}

export const userPersonlInfo = createAsyncThunk(
  "USER_PERSONL_INFO",
  async (args: UserPersonlInfoArgs, thunkApi) => {
    thunkApi.dispatch(setLoginLoader(true))
    try {
      const data = {
        mobileNumber: args?.mobilephone,
        centerId: endpoints?.branch_code,
      }
      const response: any = await client.post(endpoints.userPersonlInfo, data)
      // user test 6006356 - aa60063569
      // response status
      // response.data.registerUser === 0 -> User does not exist in the system (error)
      // response.data.registerUser === 2 -> User exists in the system but is not registered for this branch (error)
      // response.data.registerUser === 1 -> User exists in the system and registered for this branch (success)

      if (response.data.registerUser === 2 || response.data.registerUser == 0) {
        Alert.alert(Trans("loginFailed"), Trans("checkLoginDataAndTryAgain"))
        thunkApi.dispatch(setLoginLoader(false))
      } else if (response.data.registerUser === 1) {
        thunkApi.dispatch(
          login({
            mobilephone: args?.mobilephone,
            password: args?.password,
            navigation: args?.navigation,
          }),
        )
      }
    } catch (err) {
      thunkApi.dispatch(setLoginLoader(false))
    }
  },
)

export const login = createAsyncThunk("LOGIN", async (args: LoginArgs, thunkApi) => {
  try {
    thunkApi.dispatch(setLoginLoader(true))
    const data = {
      mobileNumber: args?.mobilephone,
      password: args?.password,
      deviceId: "ID",
      deviceOsType: Device.osName,
      deviceOsVersion: Device.osVersion,
      deviceModel: Device.modelName,
      appVersion: "1.0.0",
      language: "en",
      // platform: Device.osName,
      pushNotificationToken: "PUSH_NOTIFICATION_TOKEN1",
      centerId: endpoints?.branch_code,
    }
    const response: any = await client.post(endpoints.login, data)
    // response status
    // response.data.id -> (success)
    // !response.data.id -> (error)

    if (response?.data?.id) {
      init_token(`Bearer ${response.data.accessToken}`)
      thunkApi.dispatch(userData(response.data))
      await AsyncStorage.setItem("token", `Bearer ${response.data.accessToken}`)
      await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true))
      await AsyncStorage.setItem("user_data", JSON.stringify(response.data))
      args?.navigation.navigate("Tabs")
    } else {
      Alert.alert(Trans("loginFailed"), Trans("checkLoginDataAndTryAgain"))
    }
    thunkApi.dispatch(setLoginLoader(false))
  } catch (err) {
    thunkApi.dispatch(setLoginLoader(false))
    Alert.alert(Trans("loginFailed"), Trans("checkLoginDataAndTryAgain"))
  }
})
