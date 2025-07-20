import React, { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import HeroSection from './Home/HeroSection'
import FeaturesSection from './Home/FeaturesSection'
import DevelopersSection from './Home/DevelopersSection'
import CTASection from './Home/CTASection'

const Index = () => {
  const [activeCard, setActiveCard] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-emerald-50">
        <ActivityIndicator size="large" color="#059669" />
      </View>
    )
  }

  const features = [
    {
      id: 1,
      title: 'Instant Verification',
      description:
        'Get your credentials verified in seconds using blockchain technology',
      icon: '⚡',
      details:
        'Our AI-powered system processes and verifies credentials instantly, providing real-time validation with 99.9% accuracy.',
    },
    {
      id: 2,
      title: 'Tamper-Proof Security',
      description:
        'Blockchain-secured certificates that cannot be forged or altered',
      icon: '🛡️',
      details:
        'Every credential is secured with cryptographic hashing and distributed across our blockchain network for ultimate security.',
    },
    {
      id: 3,
      title: 'Easy Integration',
      description: 'Simple API integration for institutions and platforms',
      icon: '🔧',
      details:
        'Integrate with your existing systems in minutes using our comprehensive API and developer tools.',
    },
  ]

  const developers = [
    {
      name: 'Rajesh Respall',
      role: 'Backend Developer',
      expertise: 'React, Node.js, Blockchain',
      image: '👨‍💻',
      bio: 'Passionate about creating secure and scalable web applications with 3+ years in system development.',
      github: 'rajrespall',
    },
    {
      name: 'Diana Carreon',
      role: 'UI/UX Lead Developer',
      expertise: 'Design Systems, Figma, User Research',
      image: '👩‍🎨',
      bio: 'Crafting intuitive user experiences with a focus on accessibility and modern design principles.',
      github: 'dayaannaa',
    },
    {
      name: 'Mark Bartolome',
      role: 'UI/UX Developer',
      expertise: 'Wireframing, Prototyping, Design Collaboration',
      image: '👨‍💻',
      bio: 'Supporting design workflows and implementing UI components under the guidance of the UX lead.',
      github: 'sadvoidhours',
    },
    {
      name: 'Miguel Dacumos',
      role: 'Full Stack Developer',
      expertise: 'Python, PostgreSQL, AWS',
      image: '👨‍🔧',
      bio: 'Building robust APIs and database architectures for high-performance applications.',
      github: 'noellezzz',
    },
    {
      name: 'Dr. Rico Santos',
      role: 'Project Advisor & Mentor',
      expertise: 'Secure Software Development, Technical Project Guidance',
      image: '👨‍🔒',
      bio: 'Providing strategic oversight and technical mentorship for blockchain-based credential systems',
      github: 'dimitrio25',
    },
  ]

  return (
    <ScrollView className="flex-1 bg-emerald-50">
      <HeroSection isVisible={isVisible} />
      <FeaturesSection
        features={features}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <DevelopersSection developers={developers} />
      <CTASection />
    </ScrollView>
  )
}

export default Index
