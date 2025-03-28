import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/Home.js";
import DurationExercise from "./components/DurationExercise";
import RepetitionExercise from "./components/RepetitionExercise";

const Stack = createStackNavigator();

// returns the components created based off of what screen is displayed
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DurationExercise" component={DurationExercise} />
        <Stack.Screen name="RepetitionExercise" component={RepetitionExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
