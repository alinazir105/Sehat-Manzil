import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

const TabIcon = ({ name, color, focused }) => {
  return (
    <View className="justify-center items-center gap-2">
      <Ionicons 
        name={name} 
        size={24} 
        color={color} 
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'pregular'} text-xs`}
        style={{ color }}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
            position: 'absolute', // Make tab bar floating
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 30, // Optional for rounded corners
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="home-outline"
                color={color}
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="add-outline"
                color={color}
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="person-outline"
                color={color}
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="bookmark-outline"
                color={color}
                focused={focused}
              />
            )
          }}
        />
      </Tabs>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 40, // Adjust this to move the button above the tab bar
          left: '50%',
          transform: [{ translateX: -35 }], // Adjust to center the button
          backgroundColor: '#8000FF', // Button color (purple)
          borderRadius: 35, // Round shape
          width: 70,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => console.log('Search FAB clicked')}
      >
        <Ionicons 
          name="search-outline" 
          size={30} 
          color="white" 
        />
      </TouchableOpacity>
    </>
  );
};

export default TabsLayout;
