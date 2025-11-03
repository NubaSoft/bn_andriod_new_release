import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import {
  setCustomerPackageData,
  setSubscriptionLoader,
} from "../../redux/store/subscriptions/subscriptionsSlice"

export const addCustomerPackage = createAsyncThunk(
  "ADD_CUSTOMER_PACKAGE",
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setSubscriptionLoader(true))
    thunkApi.dispatch(setCustomerPackageData(""))
    try {
      const data: any = args
      const response: any = await client.post(endpoints.addCustomerPackage, data)
      console.log("response-----addCustomerPackage-----------", response)
      if (response?.data?.PaymentURL) {
        thunkApi.dispatch(setSubscriptionLoader(false))
        thunkApi.dispatch(setCustomerPackageData(response?.data))
        args?.navigation.navigate("CheckOut", { data: response?.data })
      } else {
        thunkApi.dispatch(setSubscriptionLoader(false))
        thunkApi.dispatch(setCustomerPackageData(""))
      }
    } catch (err) {
      thunkApi.dispatch(setSubscriptionLoader(false))
      thunkApi.dispatch(setCustomerPackageData(""))
    }
  },
)
