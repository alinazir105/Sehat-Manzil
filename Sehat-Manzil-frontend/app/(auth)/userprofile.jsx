import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    TouchableWithoutFeedback,
    Platform,
    Alert,
} from 'react-native';
import { ChevronDownIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { SafeAreaView } from 'react-native-safe-area-context';

import {images } from "../../constants"
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Registration2 = () => {
    const [gender, setGender] = useState(''); // To hold the selected gender
    const [isGenderModalVisible, setGenderModalVisible] = useState(false); // Modal visibility
    const [dateOfBirth, setDateOfBirth] = useState(null); // Initialize date as null
    const [showDatePicker, setShowDatePicker] = useState(false); // Control date picker visibility
    const [weight, setWeight] = useState(''); // State for weight
    const [height, setHeight] = useState(''); // State for height

    // Gender options array
    const genderOptions = ['Male', 'Female', 'Other'];

    useEffect(() => {
        const checkUserGoal = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                console.log('====================================');
                console.log(user);
                console.log('====================================');
                const parsedUser = user ? JSON.parse(user) : null;
    
                if (parsedUser?.goal) {
                    // If goal exists, navigate to home.jsx
                    router.push('/home');
                }
            } catch (error) {
                console.error('Error checking user goal:', error);
            }
        };
    
        checkUserGoal();
    }, []);
    
    
    // Function to handle selecting gender
    const selectGender = (selectedGender) => {
        setGender(selectedGender); // Set the selected gender
        setGenderModalVisible(false); // Close the modal
    };

    // Handle date change
    const onDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setDateOfBirth(selectedDate); // Set the selected date
        }
        setShowDatePicker(Platform.OS === 'ios'); // On iOS keep showing the picker, on Android close it
    };

    // Format the date as DD-MM-YYYY
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

    // Function to handle numeric input validation
    const handleNumericInput = (input, setter) => {
        const numericValue = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        setter(numericValue); // Update the state with numeric value
    };

    const nextpage = async () => {
        if (!gender || !dateOfBirth || !weight || !height) {
            Alert.alert('Error', 'Fill all required fields');
            return;
        }
    
        try {
            const user = await AsyncStorage.getItem('user'); // Await the result
            const parsedUser = user ? JSON.parse(user) : {}; // Parse only if a value exists
    
            // Add or update additional information in AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify({
                ...parsedUser,
                gender,
                dateOfBirth: formatDate(dateOfBirth),
                weight,
                height,
            }));

            const data = await AsyncStorage.getItem('user')
            const parsedData = data? JSON.parse(data) : {}; // Parse only if a value exists
            // Navigate to the next page
            router.push('/usergoals');
        } catch (error) {
            console.error('Error reading or updating AsyncStorage:', error);
        }
    };
    

    return (
            <SafeAreaView className="flex-1 bg-background">
                {/* Main Container */}
                <View className="flex-1 px-6 py-10 justify-between">
                    {/* Profile Image and Text */}
                    <View className="items-center">
                        <Image
                            source={images.registration2}
                            className="w-48 h-48 mb-6"
                        />
                        <Text className="text-white text-2xl font-bold mb-2">Let's complete your profile</Text>
                        <Text className="text-gray-400 text-base mb-8">It will help us to know more about you!</Text>
                    </View>

                    {/* Form Section */}
                    <View className="space-y-4">
                        {/* Gender Input */}
                        <TouchableOpacity
                            onPress={() => setGenderModalVisible(true)} // Open modal when pressed
                            className="bg-[#161818] rounded-xl flex-row items-center justify-between px-4 py-3"
                        >
                            <TextInput
                                className="text-white text-base flex-1"
                                placeholder="Choose Gender"
                                placeholderTextColor="#6B7280"
                                value={gender} // Show selected gender here
                                editable={false} // Make it read-only, so it won't open the keyboard
                            />
                            <ChevronDownIcon color="#6B7280" size={20} />
                        </TouchableOpacity>

                        {/* Date of Birth Input */}
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)} // Open the date picker when pressed
                            className="bg-[#161818] rounded-xl px-4 py-3"
                        >
                            <TextInput
                                className="text-white text-base"
                                placeholder="Date of Birth"
                                placeholderTextColor="#6B7280"
                                value={dateOfBirth ? formatDate(dateOfBirth) : ''} // Show formatted date or placeholder
                                editable={false} // Make it read-only, so it won't open the keyboard
                            />
                        </TouchableOpacity>

                        {/* DateTimePicker modal */}
                        {showDatePicker && (
                            <DateTimePicker
                                value={dateOfBirth || new Date()} // If no date is selected, show current date in the picker
                                mode="date"
                                display="spinner"
                                onChange={onDateChange} // Handle the date change
                                maximumDate={new Date()} // Prevent selecting future dates
                            />
                        )}

                        {/* Weight and Height Inputs */}
                        <View className="flex-row justify-between">
                            <View className="bg-[#161818] rounded-xl px-4 py-3 w-[48%] flex-row items-center justify-between">
                                <TextInput
                                    className="text-white text-base flex-1"
                                    placeholder="Your Weight"
                                    placeholderTextColor="#6B7280"
                                    value={weight} // Bind to weight state
                                    onChangeText={(text) => handleNumericInput(text, setWeight)} // Validate numeric input
                                    keyboardType="numeric"
                                />
                                <Text className="text-[#8E8E93] ml-2">KG</Text>
                            </View>
                            <View className="bg-[#161818] rounded-xl px-4 py-3 w-[48%] flex-row items-center justify-between">
                                <TextInput
                                    className="text-white text-base flex-1"
                                    placeholder="Your Height"
                                    placeholderTextColor="#6B7280"
                                    value={height} // Bind to height state
                                    onChangeText={(text) => handleNumericInput(text, setHeight)} // Validate numeric input
                                    keyboardType="numeric"
                                />
                                <Text className="text-[#8E8E93] ml-2">CM</Text>
                            </View>
                        </View>
                    </View>

                    {/* Next Button */}
                    <TouchableOpacity onPress={nextpage}>
                        <LinearGradient
                            colors={['#8A2BE2', '#5D3FD3']}
                            start={[0, 0]}
                            end={[1, 1]}
                            className="rounded-xl py-4 items-center mt-8"
                        >
                            <Text className="text-white text-lg font-semibold">Next</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Modal for Gender Selection */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isGenderModalVisible}
                    onRequestClose={() => setGenderModalVisible(false)} // Close the modal on pressing back
                >
                    <TouchableWithoutFeedback onPress={() => setGenderModalVisible(false)}>
                        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                            <View className="bg-[#2C2C2E] w-80 rounded-xl p-5">
                                <Text className="text-white text-xl mb-4">Select Gender</Text>
                                <FlatList
                                    data={genderOptions}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => selectGender(item)}
                                            className="py-3 border-b border-gray-600"
                                        >
                                            <Text className="text-white text-lg">{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </SafeAreaView>
    );
};

export default Registration2;
