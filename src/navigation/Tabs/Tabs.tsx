import React from "react"
import { Image } from "react-native"
import { IMAGES } from "../../assets/Images"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TabsParam } from "../Types"
import styles from "./styles"
import { calcHeight } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"
import SubscriptionsStack from "../Stacks/SubscriptionsStack"
import HomeStack from "../Stacks/HomeStack"
import AccountStack from "../Stacks/AccountStack"
import { Trans } from "../../translation"

const ThemeScreen = (params: any) => {
  // StatusBar.setBarStyle('dark-content');
  const TabStack = createBottomTabNavigator<TabsParam>()
  return (
    <TabStack.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName
          let shipmentsIcon = false
          switch (route.name) {
            case "HomeStack":
              iconName = focused ? IMAGES.tap_home_active : IMAGES.tap_home_inActive
              shipmentsIcon = false
              break
            case "SubscriptionsStack":
              iconName = focused
                ? IMAGES.tap_subscriptions_active
                : IMAGES.tap_subscriptions_inActive
              break
            case "AccountStack":
              iconName = focused ? IMAGES.tap_account_active : IMAGES.tap_account_inActive
              shipmentsIcon = false
              break
          }
          return <Image source={iconName} style={styles.icon} />
        },
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: COLORS.textDark,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarItemStyle: {
          height: calcHeight(50),
          paddingVertical: calcHeight(12),
          marginTop: calcHeight(12),
        },
        headerShown: false,
      })}>
      <TabStack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ tabBarLabel: Trans("home") }}
      />
      <TabStack.Screen
        name="SubscriptionsStack"
        component={SubscriptionsStack}
        options={{ tabBarLabel: Trans("meals") }}
      />
      <TabStack.Screen
        name="AccountStack"
        component={AccountStack}
        options={{ tabBarLabel: Trans("account") }}
      />
    </TabStack.Navigator>
  )
}

const Tabs = (params: any) => {
  return <ThemeScreen params={params} screenOptions={{ headerShown: false }} />
}

export default Tabs
