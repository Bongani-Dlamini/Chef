import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DishInput = ({ route, navigation }) => {
  const { category } = route.params;
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    try {
      const storedDishes = await AsyncStorage.getItem(`dishes_${category}`);
      if (storedDishes !== null) {
        setDishes(JSON.parse(storedDishes));
      }
    } catch (error) {
      console.error("Error loading dishes:", error);
    }
  };

  const saveDish = async () => {
    if (!dishName || !description || !price) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newDish = {
      id: Date.now().toString(),
      name: dishName,
      description,
      price: parseFloat(price),
      category,
    };

    try {
      const updatedDishes = [...dishes, newDish];
      await AsyncStorage.setItem(
        `dishes_${category}`,
        JSON.stringify(updatedDishes)
      );
      setDishes(updatedDishes);
      setDishName("");
      setDescription("");
      setPrice("");
      Alert.alert("Success", "Dish added successfully");
    } catch (error) {
      console.error("Error saving dish:", error);
      Alert.alert("Error", "Failed to save dish");
    }
  };

  const addToChefChoice = async (dish) => {
    try {
      const chefChoiceJSON = await AsyncStorage.getItem("chefChoice");
      let chefChoice = chefChoiceJSON ? JSON.parse(chefChoiceJSON) : [];
      chefChoice.push(dish);
      await AsyncStorage.setItem("chefChoice", JSON.stringify(chefChoice));
      Alert.alert("Success", "Dish added to Chef's Choice");
    } catch (error) {
      console.error("Error adding to Chef's Choice:", error);
      Alert.alert("Error", "Failed to add dish to Chef's Choice");
    }
  };

  const renderDishItem = ({ item }) => (
    <View style={styles.dishItem}>
      <Text style={styles.dishName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.dishPrice}>Price: R{item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToChefChoice(item)}
      >
        <Text style={styles.addButtonText}>Add Dish</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/Useback.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{category}</Text>
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          placeholderTextColor="gray"
          value={dishName}
          onChangeText={setDishName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="gray"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          placeholderTextColor="gray"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveDish}>
          <Text style={styles.saveButtonText}>Save Dish</Text>
        </TouchableOpacity>
        <FlatList
          data={dishes}
          renderItem={renderDishItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          style={styles.viewChefChoiceButton}
          onPress={() => navigation.navigate("ChefsChoice")}
        >
          <Text style={styles.viewChefChoiceButtonText}>View Dish</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFB56D",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  saveButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
  },
  dishItem: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dishPrice: {
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "black",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "white",
  },
  viewChefChoiceButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  viewChefChoiceButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default DishInput;
