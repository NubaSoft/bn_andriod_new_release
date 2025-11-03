import { createAsyncThunk } from "@reduxjs/toolkit"
import { setUserData } from "../../redux/store/storage/storageSlice"

interface UserDataArgs {
  data?: any
}

export const userData = createAsyncThunk("USER_DATA", async (args: UserDataArgs, thunkApi) => {
  try {
    thunkApi.dispatch(setUserData(args))
  } catch (err) {
    //
  }
})
