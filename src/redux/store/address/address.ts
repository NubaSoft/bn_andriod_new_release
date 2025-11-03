import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  addressLoader: false,
  myAddressesData: [],
}

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressLoader: (state, action) => {
      state.addressLoader = action.payload
    },
    setMyAddressesData: (state, action) => {
      state.myAddressesData = action.payload
    },
  },
})

export const { setAddressLoader, setMyAddressesData } = addressSlice.actions

export default addressSlice.reducer
