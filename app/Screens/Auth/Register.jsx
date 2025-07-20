import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Register pressed', { firstName, lastName, email, password })
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-8">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
            Create Account
          </Text>
          <Text className="text-gray-600 text-center">
            Sign up to get started
          </Text>
        </View>

        <View className="space-y-4">
          <View className="flex-row space-x-3">
            <View className="flex-1">
              <Text className="text-gray-700 mb-2 ml-1">First Name</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 mb-2 ml-1">Last Name</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-700 mb-2 ml-1">Email Address</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 ml-1">Password</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="bg-green-500 rounded-lg py-3 mt-6"
            onPress={handleRegister}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Create Account
            </Text>
          </TouchableOpacity>

          <View className="mt-4">
            <Text className="text-gray-500 text-center text-sm">
              By creating an account, you agree to our{' '}
              <Text className="text-green-600">Terms of Service</Text> and{' '}
              <Text className="text-green-600">Privacy Policy</Text>
            </Text>
          </View>
        </View>

        <View className="mt-8">
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-gray-600 text-center">
              Already have an account?{' '}
              <Text className="text-green-600 font-semibold">Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen
