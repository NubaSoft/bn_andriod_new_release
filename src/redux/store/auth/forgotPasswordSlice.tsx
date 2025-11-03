import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  forgotPasswordLoader: false,
}

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setForgotPasswordLoader: (state, action) => {
      state.forgotPasswordLoader = action.payload
    },
  },
})

export const { setForgotPasswordLoader } = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer
