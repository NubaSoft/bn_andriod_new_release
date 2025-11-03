import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import {
  setSubscribtionStartDatesData,
  setSubscriptionLoader,
} from "../../redux/store/subscriptions/subscriptionsSlice"

export const subscribtionStartDates = createAsyncThunk(
  "DIET_TYPES",
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setSubscriptionLoader(true))
    try {
      const data: any = {
        offDays: args?.offDays,
        renew: args?.renew_send,
        centerId: endpoints.branch_code,
      }
      const response: any = await client.post(endpoints.subscribtionStartDates, data)
      console.log("response---------subscribtionStartDates-----------", response)

      if (response.status === 200) {
        thunkApi.dispatch(setSubscriptionLoader(false))
        thunkApi.dispatch(setSubscribtionStartDatesData(response.data?.subscriptionStartDates))
      }
    } catch (err) {
      thunkApi.dispatch(setSubscriptionLoader(false))
    }
  },
)
