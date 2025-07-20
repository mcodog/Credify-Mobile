import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ClientStack from './app/Navigators/ClientNavigator'
import AdminDrawer from './app/Navigators/AdminNavigation'
import Welcome from './app/Screens/Welcome'
import LoginScreen from './app/Screens/Auth/Login'
import RegisterScreen from './app/Screens/Auth/Register'

import './app/styles/global.css'
import store from './app/States/store'
import { Provider } from 'react-redux'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="ClientStack"
        >
          <Stack.Screen name="ClientStack" component={ClientStack} />
          <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
