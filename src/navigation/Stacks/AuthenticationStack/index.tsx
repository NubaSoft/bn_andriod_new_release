import * as React from "react"
import { AuthenticationStackParam } from "../../Types"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../../../screens/authenticationScreens/Login"
import ForgetPassword from "../../../screens/authenticationScreens/ForgetPassword"
import VerificationCode from "../../../screens/authenticationScreens/VerificationCode"
import ResetPassword from "../../../screens/authenticationScreens/ResetPassword"
import Register from "../../../screens/authenticationScreens/Register"
import RegisterCode from "../../../screens/authenticationScreens/RegisterCode"
import NewPassword from "../../../screens/authenticationScreens/NewPassword"
import HowItWork from "../../../screens/authenticationScreens/HowItWork"
import SelectGender from "../../../screens/authenticationScreens/SelectGender"
import CompleteAddress from "../../../screens/authenticationScreens/CompleteAddress"

const Authentication_Stack = createNativeStackNavigator<AuthenticationStackParam>()
const AuthenticationStack: React.FC = (route: any) => (
  <Authentication_Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <Authentication_Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    {/* <Authentication_Stack.Screen
      name="ForgetPassword"
      component={ForgetPassword}
      options={{ headerShown: false }}
    />
    <Authentication_Stack.Screen
      name="VerificationCode"
      component={VerificationCode}
      options={{ headerShown: false }}
    />
    <Authentication_Stack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{ headerShown: false }}
    />
    <Authentication_Stack.Screen
      name="Register"
      component={Register}
      options={{ headerShown: false }}
    />
    <Authentication_Stack.Screen
      name="RegisterCode"
      component={RegisterCode}
      options={{ headerShown: false }}
    />
    <Authentication_Stack.Screen
      name="NewPassword"
      component={NewPassword}
      options={{ headerShown: false }}
    />
    <Authentication_Stack.Screen
      name="HowItWork"
      component={HowItWork}
      options={{ headerShown: false }}
    />
    <Authentication_Stack.Screen
      name="SelectGender"
      component={SelectGender}
      options={{ headerShown: false }}
    />
    <Authentication_Stack.Screen
      name="CompleteAddress"
      component={CompleteAddress}
      options={{ headerShown: false }}
    /> */}
  </Authentication_Stack.Navigator>
)
export default AuthenticationStack
