import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setName } from '../States/Slice/nameSlice'

const Welcome = ({ navigation }) => {
  const name = useSelector(state => state.name.value)
  const dispatch = useDispatch()

  const handleNameChange = text => {
    dispatch(setName(text))
  }

  return (
    <View className="flex-1 justify-center items-center gap-2">
      <TextInput
        editable
        maxLength={40}
        onChangeText={handleNameChange}
        value={name}
        className="w-1/2 h-12 border border-gray-400 rounded-lg p-2 text-black"
        placeholder="Enter your name..."
        placeholderTextColor="gray"
      />
      <Button
        title="Client Side"
        onPress={() => navigation.navigate('ClientStack')}
      ></Button>
      <Button
        title="Admin Side"
        onPress={() => navigation.navigate('AdminDrawer')}
      ></Button>
    </View>
  )
}

export default Welcome
