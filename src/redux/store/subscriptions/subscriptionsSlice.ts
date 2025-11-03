import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  subscriptionLoader: false,
  dietTypesData: "",
  subscriptionDetailsData: "",
  renewSend: 0,
  subscribtionStartDatesData: "",
  promoCodeData: "",
  customerPackageData: "",
  paymentStatusData: 0,
  calenderDetailsData: "",
  mealsListByDateData: [],
}

export const subscriptionsSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setSubscriptionLoader: (state, action) => {
      state.subscriptionLoader = action.payload
    },
    setDietTypesData: (state, action) => {
      state.dietTypesData = action.payload
    },
    setSubscriptionDetails: (state, action) => {
      state.subscriptionDetailsData = action.payload
    },
    setRenewSend: (state, action) => {
      state.renewSend = action.payload
    },
    setSubscribtionStartDatesData: (state, action) => {
      state.subscribtionStartDatesData = action.payload
    },
    setPromoCodeData: (state, action) => {
      state.promoCodeData = action.payload
    },
    setCustomerPackageData: (state, action) => {
      state.customerPackageData = action.payload
    },
    setPaymentStatusData: (state, action) => {
      state.paymentStatusData = action.payload
    },
    setCalenderDetailsData: (state, action) => {
      state.calenderDetailsData = action.payload
    },
    setMealsListByDateData: (state, action) => {
      state.mealsListByDateData = action.payload
    },
  },
})

export const {
  setSubscriptionLoader,
  setDietTypesData,
  setSubscriptionDetails,
  setRenewSend,
  setSubscribtionStartDatesData,
  setPromoCodeData,
  setCustomerPackageData,
  setPaymentStatusData,
  setCalenderDetailsData,
  setMealsListByDateData,
} = subscriptionsSlice.actions

export default subscriptionsSlice.reducer
