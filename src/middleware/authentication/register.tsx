import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setRegisterLoader } from "../../redux/store/auth/registerSlice"
import { Alert } from "react-native"
import { Trans } from "../../translation"

interface UserPersonlInfoArgs {
  firstName?: string
  mobileNumber?: string
  email?: string
  dob?: Date
  navigation?: any
}
interface SendSmsOtpArgs {
  firstName?: string
  mobileNumber?: string
  email?: string
  dob?: Date
  navigation?: any
  compleat?: string
}
interface SignupAddPersonalDataInBranchArgs {
  centerId: string
  firstName: string
  mobileNumber: string
  otpVerified: number
  password: string
  navigation?: any
}
interface SignupAddPersonalDataInSystemArgs {
  language: string
  platform: string
  branch_id: string
  centerId: string
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  dob: string
  otpVerified: number
  password: string
  confirmPassword: string
  gender: number
  height: number
  weight: number
  deliveryTime: number
  addressDetails: {
    area: number
    deliveryTime: number
    block: string
    street: string
    building: string
    flat: string
    jadda: string
    floor: string
    notes: string
  }
  deviceDetails: {
    appVersion: string
    deviceId: string
    deviceModel: string
    deviceOsType: string
    deviceOsVersion: string
    pushNotificationToken: string
  }
  navigation?: any
}

export const userPersonlInfo_Register = createAsyncThunk(
  "USER_PERSONAL_INFO",
  async (args: UserPersonlInfoArgs, thunkApi) => {
    thunkApi.dispatch(setRegisterLoader(true))
    try {
      const data: any = {
        mobileNumber: args?.mobileNumber,
        centerId: endpoints.branch_code,
      }
      const response: any = await client.post(endpoints.userPersonlInfo2, data)
      // response status
      // response.data.registerUser === 0 -> User does not exist in the system (new user in system -> )
      // response.data.registerUser === 2 -> User exists in the system but is not registered for this branch (new user in branch)
      // response.data.registerUser === 1 -> User exists in the system and registered for this branch (user is already in branch)

      if (response.data.registerUser === 0) {
        thunkApi.dispatch(sendSmsOtp({ ...args, ...{ compleat: "no" } }))
      } else if (response.data.registerUser === 2) {
        thunkApi.dispatch(sendSmsOtp({ ...args, ...{ compleat: "yes" } }))
      } else if (response.data.registerUser === 1) {
        Alert.alert(Trans("registerationFailed"), Trans("mobileAlreadyUse"), [{ text: "OK" }])
        thunkApi.dispatch(setRegisterLoader(false))
      } else {
        Alert.alert(Trans("registerationFailed"), Trans("mobileAlreadyUse"), [{ text: "OK" }])
        thunkApi.dispatch(setRegisterLoader(false))
      }
    } catch (err) {
      Alert.alert(Trans("somethingWentWrong"), Trans("tryAgainLater"), [{ text: "OK" }])
      thunkApi.dispatch(setRegisterLoader(false))
    }
  },
)

export const sendSmsOtp = createAsyncThunk(
  "SEND_SMS_OTP",
  async (args: SendSmsOtpArgs, thunkApi) => {
    thunkApi.dispatch(setRegisterLoader(true))
    try {
      const data: any = {
        mobileNumber: args?.mobileNumber,
        language: "en",
        centerId: endpoints.branch_code,
      }
      const response: any = await client.post(endpoints.sendSmsOtp2, data)
      if (response?.data?.message === "success") {
        thunkApi.dispatch(setRegisterLoader(false))
        args?.navigation.navigate("RegisterCode", {
          firstName: args?.firstName,
          mobileNumber: args?.mobileNumber,
          email: args?.email,
          dob: args?.dob,
          compleat: args?.compleat,
          otpCode: response.data.otpCode,
        })
      } else {
        // Alert.alert(lang[lang.lang].cantSendOTPTryAgain2)
        thunkApi.dispatch(setRegisterLoader(false))
      }
    } catch (err) {
      // Alert.alert(lang[lang.lang].error, err?.message)
      thunkApi.dispatch(setRegisterLoader(false))
    }
  },
)

export const signupAddPersonalDataInBranch = createAsyncThunk(
  "SIGNUP_ADD_PERSONAL_DATA_BRANCH",
  async (args: SignupAddPersonalDataInBranchArgs, thunkApi) => {
    thunkApi.dispatch(setRegisterLoader(true))
    try {
      const data: any = args
      const response: any = await client.post(endpoints.signupAddPersonalData, data)
      if (response.data.message === "success") {
        thunkApi.dispatch(setRegisterLoader(false))
        Alert.alert(Trans("registeredSuccessfully"))
        args?.navigation.navigate("Login")
      } else {
        Alert.alert(Trans("somethingWentWrong"), Trans("tryAgainLater"), [{ text: "OK" }])
        thunkApi.dispatch(setRegisterLoader(false))
      }
    } catch (err) {
      Alert.alert(Trans("somethingWentWrong"), Trans("tryAgainLater"), [{ text: "OK" }])
      thunkApi.dispatch(setRegisterLoader(false))
    }
  },
)

export const signupAddPersonalDataInSystem = createAsyncThunk(
  "SIGNUP_ADD_PERSONAL_DATA_SYSTEM",
  async (args: SignupAddPersonalDataInSystemArgs, thunkApi) => {
    thunkApi.dispatch(setRegisterLoader(true))
    try {
      const data: any = args
      const response: any = await client.post(endpoints.signupAddPersonalData, data)
      console.log("response--------signupAddPersonalDataInSystem-----------", response)
      if (response.data.message === "success") {
        thunkApi.dispatch(setRegisterLoader(false))
        Alert.alert(Trans("registeredSuccessfully"))
        args?.navigation.navigate("Login")
      } else {
        Alert.alert(Trans("somethingWentWrong"), Trans("tryAgainLater"), [{ text: "OK" }])
        thunkApi.dispatch(setRegisterLoader(false))
      }
    } catch (err) {
      Alert.alert(Trans("somethingWentWrong"), Trans("tryAgainLater"), [{ text: "OK" }])
      thunkApi.dispatch(setRegisterLoader(false))
    }
  },
)
