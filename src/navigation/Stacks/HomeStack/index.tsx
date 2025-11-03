import * as React from "react"
import { HomeStackParam } from "../../Types"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../../../screens/homeScreens/Home"

const Home_Stack = createNativeStackNavigator<HomeStackParam>()
const HomeStack: React.FC = (route: any) => (
  <Home_Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Home_Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
  </Home_Stack.Navigator>
)
export default HomeStack
