import React, { useEffect } from "react"

import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import IntroductionStack from "./Stacks/IntroductionStack"
import AuthenticationStack from "./Stacks/AuthenticationStack"
import Tabs from "./Tabs/Tabs"
import HomeStack from "./Stacks/HomeStack"
import HomeDetailsStack from "./Stacks/HomeDetailsStack"
import SubscriptionsStack from "./Stacks/SubscriptionsStack"
import SubscriptionsDetailsStack from "./Stacks/SubscriptionsDetailsStack"
import AccountStack from "./Stacks/AccountStack"
import AccountDetailsStack from "./Stacks/AccountDetailsStack"

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef()

const RootStack = createStackNavigator()

const RootNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName={"IntroductionStack"}
      screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="IntroductionStack" component={IntroductionStack} />
      <RootStack.Screen name="AuthenticationStack" component={AuthenticationStack} />
      <RootStack.Screen name="Tabs" component={Tabs} />
      <RootStack.Screen name="HomeStack" component={HomeStack} />
      <RootStack.Screen name="HomeDetailsStack" component={HomeDetailsStack} />
      <RootStack.Screen name="SubscriptionsStack" component={SubscriptionsStack} />
      <RootStack.Screen name="SubscriptionsDetailsStack" component={SubscriptionsDetailsStack} />
      <RootStack.Screen name="AccountStack" component={AccountStack} />
      <RootStack.Screen name="AccountDetailsStack" component={AccountDetailsStack} />
    </RootStack.Navigator>
  )
}

const Navigation: React.FC = () => (
  <NavigationContainer ref={navigationRef}>
    <RootNavigation />
  </NavigationContainer>
)
export default Navigation

export const navigate = (name: any, params: object | undefined) => {
  navigationRef.current ? navigationRef.current.navigate(name, params) : undefined
}
