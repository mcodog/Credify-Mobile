import React from 'react'
import { View, Text } from 'react-native'

const HeroSection = ({ isVisible }) => {
  return (
    <View className="bg-gradient-to-br from-emerald-100 to-emerald-200 pt-16 pb-20 px-6">
      <View className="absolute inset-0 bg-white opacity-10" />

      <View
        className={`text-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <Text className="text-4xl md:text-6xl font-bold text-emerald-900 mb-6 text-center leading-tight">
          Trust Through{'\n'}
          <Text className="text-emerald-600">Verification</Text>
        </Text>
        <Text className="text-lg text-emerald-800 mb-8 text-center leading-relaxed px-4">
          The future of credential verification is here. Secure, instant, and
          globally recognized blockchain-based certificates that employers and
          institutions trust.
        </Text>
      </View>
    </View>
  )
}

export default HeroSection
