import React from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'

const DevelopersSection = ({ developers }) => {
  const openGithub = username => {
    Linking.openURL(`https://github.com/${username}`)
  }

  return (
    <View className="py-20 bg-emerald-50 px-6">
      <View className="mb-16">
        <Text className="text-3xl font-bold text-emerald-900 mb-4 text-center">
          Meet Our Developers
        </Text>
        <Text className="text-lg text-emerald-700 text-center">
          The talented team behind Credify's innovative credential verification
          platform
        </Text>
      </View>

      <View className="space-y-6">
        {developers.map((developer, index) => (
          <View
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200 my-2"
          >
            <View className="items-center mb-4">
              <Text className="text-5xl mb-3">{developer.image}</Text>
              <Text className="text-xl font-bold text-emerald-900 text-center">
                {developer.name}
              </Text>
              <Text className="text-emerald-700 font-semibold text-center mb-2">
                {developer.role}
              </Text>
              <Text className="text-sm text-emerald-600 text-center mb-4">
                {developer.expertise}
              </Text>
            </View>

            <Text className="text-sm text-emerald-800 mb-6 text-center leading-relaxed">
              {developer.bio}
            </Text>

            <TouchableOpacity
              onPress={() => openGithub(developer.github)}
              className="bg-emerald-600 py-3 rounded-full"
            >
              <Text className="text-white font-semibold text-center">
                @{developer.github}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  )
}

export default DevelopersSection
