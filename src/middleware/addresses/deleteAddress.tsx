import { createAsyncThunk } from "@reduxjs/toolkit"
import { setAddressLoader } from "../../redux/store/address/address"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { Alert } from "react-native"
import { Trans } from "../../translation"
import { myAddresses } from "./myAddresses"

export const deleteAddress = createAsyncThunk("DELETE_ADDRESS", async (args: any, thunkApi) => {
  thunkApi.dispatch(setAddressLoader(true))
  try {
    const data = args
    const response = await client.delete(endpoints.deleteAddress, data)
    console.log("response--------deleteAddress---------", response)
    if (response.status === 200) {
      thunkApi.dispatch(myAddresses({}))
    } else {
      thunkApi.dispatch(setAddressLoader(false))
      Alert.alert(Trans("somethingWentWrong"), Trans("tryAgainLater"), [{ text: "OK" }])
    }
  } catch (err) {
    thunkApi.dispatch(setAddressLoader(false))
    Alert.alert(Trans("somethingWentWrong"), Trans("tryAgainLater"), [{ text: "OK" }])
  }
})
