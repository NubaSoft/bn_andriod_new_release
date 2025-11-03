import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userData: {},
}

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
  },
})

export const { setUserData } = storageSlice.actions

export default storageSlice.reducer
