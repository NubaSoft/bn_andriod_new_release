import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import {
  setCalenderDetailsData,
  setRenewSend,
  setSubscriptionLoader,
} from "../../redux/store/subscriptions/subscriptionsSlice"
import moment from "moment"

export const calenderDetails = createAsyncThunk("DIET_TYPES", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSubscriptionLoader(true))
  try {
    const response: any = await client.get(
      `${endpoints.calenderDetails}?center_id=${endpoints.branch_code}`,
    )
    console.log("response---------calenderDetails---------", response)

    if (response.status === 200) {
      thunkApi.dispatch(setSubscriptionLoader(false))
      thunkApi.dispatch(setCalenderDetailsData(response.data))
    } else {
      thunkApi.dispatch(setSubscriptionLoader(false))
      thunkApi.dispatch(setRenewSend(0))
    }
  } catch (err) {
    thunkApi.dispatch(setSubscriptionLoader(false))
  }
})
