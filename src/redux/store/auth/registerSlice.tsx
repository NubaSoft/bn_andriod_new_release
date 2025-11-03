import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  registerLoader: false,
  loginState: "",
  signUpState: "",
  forgetPasswordState: "",
  verificationCodeState: "",
  newPasswordState: "",
  completeAccountState: "",
}

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterLoader: (state, action) => {
      state.registerLoader = action.payload
    },
  },
})

export const { setRegisterLoader } = registerSlice.actions

export default registerSlice.reducer
