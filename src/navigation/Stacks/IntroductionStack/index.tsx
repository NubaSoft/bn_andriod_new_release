import * as React from "react"
import { IntroductionStackParam } from "../../Types"
import Splash from "../../../screens/introductionScreens/Splash"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Introduction_Stack = createNativeStackNavigator<IntroductionStackParam>()
const IntroductionStack: React.FC = () => (
  <Introduction_Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
    }}>
    <Introduction_Stack.Screen name="Splash" component={Splash} />
  </Introduction_Stack.Navigator>
)

export default IntroductionStack
// const IntroductionStack = () => <></>
// export default IntroductionStack
