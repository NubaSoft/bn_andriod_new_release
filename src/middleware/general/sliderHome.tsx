import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setSliderHomeData, setSliderHomeLoader } from "../../redux/store/general/sliderHomeSlice"

export const sliderHome = createAsyncThunk("SLIDER_HOME", async (args: any, thunkApi) => {
  thunkApi.dispatch(setSliderHomeLoader(true))
  try {
    const response: any = await client.get(endpoints.slider_home, {
      centerId: endpoints?.branch_code,
    })
    thunkApi.dispatch(setSliderHomeLoader(false))
    thunkApi.dispatch(setSliderHomeData(response.data))
  } catch (err) {
    thunkApi.dispatch(setSliderHomeLoader(false))
  }
})
