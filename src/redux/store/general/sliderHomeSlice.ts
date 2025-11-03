import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  sliderHomeLoader: false,
  sliderHomeData: [],
}

export const sliderHomeSlice = createSlice({
  name: "search_home",
  initialState,
  reducers: {
    setSliderHomeLoader: (state, action) => {
      state.sliderHomeLoader = action.payload
    },
    setSliderHomeData: (state, action) => {
      state.sliderHomeData = action.payload
    },
  },
})

export const { setSliderHomeLoader, setSliderHomeData } = sliderHomeSlice.actions

export default sliderHomeSlice.reducer
