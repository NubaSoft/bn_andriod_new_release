import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import {
  setDietTypesData,
  setSubscriptionLoader,
} from "../../redux/store/subscriptions/subscriptionsSlice"

export const dietTypes = createAsyncThunk("DIET_TYPES", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSubscriptionLoader(true))
  try {
    const data: any = {
      renew: args?.renew_send,
      centerId: endpoints.branch_code,
    }
    const response: any = await client.put(endpoints.dietTypes, data)
    console.log("response-----dietTypes-----------", response)
    if (response.status === 200) {
      thunkApi.dispatch(setSubscriptionLoader(response.data))
      thunkApi.dispatch(setDietTypesData(response.data))
    }
  } catch (err) {
    thunkApi.dispatch(setSubscriptionLoader(false))
  }
})
