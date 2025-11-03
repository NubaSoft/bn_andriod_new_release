import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setAddressLoader, setMyAddressesData } from "../../redux/store/address/address"
import { Alert } from "react-native"
import { Trans } from "../../translation"
import { myAddresses } from "./myAddresses"

export const editAddress = createAsyncThunk("EDIT_ADDRESS", async (args: any, thunkApi) => {
  thunkApi.dispatch(setAddressLoader(true))
  try {
    const data = args
    const response: any = await client.put(endpoints.editAddress, data)
    console.log("response--------editAddress---------", response)
    if (response?.data?.message == "success") {
      thunkApi.dispatch(setAddressLoader(false))
      Alert.alert(Trans("editAddressSuccessfully"))
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
