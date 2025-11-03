import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setSubscriptionLoader } from "../../redux/store/subscriptions/subscriptionsSlice"
import { subscriptionDetails } from "./subscriptionDetails"
import { calenderDetails } from "./calenderDetails"

export const unpauseMeal = createAsyncThunk("UNPAUS_MEALS", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSubscriptionLoader(true))
  try {
    const data: any = args
    const response: any = await client.post(endpoints.unpauseMeal, data)
    console.log("response-----unpauseMeal-----------", response)
    thunkApi.dispatch(subscriptionDetails({}))
    thunkApi.dispatch(calenderDetails({}))
  } catch (err) {
    thunkApi.dispatch(setSubscriptionLoader(false))
  }
})
