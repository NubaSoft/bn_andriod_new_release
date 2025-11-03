import * as React from "react"
import { AccountStackParam } from "../../Types"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MyAccount from "../../../screens/accountScreens/MyAccount"

const Account_Stack = createNativeStackNavigator<AccountStackParam>()
const AccountStack: React.FC = (route: any) => (
  <Account_Stack.Navigator initialRouteName="MyAccount" screenOptions={{ headerShown: false }}>
    <Account_Stack.Screen name="MyAccount" component={MyAccount} options={{ headerShown: false }} />
  </Account_Stack.Navigator>
)
export default AccountStack
