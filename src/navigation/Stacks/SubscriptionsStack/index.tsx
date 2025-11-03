import * as React from "react"
import { SubscriptionsStackParam } from "../../Types"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Subscriptions from "../../../screens/subscriptionsScreens/Subscriptions"

const Subscriptions_Stack = createNativeStackNavigator<SubscriptionsStackParam>()
const SubscriptionsStack: React.FC = (route: any) => (
  <Subscriptions_Stack.Navigator
    initialRouteName="Subscriptions"
    screenOptions={{ headerShown: false }}>
    <Subscriptions_Stack.Screen
      name="Subscriptions"
      component={Subscriptions}
      options={{ headerShown: false }}
    />
  </Subscriptions_Stack.Navigator>
)
export default SubscriptionsStack
