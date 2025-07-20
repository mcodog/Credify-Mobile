import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tabs = createBottomTabNavigator()
import HomeScreen from './Home'
import AboutScreen from './About'
import ContactScreen from './Contact'
import EvaluationScreen from './Evaluation'
import { Ionicons } from '@expo/vector-icons'

export default function Layout() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Evaluation"
        component={EvaluationScreen}
        options={{
          title: 'Evaluation',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}
