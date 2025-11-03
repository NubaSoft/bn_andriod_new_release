import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setDeliveryTimesData } from "../../redux/store/general/deliveryTimesSlice"

export const deliveryTimes = createAsyncThunk("DELIVERY_TIMES", async (args: any, thunkApi) => {
  try {
    const response: any = await client.post(endpoints.deliveryTimes, {
      enterId: endpoints.branch_code,
    })
    thunkApi.dispatch(setDeliveryTimesData(response.data))
  } catch (err) {
    console.log(err)
  }
})
