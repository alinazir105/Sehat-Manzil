import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const ManageWorkouts = () => {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          const email = user.email || '';
          setUserEmail(email);
          setUsername(email.split('@')[0] || 'Guest');
        } else {
          setUsername('Guest');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUsername('Guest');
      }
    };

    fetchUserData();
  }, []);

  // Handler for adding new workouts
  const handleAddWorkouts = () => {
    if (!userEmail) {
      Alert.alert('Error', 'Please sign in to add workouts');
      return;
    }
    router.push('/add-workouts');
  };

  // Handler for viewing existing workouts
  const handleViewWorkouts = async () => {
    if (!userEmail) {
      Alert.alert('Error', 'Please sign in to view workouts');
      return;
    }
    router.push('/view-workouts');
  };

  // Welcome section component
  const WelcomeSection = () => (
    <View className="mt-10">
      <Text className="text-white text-2xl font-bold">
        Welcome, {username}!
      </Text>
      <Text className="text-gray-300 mt-2">
        Manage your workout routines below
      </Text>
    </View>
  );

  // Action card component
  const ActionCard = ({ title, onPress }) => (
    <View className="bg-purple-700 rounded-2xl p-4 mb-4">
      <Text className="text-white text-2xl font-semibold text-center">
        {title}
      </Text>
      <View className="flex-row items-center justify-between mt-4">
        <TouchableOpacity 
          className="bg-purple-800 rounded-xl px-6 py-3 mx-auto" 
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text className="text-white text-sm font-semibold">View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


// Replace the existing BackButton component with:
const BackButton = () => (
  <TouchableOpacity 
    className="absolute top-8 left-2 p-2 bg-gray-800/50 rounded-full"
    onPress={() => router.push('/home')}
    activeOpacity={0.7}
  >
    <ChevronLeftIcon color="white" size={24} />
  </TouchableOpacity>
);

  return (
    <SafeAreaView className="bg-gray-900 h-full p-4">
        <BackButton/>
        <WelcomeSection />
      
      <View className="flex-1 justify-center ">
        <ActionCard 
          title="Add Workouts" 
          onPress={handleAddWorkouts} 
        />
        
        <ActionCard 
          title="View Workouts" 
          onPress={handleViewWorkouts} 
        />
      </View>
    </SafeAreaView>
  );
};

export default ManageWorkouts;