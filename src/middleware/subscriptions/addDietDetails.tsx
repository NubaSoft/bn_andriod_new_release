import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setSubscriptionLoader } from "../../redux/store/subscriptions/subscriptionsSlice"

export const addDietDetails = createAsyncThunk("ADD_DIET_DETAILS", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSubscriptionLoader(true))
  try {
    const data: any = args?.dietDetails
    console.log("args------addDietDetails------------", args)
    const response: any = await client.post(endpoints.addDietDetails, data)
    console.log("response-----addDietDetails-----------", response)
    if (response?.data?.message == "success") {
      thunkApi.dispatch(setSubscriptionLoader(false))
      args?.navigation.navigate("ReviewAndPayment", { data: args })
    } else {
      thunkApi.dispatch(setSubscriptionLoader(false))
    }
  } catch (err) {
    thunkApi.dispatch(setSubscriptionLoader(false))
  }
})
