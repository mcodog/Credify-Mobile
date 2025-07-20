import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import { Ionicons } from '@expo/vector-icons'

// Mock API functions
const mockApi = {
  // Mock user data
  getCurrentUser: () => ({
    id: 'user123',
    role: 'admin', // Change to 'user' to test access denied
    name: 'John Doe',
    email: 'admin@credify.com',
  }),

  // Mock certificate upload
  uploadCertificate: async (fileData, userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate random success/failure (90% success rate)
    if (Math.random() > 0.1) {
      return {
        success: true,
        message: 'Certificate uploaded successfully!',
        imageUrl:
          'https://via.placeholder.com/400x300/059669/ffffff?text=Certificate+Uploaded',
        certificateId: 'cert_' + Date.now(),
      }
    } else {
      throw new Error('Upload failed. Please try again.')
    }
  },
}

const CertificateUpload = () => {
  const navigation = useNavigation()

  // State management
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [file, setFile] = useState(null)
  const [user, setUser] = useState(null)

  // Get current user on component mount
  useEffect(() => {
    const currentUser = mockApi.getCurrentUser()
    setUser(currentUser)
  }, [])

  // Convert file to base64 string
  const fileToBase64 = async uri => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      })
      return `data:image/jpeg;base64,${base64}`
    } catch (error) {
      throw new Error('Failed to convert file to base64')
    }
  }

  const clearStatus = () => {
    setError(null)
    setSuccessMessage(null)
  }

  const handleFileSelect = async () => {
    clearStatus()
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      })

      if (!result.canceled && result.assets && result.assets[0]) {
        setFile(result.assets[0])
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select file')
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      Alert.alert('Error', 'Please select a file first.')
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const base64Data = await fileToBase64(file.uri)
      const result = await mockApi.uploadCertificate(base64Data, user.id)

      setSuccessMessage(result.message)
      setUploadedImageUrl(result.imageUrl)
      setFile(null) // Clear selected file after successful upload
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Check if user is admin
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    // Auto-redirect non-admin users to home screen
    if (user && !isAdmin) {
      navigation.replace('Home')
    }
  }, [user, isAdmin, navigation])

  // Show loading while getting user data
  if (!user) {
    return (
      <View className="flex-1 bg-emerald-50 justify-center items-center">
        <ActivityIndicator size="large" color="#059669" />
        <Text className="text-emerald-600 mt-4">Loading...</Text>
      </View>
    )
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <View className="flex-1 bg-emerald-50 px-6">
        <View className="flex-1 justify-center items-center">
          <Ionicons name="lock-closed" size={64} color="#ef4444" />
          <Text className="text-lg font-medium text-gray-900 mb-2 text-center mt-4">
            Admin Access Required
          </Text>
          <Text className="text-gray-600 mb-6 text-center px-4">
            Only administrators can upload certificates through this interface.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="px-6 py-3 bg-emerald-600 rounded-lg"
          >
            <Text className="text-white font-semibold">Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-emerald-50">
      <View className="px-6 py-8 space-y-6">
        {/* Header */}
        <View className="border-b border-gray-200 pb-4">
          <View className="flex-row items-center justify-center mb-2">
            <Ionicons name="cloud-upload" size={24} color="#059669" />
            <Text className="text-2xl font-bold text-gray-800 ml-3">
              Admin Certificate Upload
            </Text>
          </View>
          <Text className="text-gray-600 text-center">
            Upload certificates as an administrator
          </Text>
          <Text className="text-emerald-600 text-center text-sm mt-1">
            Welcome, {user.name}
          </Text>
        </View>

        {/* Upload Section */}
        <View className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <TouchableOpacity
            onPress={handleFileSelect}
            disabled={isLoading}
            className={`border-2 border-dashed rounded-lg p-8 items-center justify-center ${
              file
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-gray-300 bg-gray-50'
            } ${isLoading ? 'opacity-60' : ''}`}
          >
            <Ionicons
              name="document-attach"
              size={48}
              color={file ? '#059669' : '#6b7280'}
            />
            <Text
              className={`text-center mt-3 font-medium ${
                file ? 'text-emerald-600' : 'text-gray-600'
              }`}
            >
              {file ? 'File Selected' : 'Tap to Select File'}
            </Text>
            <Text className="text-sm text-gray-500 text-center mt-1">
              Images and PDFs supported
            </Text>
          </TouchableOpacity>

          {file && (
            <View className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#059669" />
                <Text className="text-emerald-700 font-medium ml-2 flex-1">
                  {file.name}
                </Text>
              </View>
              <Text className="text-emerald-600 text-sm mt-1">
                Size: {(file.size / 1024 / 1024).toFixed(2)} MB
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading || !file}
            className={`py-3 rounded-lg items-center ${
              isLoading || !file ? 'bg-gray-300' : 'bg-emerald-600'
            }`}
          >
            {isLoading ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#ffffff" />
                <Text className="text-white font-medium ml-2">
                  Uploading...
                </Text>
              </View>
            ) : (
              <Text className="text-white font-medium text-lg">Upload</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Messages */}
        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-4">
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" size={20} color="#ef4444" />
              <Text className="text-red-600 ml-2 flex-1">{error}</Text>
            </View>
          </View>
        )}

        {successMessage && (
          <View className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#059669" />
              <Text className="text-emerald-600 ml-2 flex-1">
                {successMessage}
              </Text>
            </View>
          </View>
        )}

        {uploadedImageUrl && (
          <View className="bg-white rounded-lg border border-gray-200 p-4">
            <Text className="text-gray-800 font-medium mb-3 text-center">
              Uploaded Certificate
            </Text>
            <Image
              source={{ uri: uploadedImageUrl }}
              className="w-full h-64 rounded-lg"
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default CertificateUpload
