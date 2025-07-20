import React from 'react'
import { View, Text } from 'react-native'

const CTASection = () => {
  return (
    <View className="bg-emerald-800 px-6 py-16">
      <View className="mb-12">
        <Text className="text-3xl font-bold mb-6 text-emerald-100 text-center">
          Ready to Get Started?
        </Text>
        <Text className="text-lg text-emerald-200 mb-8 text-center">
          Join Credify for your credential verification needs.
        </Text>
      </View>

      <View className="border-t border-emerald-600 pt-8">
        <Text className="text-emerald-300 text-center text-sm">
          © 2025 Credify. All rights reserved.{'\n'}
          Secure credential verification powered by blockchain technology.
        </Text>
      </View>
    </View>
  )
}

export default CTASection
