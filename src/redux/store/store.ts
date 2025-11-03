import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import addressSlice from "./address/address"
import storageSlice from "./storage/storageSlice"
import topMealsSlice from "./general/topMealsSlice"
import topSubscriptionsSlice from "./general/topSubscriptionsSlice"
import sliderHomeSlice from "./general/sliderHomeSlice"
import governmentsSlice from "./general/governmentsSlice"
import deliveryTimesSlice from "./general/deliveryTimesSlice"

import loginSlice from "./auth/loginSlice"
import forgotPasswordSlice from "./auth/forgotPasswordSlice"
import registerSlice from "./auth/registerSlice"
import deleteAccountSlic from "./auth/deleteAccountSlic"

import subscriptionsSlice from "./subscriptions/subscriptionsSlice"

export const store = configureStore({
  reducer: {
    storage: storageSlice,
    topMeals: topMealsSlice,
    topSubscriptions: topSubscriptionsSlice,
    sliderHome: sliderHomeSlice,
    governments: governmentsSlice,
    deliveryTimes: deliveryTimesSlice,
    login: loginSlice,
    forgotPassword: forgotPasswordSlice,
    register: registerSlice,
    address: addressSlice,
    deleteAccount: deleteAccountSlic,
    subscriptions: subscriptionsSlice,
  },
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
