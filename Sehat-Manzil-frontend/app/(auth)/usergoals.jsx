import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import images from '../../constants/images';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const GoalSelectionScreen = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const originalGoals = [
    {
      title: 'Improve Shape',
      description: 'I have a low amount of body fat and need / want to build more muscle',
      image: images.improveShape,
    },
    {
      title: 'Lean & Tone',
      description: 'Im "skinny fat", look thin but have no shape. I want to add lean muscle in the right way',
      image: images.leanAndTone,
    },
    {
      title: 'Lose Fat',
      description: 'I have over 20 lbs to lose. I want to drop all this fat and gain muscle mass',
      image: images.loseFat,
    },
  ];

  const goals = [
    originalGoals[originalGoals.length - 1],
    ...originalGoals,
    originalGoals[0]
  ];

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: width,
      animated: false
    });
  }, []);

  const handleScroll = (event) => {
    if (isScrolling) return;

    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);

    if (newIndex === goals.length - 1) {
      setIsScrolling(true);
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: width,
          animated: false
        });
        setCurrentIndex(1);
        setIsScrolling(false);
      }, 10);
    } else if (newIndex === 0) {
      setIsScrolling(true);
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: width * (goals.length - 2),
          animated: false
        });
        setCurrentIndex(goals.length - 2);
        setIsScrolling(false);
      }, 10);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const handleContinue = () => {
    // Get the currently selected goal
    const selectedGoal = originalGoals[currentIndex - 1];
    console.log(`Selected goal: ${selectedGoal.title}`);
    router.replace('/welcome')
  };

  const renderGoalCard = (goal, index) => (
    <View 
      key={index} 
      style={{ width: width - 32 }} 
      className="bg-purple-600 rounded-xl mx-4 p-6 items-center"
    >
      <View className="items-center">
        <Image 
          source={goal.image} 
          className="w-48 h-48 mb-6" 
          resizeMode="contain" 
        />
        <Text className="text-white text-2xl font-bold mb-3">
          {goal.title}
        </Text>
        <Text className="text-gray-200 text-center text-lg leading-6">
          {goal.description}
        </Text>
      </View>
    </View>
  );

  const renderPageIndicator = () => (
    <View className="flex-row justify-center space-x-2 mb-6">
      {originalGoals.map((_, index) => (
        <View
          key={index}
          className={`rounded-full h-2 w-2 ${
            currentIndex - 1 === index ? 'bg-white w-4' : 'bg-gray-400'
          }`}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-8 pb-4">
          <Text className="text-white text-3xl font-bold text-center">
            What's your goal?
          </Text>
          <Text className="text-gray-300 text-lg text-center mt-3">
            Select your fitness goal to get a personalized program
          </Text>
        </View>

        {/* Scrollable Cards */}
        <View className="flex-1 justify-center">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={width}
            decelerationRate="fast"
            onMomentumScrollEnd={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingVertical: 20 }}
          >
            {goals.map(renderGoalCard)}
          </ScrollView>
        </View>

        {/* Bottom Section */}
        <View className="px-6 pb-8">
          {renderPageIndicator()}
          <TouchableOpacity
            className="bg-white py-4 rounded-full w-full"
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text className="text-purple-600 text-xl font-bold text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GoalSelectionScreen;