import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loginLoader: false,
  loginState: "",
  signUpState: "",
  forgetPasswordState: "",
  verificationCodeState: "",
  newPasswordState: "",
  completeAccountState: "",
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginLoader: (state, action) => {
      state.loginLoader = action.payload
    },
    setLoginState: (state, action) => {
      state.loginState = action.payload
    },
    setSignUpState: (state, action) => {
      state.signUpState = action.payload
    },
    setForgetPasswordState: (state, action) => {
      state.signUpState = action.payload
    },
    setVerificationCodeState: (state, action) => {
      state.verificationCodeState = action.payload
    },
    setNewPasswordState: (state, action) => {
      state.newPasswordState = action.payload
    },
    setCompleteAccountState: (state, action) => {
      state.completeAccountState = action.payload
    },
  },
})

export const {
  setLoginLoader,
  setLoginState,
  setSignUpState,
  setForgetPasswordState,
  setVerificationCodeState,
  setNewPasswordState,
  setCompleteAccountState,
} = loginSlice.actions

export default loginSlice.reducer
