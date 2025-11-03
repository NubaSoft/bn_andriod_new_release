import React from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MenuProvider } from "react-native-popup-menu"
import { Provider } from "react-redux"
import Navigation from "./navigation"
import { store } from "./redux/store/store"
import { StatusBar } from "react-native"
import Reactotron from 'reactotron-react-native';
import '../ReactotronConfig';

export default function App() {
  Reactotron.log('Hello');
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <MenuProvider skipInstanceCheck backHandler>
          <StatusBar backgroundColor={"transparent"} translucent={true} />
          <Navigation />
        </MenuProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}
