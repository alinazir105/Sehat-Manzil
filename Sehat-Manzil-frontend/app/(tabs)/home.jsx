import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView className="bg-gray-900 h-full p-4">
      {/* Welcome Section */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-xl font-semibold">Welcome Back,</Text>
        <TouchableOpacity className="p-2 bg-gray-800 rounded-full">
          {/* Notification Icon */}
        </TouchableOpacity>
      </View>

      <Text className="text-white text-2xl font-bold">Masi Ramezanzade</Text>

      {/* Banner */}
      <View className="flex flex-col justify-center gap-10 h-full">
        <View className="bg-purple-700 rounded-2xl p-4 mt-6">
          <Text className="text-white text-2xl font-semibold text-center">
            View Workouts
          </Text>

          <View className="flex-row items-center justify-between mt-4">
            {/* View More Button */}
            <TouchableOpacity className="bg-purple-800 rounded-xl px-4 py-2 mx-auto">
              <Text className="text-white text-sm font-semibold">View More</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-purple-700 rounded-2xl p-4 mt-6">
          <Text className="text-white text-2xl font-semibold text-center">
            View Workouts
          </Text>

          <View className="flex-row items-center justify-between mt-4">
            {/* View More Button */}
            <TouchableOpacity className="bg-purple-800 rounded-xl px-4 py-2 mx-auto">
              <Text className="text-white text-sm font-semibold">View More</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-purple-700 rounded-2xl p-4 mt-6">
          <Text className="text-white text-2xl font-semibold text-center">
            View Workouts
          </Text>

          <View className="flex-row items-center justify-between mt-4">
            {/* View More Button */}
            <TouchableOpacity className="bg-purple-800 rounded-xl px-4 py-2 mx-auto">
              <Text className="text-white text-sm font-semibold">View More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
