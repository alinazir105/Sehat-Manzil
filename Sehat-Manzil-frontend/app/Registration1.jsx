import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

const RegistrationScreen1 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-6 bg-background">
        <Text className="text-white text-lg text-center mt-16">Hey there,</Text>
        <Text className="text-white text-2xl text-center font-bold mb-6">Create an Account</Text>

        <View className="mb-6 space-y-4">
          <TextInput
            className="bg-[#161818] rounded-lg p-4 text-white"
            placeholder="Full Name"
            placeholderTextColor="#9CA3AF"
            onChangeText={newText => setName(newText)}
          />
          <TextInput
            className="bg-[#161818] rounded-lg p-4 text-white"
            placeholder="Phone Number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            onChangeText={newPhone => setPhone(newPhone)}
          />
          <TextInput
            className="bg-[#161818] rounded-lg p-4 text-white"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            onChangeText={newEmail => setEmail(newEmail)}
          />
          <View className="flex-row items-center bg-[#161818] rounded-lg pr-4">
            <TextInput
              className="flex-1 p-4 text-white"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              onChangeText={newPassword => setPassword(newPassword)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
            <View className={`w-5 h-5 border border-gray-500 rounded mr-3 ${acceptedTerms ? 'bg-indigo-600 border-indigo-600' : ''}`} />
          </TouchableOpacity>
          <Text className="text-gray-400 flex-1">
            By continuing you accept our Privacy Policy and Term of Use
          </Text>
        </View>

        <TouchableOpacity className="bg-indigo-600 rounded-full py-4 items-center mb-6 mt-20">
          <Text className="text-white font-bold text-lg">Register</Text>
        </TouchableOpacity>

        <Text className="text-gray-400 text-center mb-6">Or</Text>

        <View className="flex-row justify-center mb-6 space-x-4">
          <TouchableOpacity className="w-12 h-12 bg-gray-700 rounded-full justify-center items-center">
            <Text className="text-white text-lg">G</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-gray-400">Already have an account? </Text>
          <TouchableOpacity>
            <Text className="text-indigo-600 font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen1;