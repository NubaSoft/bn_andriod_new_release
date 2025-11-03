import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import {
  setTopSubscriptionsData,
  setTopSubscriptionsLoader,
} from "../../redux/store/general/topSubscriptionsSlice"

export const topSubscriptions = createAsyncThunk("topMeals", async (args: any, thunkApi) => {
  thunkApi.dispatch(setTopSubscriptionsLoader(true))
  try {
    const response: any = await client.get(
      `${endpoints.topSubscriptions}?center_id=${endpoints.branch_code}`,
    )
    console.log("response-----topSubscriptions------------", response)
    thunkApi.dispatch(setTopSubscriptionsLoader(false))
    thunkApi.dispatch(setTopSubscriptionsData(response?.data?.topSubs))
  } catch (err) {
    thunkApi.dispatch(setTopSubscriptionsLoader(false))
  }
})

export const availablePackagesAll = createAsyncThunk("topMeals", async (args: any, thunkApi) => {
  // thunkApi.dispatch(setTopSubscriptionsLoader(true))
  try {
    const response: any = await client.post(endpoints.availablePackagesAll, {
      centerId: endpoints.branch_code,
    })
    console.log("response-----availablePackagesAll------------", response)

    // thunkApi.dispatch(setTopSubscriptionsLoader(false))
    // thunkApi.dispatch(setTopSubscriptionsData(response?.data?.topSubs))
  } catch (err) {
    thunkApi.dispatch(setTopSubscriptionsLoader(false))
  }
})
