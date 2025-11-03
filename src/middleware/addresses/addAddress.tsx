import { createAsyncThunk } from "@reduxjs/toolkit"
import { setAddressLoader } from "../../redux/store/address/address"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { Alert } from "react-native"
import { myAddresses } from "./myAddresses"
import { Trans } from "../../translation"

export const addNewAddress = createAsyncThunk("ADD_ADDRESS", async (args: any, thunkApi) => {
  thunkApi.dispatch(setAddressLoader(true))
  try {
    const data = args
    const response: any = await client.post(endpoints.addAddress, data)
    if (response?.data?.message == "success") {
      thunkApi.dispatch(setAddressLoader(false))
      Alert.alert(Trans("addNewAddressSuccessfully"))
      args?.navigation.goBack()
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
