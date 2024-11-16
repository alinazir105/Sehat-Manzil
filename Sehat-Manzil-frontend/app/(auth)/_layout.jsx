import { View, Text } from 'react-native'
import React from 'react'
import {Stack} from "expo-router"
import {StatusBar} from "expo-status-bar"

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='sign-in'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='sign-up'
          options={{
            headerShown: false
          }}
        />
        {/* <Stack.Screen
          name='registration1'
          options={{
            headerShown: false
          }}
        /> */}
        <Stack.Screen
          name='usergoals'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='userprofile'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='welcome'
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622"/>
    </>
  )
}

export default AuthLayout