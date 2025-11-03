import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import {
  setRenewSend,
  setSubscriptionDetails,
  setSubscriptionLoader,
} from "../../redux/store/subscriptions/subscriptionsSlice"
import moment from "moment"

export const subscriptionDetails = createAsyncThunk("DIET_TYPES", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSubscriptionLoader(true))
  try {
    const response: any = await client.get(
      `${endpoints.subscriptionDetails}?center_id=${endpoints.branch_code}`,
    )
    console.log("response---------subscriptionDetails---------", response)

    if (response.status === 200) {
      thunkApi.dispatch(setSubscriptionLoader(false))
      thunkApi.dispatch(setSubscriptionDetails(response.data))
    }
    if (response.data.subscriptions && response.data.subscriptions.length >= 1) {
      const todayDate = moment()
      for (const i in response.data.subscriptions) {
        if (
          todayDate.diff(
            moment(response.data.subscriptions[i].subscriptionEndDate, "YYYY/MM/DD").toDate(),
          )
        ) {
          thunkApi.dispatch(setRenewSend(1))
        } else {
          thunkApi.dispatch(setRenewSend(0))
        }
      }
    } else {
      thunkApi.dispatch(setSubscriptionLoader(false))
      thunkApi.dispatch(setRenewSend(0))
    }
    thunkApi.dispatch(setSubscriptionLoader(false))
  } catch (err) {
    thunkApi.dispatch(setSubscriptionLoader(false))
  }
})
