import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  topSubscriptionsLoader: false,
  topSubscriptionsData: {},
}

export const topSubscriptionsSlice = createSlice({
  name: "search_home",
  initialState,
  reducers: {
    setTopSubscriptionsLoader: (state, action) => {
      state.topSubscriptionsLoader = action.payload
    },
    setTopSubscriptionsData: (state, action) => {
      state.topSubscriptionsData = action.payload
    },
  },
})

export const { setTopSubscriptionsLoader, setTopSubscriptionsData } = topSubscriptionsSlice.actions

export default topSubscriptionsSlice.reducer
