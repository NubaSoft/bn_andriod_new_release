import * as React from "react"
import { HomeDetailsStackParam } from "../../Types"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OurMealsList from "../../../screens/homeScreens/OurMealsList"

const HomeDetails_Stack = createNativeStackNavigator<HomeDetailsStackParam>()
const HomeDetailsStack: React.FC = (route: any) => (
  <HomeDetails_Stack.Navigator
    initialRouteName="OurMealsList"
    screenOptions={{ headerShown: false }}>
    <HomeDetails_Stack.Screen
      name="OurMealsList"
      component={OurMealsList}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
  </HomeDetails_Stack.Navigator>
)
export default HomeDetailsStack
