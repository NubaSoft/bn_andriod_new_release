import { createAsyncThunk } from "@reduxjs/toolkit"
import { setAddressLoader, setMyAddressesData } from "../../redux/store/address/address"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"

export const myAddresses = createAsyncThunk("MY_ADDRESSES", async (args: any, thunkApi) => {
  thunkApi.dispatch(setAddressLoader(true))
  try {
    const response: any = await client.get(
      `${endpoints.myAddresses}?center_id=${endpoints.branch_code}`,
    )
    console.log("response-------myAddresses---------", response)
    thunkApi.dispatch(setAddressLoader(false))
    if (response.status === 200) {
      thunkApi.dispatch(setMyAddressesData(response.data))
    }
  } catch (err) {
    thunkApi.dispatch(setAddressLoader(false))
  }
})
