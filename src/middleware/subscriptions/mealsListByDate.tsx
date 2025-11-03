import { createAsyncThunk } from "@reduxjs/toolkit"
import endpoints from "../../network/endpoints"
import { client } from "../../network/apiClient"
import {
  setSubscriptionLoader,
  setMealsListByDateData,
} from "../../redux/store/subscriptions/subscriptionsSlice"

export const mealsListByDate = createAsyncThunk(
  "MEALS_LIST_BY_DATE",
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setSubscriptionLoader(true))
    thunkApi.dispatch(setMealsListByDateData([]))
    try {
      const data: any = args
      const response: any = await client.post(endpoints.mealsListByDate, data)
      console.log("response-----mealsListByDate-----------", response)
      if (response.status == 200) {
        thunkApi.dispatch(setSubscriptionLoader(false))
        const list: any[] = response?.data
        var meals: any[] = []
        for (let i = 0; i < list?.length; i++) {
          meals.push({
            menuId: list[i]?.menuId,
            mealId: list[i]?.mealId,
            categoryId: list[i]?.categoryId,
            titleAr: list[i]?.titleAr,
            titleEn: list[i]?.titleEn,
            status: list[i]?.status,
            portion: list[i]?.portion,
            sortId: list[i]?.sortId,
            snackTypeName: list[i]?.category[0]?.snackTypeName,
            snackTypeId: list[i]?.category[0]?.snackTypeId,
            mealListItems: list[i]?.category[0]?.mealListItems,
          })
        }
        thunkApi.dispatch(setMealsListByDateData(meals))
        args?.navigation.navigate("SubscriptionsDetailsStack", {
          screen: "ManageMeals",
          data: args,
        })
      } else {
        thunkApi.dispatch(setSubscriptionLoader(false))
        thunkApi.dispatch(setMealsListByDateData([]))
      }
    } catch (err) {
      thunkApi.dispatch(setSubscriptionLoader(false))
    }
  },
)
