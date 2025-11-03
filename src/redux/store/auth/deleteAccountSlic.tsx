import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  deleteAccountLoader: false,
}

export const deleteAccountSlic = createSlice({
  name: "login",
  initialState,
  reducers: {
    setDeleteAccountLoader: (state, action) => {
      state.deleteAccountLoader = action.payload
    },
  },
})

export const { setDeleteAccountLoader } = deleteAccountSlic.actions

export default deleteAccountSlic.reducer
