import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./AppScreens/Home";
import LoginScreen from "./AppScreens/Login";
import MenuScreen from "./AppScreens/Menu";
import DishInput from "./AppScreens/DishInput";
import ChefsChoice from "./AppScreens/ChefsChoice";

const Stack = createStackNavigator();

// this is the navigation part that helps with all the navigation.
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="DishInput" component={DishInput} />
        <Stack.Screen name="ChefsChoice" component={ChefsChoice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
