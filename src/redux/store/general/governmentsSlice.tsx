import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  governmentsData: [],
}

export const governmentsSlice = createSlice({
  name: "governments",
  initialState,
  reducers: {
    setGovernmentsData: (state, action) => {
      state.governmentsData = action.payload
    },
  },
})

export const { setGovernmentsData } = governmentsSlice.actions

export default governmentsSlice.reducer
