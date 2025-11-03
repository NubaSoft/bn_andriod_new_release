import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { init_token } from "../../network"
import RNRestart from "react-native-restart"
import { setDeleteAccountLoader } from "../../redux/store/auth/deleteAccountSlic"

interface UserPersonlInfo {}

const restart = () => {
  setTimeout(() => {
    RNRestart.Restart()
  }, 500)
}
export const deleteAccount = createAsyncThunk(
  "DELETE_ACCOUNT",
  async (args: UserPersonlInfo, thunkApi) => {
    thunkApi.dispatch(setDeleteAccountLoader(true))
    try {
      const data = {
        key: 0,
        centerId: endpoints.branch_code,
      }
      const response: any = await client.post(endpoints.deleteAccount, data)
      if (response.data.message === "success") {
        thunkApi.dispatch(setDeleteAccountLoader(false))
        await AsyncStorage.setItem("user_data", "")
        init_token("")
        restart()
      } else {
        thunkApi.dispatch(setDeleteAccountLoader(false))
      }
    } catch (err) {
      thunkApi.dispatch(setDeleteAccountLoader(false))
    }
  },
)
