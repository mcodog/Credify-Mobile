import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const name = useSelector(state => state.name.value)
  return (
    <View className="p-2 pt-5">
      <Text>Hi there, {name}!</Text>
    </View>
  )
}

export default Home
