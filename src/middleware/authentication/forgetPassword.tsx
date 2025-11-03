import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setForgotPasswordLoader } from "../../redux/store/auth/forgotPasswordSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { init_token } from "../../network"
import { Alert } from "react-native"
import { Trans } from "../../translation"

interface UserPersonlInfoArgs {
  mobileNumber?: string
  password?: string
  navigation?: any
}
interface SendSmsOtpArgs {
  mobileNumber: string
  navigation?: any
}
interface VerifyResetOtpCodeArgs {
  mobileNumber: string
  otpCode: string
  navigation?: any
}
interface ResetPasswordArgs {
  password: string
  navigation?: any
}

export const userPersonlInfo_ForgotPassword = createAsyncThunk(
  "USER_PERSONL_INFO",
  async (args: UserPersonlInfoArgs, thunkApi) => {
    thunkApi.dispatch(setForgotPasswordLoader(true))
    try {
      const data = {
        mobileNumber: args?.mobileNumber,
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
        thunkApi.dispatch(setForgotPasswordLoader(false))
      } else if (response.data.registerUser === 1) {
        thunkApi.dispatch(
          sendSmsOtp({
            mobileNumber: args?.mobileNumber,
            navigation: args?.navigation,
          }),
        )
      }
    } catch (err) {
      thunkApi.dispatch(setForgotPasswordLoader(false))
    }
  },
)

export const sendSmsOtp = createAsyncThunk(
  "SEND_SMS_OTP",
  async (args: SendSmsOtpArgs, thunkApi) => {
    thunkApi.dispatch(setForgotPasswordLoader(true))
    try {
      const data: any = {
        mobileNumber: args?.mobileNumber,
        language: "en",
        centerId: endpoints.branch_code,
      }
      const response: any = await client.post(endpoints.sendSmsOtp, data)
      if (response.data.message == "success") {
        thunkApi.dispatch(setForgotPasswordLoader(false))
        args?.navigation.navigate("VerificationCode", {
          mobileNumber: args?.mobileNumber,
          otpCode: response.data.otpCode,
        })
      } else {
        thunkApi.dispatch(setForgotPasswordLoader(false))
      }
    } catch (err) {
      thunkApi.dispatch(setForgotPasswordLoader(false))
    }
  },
)

export const verifyResetOtpCode = createAsyncThunk(
  "VERIFY_RESET_OTP_CODE",
  async (args: VerifyResetOtpCodeArgs, thunkApi) => {
    thunkApi.dispatch(setForgotPasswordLoader(true))
    try {
      const data: any = {
        mobileNumber: args?.mobileNumber,
        otpCode: args?.otpCode,
        centerId: endpoints.branch_code,
      }
      const response: any = await client.post(endpoints.verifyResetOtpCode, data)
      if (response?.data?.accessToken) {
        thunkApi.dispatch(setForgotPasswordLoader(false))
        init_token(`Bearer ${response.data.accessToken}`)
        await AsyncStorage.setItem("token", `Bearer ${response.data.accessToken}`)
        args?.navigation.navigate("ResetPassword")
      } else {
        thunkApi.dispatch(setForgotPasswordLoader(false))
        Alert.alert(Trans("cantVerifyOtp"))
      }
    } catch (err) {
      thunkApi.dispatch(setForgotPasswordLoader(false))
      Alert.alert(Trans("error"), err.message)
    }
  },
)
export const resetPassword = createAsyncThunk(
  "RESET_PASSWORD",
  async (args: ResetPasswordArgs, thunkApi) => {
    thunkApi.dispatch(setForgotPasswordLoader(true))
    try {
      const data: any = {
        newPassword: args?.password,
        centerId: endpoints.branch_code,
      }
      const response: any = await client.post(endpoints.resetPassword, data)
      if (response.data?.message == "success") {
        console.log("response------resetPassword----------", response)
        thunkApi.dispatch(setForgotPasswordLoader(false))
        Alert.alert(Trans("changedSuccessfully"))
        args?.navigation.navigate("Login")
      } else {
        thunkApi.dispatch(setForgotPasswordLoader(false))
        Alert.alert(Trans("cantTesetPasswordTryAgain"))
      }
    } catch (err) {
      thunkApi.dispatch(setForgotPasswordLoader(false))
      Alert.alert(Trans("error"), err.message)
    }
  },
)
