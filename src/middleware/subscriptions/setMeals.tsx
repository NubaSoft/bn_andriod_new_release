import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setSubscriptionLoader } from "../../redux/store/subscriptions/subscriptionsSlice"
import { subscriptionDetails } from "./subscriptionDetails"
import { calenderDetails } from "./calenderDetails"
import { Alert } from "react-native"
import { Trans } from "../../translation"

export const setMeals = createAsyncThunk("SET_MEALS", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSubscriptionLoader(true))
  try {
    const data: any = args.data
    console.log("data------------>>>>>>>", data)
    const response: any = await client.post(endpoints.setMeals, data)
    console.log("response-----setMeals-----------", response)
    if (response.status == 200) {
      thunkApi.dispatch(setSubscriptionLoader(false))
      args.navigation.goBack()
      thunkApi.dispatch(subscriptionDetails({}))
      thunkApi.dispatch(calenderDetails({}))
      Alert.alert(Trans("mealsTodaySuccessfullySelected"))
    } else {
      thunkApi.dispatch(setSubscriptionLoader(false))
      Alert.alert(Trans("somethingWentWrong"), Trans("tryAgainLater"), [{ text: "OK" }])
    }
  } catch (err) {
    thunkApi.dispatch(setSubscriptionLoader(false))
    Alert.alert(Trans("somethingWentWrong"), Trans("tryAgainLater"), [{ text: "OK" }])
  }
})
