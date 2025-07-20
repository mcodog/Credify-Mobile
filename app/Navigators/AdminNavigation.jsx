import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AnalyticsScreen from '../Screens/Admin/Analytics'
import AssessmentsScreen from '../Screens/Admin/Assessments'
import DashboardScreen from '../Screens/Admin/Dashboard'
import FeedbacksScreen from '../Screens/Admin/Feedbacks'
import ReportsScreen from '../Screens/Admin/Reports'
import SettingsScreen from '../Screens/Admin/Settings'
import UsersScreen from '../Screens/Admin/Users'
import VisualizersScreen from '../Screens/Admin/Visualizer'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        drawerIcon: ({ focused, color, size }) => {
          let iconName

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Analytics':
              iconName = focused ? 'analytics' : 'analytics-outline'
              break
            case 'Assessments':
              iconName = focused ? 'clipboard' : 'clipboard-outline'
              break
            case 'Visualizers':
              iconName = focused ? 'eye' : 'eye-outline'
              break
            case 'Users':
              iconName = focused ? 'people' : 'people-outline'
              break
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline'
              break
            case 'Reports':
              iconName = focused ? 'document-text' : 'document-text-outline'
              break
            case 'Feedbacks':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
              break
            default:
              iconName = 'help-circle-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
      <Drawer.Screen name="Assessments" component={AssessmentsScreen} />
      <Drawer.Screen name="Visualizers" component={VisualizersScreen} />
      <Drawer.Screen name="Users" component={UsersScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
      <Drawer.Screen name="Feedbacks" component={FeedbacksScreen} />
    </Drawer.Navigator>
  )
}
