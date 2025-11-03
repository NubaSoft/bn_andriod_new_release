import * as React from "react"
import { AccountDetailsStackParam } from "../../Types"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Profile from "../../../screens/accountScreens/Profile"
import Notifications from "../../../screens/accountScreens/Notifications"
import ContactUs from "../../../screens/accountScreens/ContactUs"
import PrivacyPolicy from "../../../screens/accountScreens/PrivacyPolicy"
import TermsConditions from "../../../screens/accountScreens/TermsConditions"
import MyAddresses from "../../../screens/accountScreens/MyAddresses"
import AddNewAddress from "../../../screens/accountScreens/AddNewAddress"
import EditAddress from "../../../screens/accountScreens/EditAddress"
import MySubscriptions from "../../../screens/accountScreens/MySubscriptions"
import ChooseRenewalProcess from "../../../screens/subscriptionsScreens/ChooseRenewalProcess"

const Account_Stack = createNativeStackNavigator<AccountDetailsStackParam>()
const AccountDetailsStack: React.FC = (route: any) => (
  <Account_Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
    <Account_Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <Account_Stack.Screen
      name="Notifications"
      component={Notifications}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <Account_Stack.Screen
      name="MyAddresses"
      component={MyAddresses}
      options={{ headerShown: false }}
    />
    <Account_Stack.Screen
      name="ContactUs"
      component={ContactUs}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <Account_Stack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicy}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <Account_Stack.Screen
      name="TermsConditions"
      component={TermsConditions}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <Account_Stack.Screen
      name="AddNewAddress"
      component={AddNewAddress}
      options={{ headerShown: false }}
    />
    <Account_Stack.Screen
      name="EditAddress"
      component={EditAddress}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <Account_Stack.Screen
      name="MySubscriptions"
      component={MySubscriptions}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
    <Account_Stack.Screen
      name="ChooseRenewalProcess"
      component={ChooseRenewalProcess}
      options={{ headerShown: false }}
      initialParams={route.route.params}
    />
  </Account_Stack.Navigator>
)
export default AccountDetailsStack
