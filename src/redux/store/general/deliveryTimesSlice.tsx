import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  deliveryTimesData: [],
}

export const deliveryTimesSlice = createSlice({
  name: "governments",
  initialState,
  reducers: {
    setDeliveryTimesData: (state, action) => {
      state.deliveryTimesData = action.payload
    },
  },
})

export const { setDeliveryTimesData } = deliveryTimesSlice.actions

export default deliveryTimesSlice.reducer
