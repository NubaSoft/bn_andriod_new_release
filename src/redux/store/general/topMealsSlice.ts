import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  topMealsLoader: false,
  topMealsData: {},
}

export const topMealsSlice = createSlice({
  name: "search_home",
  initialState,
  reducers: {
    setTopMealsLoader: (state, action) => {
      state.topMealsLoader = action.payload
    },
    setTopMealsData: (state, action) => {
      state.topMealsData = action.payload
    },
  },
})

export const { setTopMealsLoader, setTopMealsData } = topMealsSlice.actions

export default topMealsSlice.reducer
