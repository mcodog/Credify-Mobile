import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const name = useSelector(state => state.name.value)

  return (
    <View>
      <Text>Hi there, {name}</Text>
    </View>
  )
}

export default Dashboard
