import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';
import { router } from 'expo-router';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const SearchExercise = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('keyword');

  const muscleGroups = useMemo(() => [
    'Glutes','Triceps', 'Cardio', 'Full Body', 'Back', 
    'Biceps', 'Legs', 'Hamstrings', 'Chest', 'Shoulders', 'Quads', 'Core'
  ], []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      let response;
      if (selectedFilter === 'keyword') {
        response = await axios.get(`${BASE_URL}/searchExercises?keyword=${searchQuery}`);
      } else {
        response = await axios.get(`${BASE_URL}/searchExercisesByMuscle?muscle=${searchQuery}`);
      }
      
      if (response.data.success) {
        setExercises(response.data.data);
      } else {
        console.error('Search failed:', response.data.message);
        setExercises([]);
      }
    } catch (error) {
      console.error('Error searching exercises:', error);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedFilter]);

  const handleExercisePress = useCallback((exercise) => {
    router.push({
      pathname: '/exercise-details',
      params: { exercise: JSON.stringify(exercise) }
    });
  }, []);

  const ExerciseCard = React.memo(({ exercise }) => (
    <TouchableOpacity 
      className="bg-purple-900 rounded-xl p-4 mb-4"
      onPress={() => handleExercisePress(exercise)}
      activeOpacity={0.7}
    >
      <Text className="text-white text-xl font-bold mb-2">{exercise.name}</Text>
      <Text className="text-gray-300 mb-2">Muscle Group: {exercise.muscle_group}</Text>
      
      <View className="flex-row space-x-4 mb-2">
        <Text className="text-gray-300">Sets: {exercise.sets}</Text>
        <Text className="text-gray-300">Reps: {exercise.reps}</Text>
        <Text className="text-gray-300">Rest: {exercise.rest_time}s</Text>
      </View>
      
      <Text className="text-gray-300" numberOfLines={2}>{exercise.instructions}</Text>
    </TouchableOpacity>
  ));

  const BackButton = () => (
    <TouchableOpacity 
      className="absolute top-8 left-2 p-2 bg-gray-800/50 rounded-full"
      onPress={() => router.push('/manage-workouts')}
      activeOpacity={0.7}
    >
      <ChevronLeftIcon color="white" size={24} />
    </TouchableOpacity>
  );


  return (
    <SafeAreaView className="bg-gray-900 flex-1">
      <BackButton/>
      <View className="p-4 pb-16 mt-10">
        <Text className="text-white text-2xl font-bold mb-6">
          Search Exercises
        </Text>

        <View className="flex-row mb-4">
          <TouchableOpacity
            className={`flex-1 p-3 rounded-l-xl ${
              selectedFilter === 'keyword' ? 'bg-purple-600' : 'bg-purple-900'
            }`}
            onPress={() => setSelectedFilter('keyword')}
          >
            <Text className="text-white text-center font-semibold">
              Search by Keyword
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className={`flex-1 p-3 rounded-r-xl ${
              selectedFilter === 'muscle' ? 'bg-purple-600' : 'bg-purple-900'
            }`}
            onPress={() => setSelectedFilter('muscle')}
          >
            <Text className="text-white text-center font-semibold">
              Search by Muscle
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row mb-6">
          <TextInput
            className="flex-1 bg-purple-900 text-white px-4 py-3 rounded-l-xl"
            placeholder={selectedFilter === 'keyword' ? "Search exercises..." : "Enter muscle group..."}
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            className="bg-purple-600 px-6 py-3 rounded-r-xl"
            onPress={handleSearch}
          >
            <Text className="text-white font-semibold">Search</Text>
          </TouchableOpacity>
        </View>

        {selectedFilter === 'muscle' && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {muscleGroups.map((muscle) => (
              <TouchableOpacity
                key={muscle}
                className={`mr-2 p-2 rounded-xl ${
                  searchQuery === muscle ? 'bg-purple-600' : 'bg-purple-900'
                }`}
                onPress={() => setSearchQuery(muscle)}
              >
                <Text className="text-white">{muscle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
          {loading ? (
            <ActivityIndicator size="large" color="#9333EA" />
          ) : exercises.length > 0 ? (
            exercises.map((exercise) => (
              <ExerciseCard key={exercise.exercise_id} exercise={exercise} />
            ))
          ) : (
            <Text className="text-gray-400 text-center mt-4">
              No exercises found. Try a different search.
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchExercise;