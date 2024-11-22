import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Menu</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("DishInput", { category: "Starters" })
        }
      >
        <Image
          source={require("../assets/starter.jpg")}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Starter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("DishInput", { category: "Main Courses" })
        }
      >
        <Image
          source={require("../assets/main.jpg")}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Main Course</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("DishInput", { category: "Desserts" })
        }
      >
        <Image
          source={require("../assets/dessert.jpg")}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Dessert</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFB56D",
  },// style for the title on this page
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "black",
  },// style for the style of the button
  button: {
    width: "100%",
    height: 150,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  buttonImage: {
    width: "100%",
    height: "100%",
  },
  buttonText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "gray",
    fontSize: 24,
    fontWeight: "bold",
    textShadowOffset: { width: -1, height: 1 },
  },
});

export default MenuScreen;
