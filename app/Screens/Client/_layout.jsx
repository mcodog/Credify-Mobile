import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tabs = createBottomTabNavigator()
import HomeScreen from './Home'
import AboutScreen from './About'
import ContactScreen from './Contact'
import EvaluationScreen from './Evaluation'
import { Ionicons } from '@expo/vector-icons'

export default function Layout() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#008039', // Active color
        tabBarInactiveTintColor: 'gray', // Inactive color
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = 'home-outline'
          } else if (route.name === 'About') {
            iconName = 'information-circle-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
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
          title: 'Verify',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
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
      /> */}
    </Tabs.Navigator>
  )
}
