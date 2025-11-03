import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import { setGovernmentsData } from "../../redux/store/general/governmentsSlice"

export const governments = createAsyncThunk("GOVERNNENTS", async (args: any, thunkApi) => {
  try {
    const response: any = await client.get(
      `${endpoints.governments}?center_id=${endpoints?.branch_code}`,
    )
    thunkApi.dispatch(setGovernmentsData(response.data))
  } catch (err) {
    console.log(err)
  }
})
