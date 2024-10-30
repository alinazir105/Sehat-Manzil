import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background border">
      <View className="px-4 bg-background flex-1 justify-around py-5">
        <View>
          <View className="mb-12">
            <Text className="text-white text-lg text-center mt-12">Hey there,</Text>
            <Text className="text-white text-2xl text-center font-bold mb-4">Welcome Back</Text>
          </View>

          <View className="mb-4 space-y-3">
            {/* Email Input */}
            <View className="flex-row items-center bg-[#161818] rounded-xl p-3">
              <Ionicons name="mail-outline" size={22} color="#9CA3AF" style={{ marginRight: 8 }} />
              <TextInput
                className="flex-1 text-white"
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                onChangeText={(newEmail) => setEmail(newEmail)}
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center bg-[#161818] rounded-xl p-3">
              <Ionicons name="lock-closed-outline" size={22} color="#9CA3AF" style={{ marginRight: 8 }} />
              <TextInput
                className="flex-1 text-white"
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                onChangeText={(newPassword) => setPassword(newPassword)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <View className="flex-row justify-center mt-2">
              <TouchableOpacity>
                <Text className="text-gray-300 underline font-bold text-sm">Forgot your password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity className="bg-indigo-600 rounded-full py-3 items-center mb-4 mt-8 flex-row justify-center">
            <Ionicons name="log-in-outline" size={22} color="white" style={{ marginRight: 8 }} />
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>

          <Text className="text-gray-400 text-center mb-3">Or</Text>

          {/* Google Sign-In Button */}
          <View className="flex-row justify-center mb-4 space-x-3">
            <TouchableOpacity className="w-full py-3 bg-gray-700 rounded-full justify-center items-center flex-row">
              <Ionicons name="logo-google" size={22} color="white" style={{ marginRight: 8 }} />
              <Text className="text-white text-lg">Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-400 text-sm">Don't have an account yet? </Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-bold text-sm">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;