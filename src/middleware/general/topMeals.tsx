import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setTopMealsData, setTopMealsLoader } from "../../redux/store/general/topMealsSlice"

export const topMeals = createAsyncThunk("topMeals", async (args: any, thunkApi) => {
  thunkApi.dispatch(setTopMealsLoader(true))
  try {
    const response: any = await client.get(
      `${endpoints.topMeals}?center_id=${endpoints.branch_code}`,
    )
    thunkApi.dispatch(setTopMealsLoader(false))
    thunkApi.dispatch(setTopMealsData(response?.data?.topMeals[0]?.meals))
  } catch (err) {
    thunkApi.dispatch(setTopMealsLoader(false))
  }
})
