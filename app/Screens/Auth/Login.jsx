import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/user/userSlice'
import { selectUser } from '../../features/user/userSelector'
import axios from '../../utils/axios'

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    console.log('login')

    try {
      const res = await axios.post('/auth/login', { email, password })
      console.log(res.data.parsedUser)
      dispatch(setUser(res.data.parsedUser))
      navigation.navigate('ClientStack')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-8">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-600 text-center">
            Sign in to your account
          </Text>
        </View>

        <View className="space-y-4">
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
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="bg-emerald-500 rounded-lg py-3 mt-6"
            onPress={handleLogin}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-4">
            <Text className="text-emerald-600 text-center">
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-gray-600 text-center">
              Don't have an account?{' '}
              <Text className="text-emerald-600 font-semibold">Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
