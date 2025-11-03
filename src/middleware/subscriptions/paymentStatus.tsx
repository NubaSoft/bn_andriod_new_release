import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import {
  setPaymentStatusData,
  setSubscriptionLoader,
} from "../../redux/store/subscriptions/subscriptionsSlice"

export const paymentStatus = createAsyncThunk("PAYMENT_STATUS", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSubscriptionLoader(true))
  thunkApi.dispatch(setPaymentStatusData(0))
  try {
    const data: any = args
    const response: any = await client.post(endpoints.paymentStatus, data)
    console.log("response-----paymentStatus-----------", response)
    if (response?.data?.promoCode == args?.promoCode) {
      thunkApi.dispatch(setSubscriptionLoader(false))
      if (response.data.message === "success") {
        thunkApi.dispatch(setPaymentStatusData(1))
      }
    } else {
      thunkApi.dispatch(setSubscriptionLoader(false))
      thunkApi.dispatch(setPaymentStatusData(2))
    }
  } catch (err) {
    thunkApi.dispatch(setSubscriptionLoader(false))
    thunkApi.dispatch(setPaymentStatusData(2))
  }
})
