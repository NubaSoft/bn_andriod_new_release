import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setSubscriptionLoader } from "../../redux/store/subscriptions/subscriptionsSlice"
import { subscriptionDetails } from "./subscriptionDetails"
import { calenderDetails } from "./calenderDetails"

export const pauseMeal = createAsyncThunk("PAUS_MEALS", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSubscriptionLoader(true))
  try {
    const data: any = args.data
    const response: any = await client.post(endpoints.pauseMeal, data)
    console.log("response-----pauseMeal-----------", response)
    thunkApi.dispatch(subscriptionDetails({}))
    thunkApi.dispatch(calenderDetails({}))
    args.navigation.goBack()
  } catch (err) {
    thunkApi.dispatch(setSubscriptionLoader(false))
  }
})
