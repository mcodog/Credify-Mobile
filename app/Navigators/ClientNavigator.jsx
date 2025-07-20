import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LayoutScreen from '../Screens/Client/_layout'

const Stack = createStackNavigator()

export default function ClientNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Layout"
    >
      <Stack.Screen name="Layout" component={LayoutScreen} />
    </Stack.Navigator>
  )
}
