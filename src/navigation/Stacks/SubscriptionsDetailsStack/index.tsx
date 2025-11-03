import * as React from "react"
import { SubscriptionsDetailsStackParam } from "../../Types"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WeSubscriptionsList from "../../../screens/subscriptionsScreens/WeSubscriptionsList"
import SubscriptionData from "../../../screens/subscriptionsScreens/SubscriptionData"
import PickStartDate from "../../../screens/subscriptionsScreens/PickStartDate"
import ReviewAndPayment from "../../../screens/subscriptionsScreens/ReviewAndPayment"
import CheckOut from "../../../screens/subscriptionsScreens/CheckOut"
import Freeze_DefreezeDays from "../../../screens/subscriptionsScreens/Freeze_DefreezeDays"
import ManageMeals from "../../../screens/subscriptionsScreens/ManageMeals"

const SubscriptionsDetails_Stack = createNativeStackNavigator<SubscriptionsDetailsStackParam>()
const SubscriptionsDetailsStack: React.FC = (route: any) => (
  <SubscriptionsDetails_Stack.Navigator
    initialRouteName="WeSubscriptionsList"
    screenOptions={{ headerShown: false }}>
    <SubscriptionsDetails_Stack.Screen
      name="WeSubscriptionsList"
      component={WeSubscriptionsList}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <SubscriptionsDetails_Stack.Screen
      name="SubscriptionData"
      component={SubscriptionData}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    {/* <SubscriptionsDetails_Stack.Screen
      name="PickStartDate"
      component={PickStartDate}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    /> */}
    <SubscriptionsDetails_Stack.Screen
      name="ReviewAndPayment"
      component={ReviewAndPayment}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <SubscriptionsDetails_Stack.Screen
      name="CheckOut"
      component={CheckOut}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <SubscriptionsDetails_Stack.Screen
      name="Freeze_DefreezeDays"
      component={Freeze_DefreezeDays}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <SubscriptionsDetails_Stack.Screen
      name="ManageMeals"
      component={ManageMeals}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
  </SubscriptionsDetails_Stack.Navigator>
)
export default SubscriptionsDetailsStack
