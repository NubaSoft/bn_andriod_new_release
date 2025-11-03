import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import {
  setPromoCodeData,
  setSubscriptionLoader,
} from "../../redux/store/subscriptions/subscriptionsSlice"

export const addPromoCode = createAsyncThunk("ADD_PROMO_CODE", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSubscriptionLoader(true))
  thunkApi.dispatch(setPromoCodeData(""))
  try {
    const data: any = args
    const response: any = await client.post(endpoints.addPromoCode, data)
    console.log("response-----addPromoCode-----------", response)
    if (response?.data?.promoCode == args?.promoCode) {
      thunkApi.dispatch(setSubscriptionLoader(false))
      thunkApi.dispatch(setPromoCodeData(response?.data))
    } else {
      thunkApi.dispatch(setSubscriptionLoader(false))
      thunkApi.dispatch(setPromoCodeData(""))
    }
  } catch (err) {
    thunkApi.dispatch(setSubscriptionLoader(false))
    thunkApi.dispatch(setPromoCodeData(""))
  }
})
