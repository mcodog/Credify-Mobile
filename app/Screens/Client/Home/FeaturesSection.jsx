import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const FeaturesSection = ({ features, activeCard, setActiveCard }) => {
  return (
    <View className="py-20 bg-emerald-600 px-6">
      <View className="mb-16">
        <Text className="text-3xl font-bold text-white mb-4 text-center">
          Why Choose Credify?
        </Text>
        <Text className="text-lg text-emerald-100 text-center">
          Experience the next generation of credential verification with
          cutting-edge technology
        </Text>
      </View>

      <View className="space-y-6">
        {features.map(feature => (
          <TouchableOpacity
            key={feature.id}
            className={`bg-emerald-500 p-6 rounded-2xl my-2 shadow-lg ${
              activeCard === feature.id ? 'bg-emerald-400' : ''
            }`}
            onPress={() =>
              setActiveCard(activeCard === feature.id ? null : feature.id)
            }
          >
            <Text className="text-4xl mb-4">{feature.icon}</Text>
            <Text className="text-xl font-bold text-white mb-3">
              {feature.title}
            </Text>
            <Text className="text-emerald-100 mb-4">{feature.description}</Text>
            {activeCard === feature.id && (
              <View className="border-t border-emerald-300 pt-4">
                <Text className="text-emerald-50 text-sm">
                  {feature.details}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default FeaturesSection
