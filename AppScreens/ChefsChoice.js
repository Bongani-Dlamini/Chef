import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChefsChoice = ({ navigation }) => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadDishes();
    });

    return unsubscribe;
  }, [navigation]);

  const loadDishes = async () => {
    try {
      const chefChoiceJSON = await AsyncStorage.getItem("chefChoice");
      if (chefChoiceJSON !== null) {
        const loadedDishes = JSON.parse(chefChoiceJSON);
        setDishes(loadedDishes);
        setFilteredDishes(loadedDishes);
      }
    } catch (error) {
      console.error("Error loading Chef's Choice:", error);
    }
  };

  const removeDish = async (id) => {
    try {
      const updatedDishes = dishes.filter((dish) => dish.id !== id);
      await AsyncStorage.setItem("chefChoice", JSON.stringify(updatedDishes));
      setDishes(updatedDishes);
      filterDishes(activeFilter, updatedDishes);
    } catch (error) {
      console.error("Error removing dish:", error);
    }
  };

  const filterDishes = (category, dishList = dishes) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredDishes(dishList);
    } else {
      const filtered = dishList.filter((dish) => dish.category === category);
      setFilteredDishes(filtered);
    }
  };

  const calculateAveragePrice = (category) => {
    const relevantDishes = category === "All" 
      ? dishes 
      : dishes.filter(dish => dish.category === category);
    
    if (relevantDishes.length === 0) return 0;
    
    const total = relevantDishes.reduce((sum, dish) => sum + dish.price, 0);
    return (total / relevantDishes.length).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.dishItem}>
      <Text style={styles.dishName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.dishPrice}>Price: R{item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeDish(item.id)}
      >
        <Text style={styles.removeButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Choice</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === "All" && styles.activeFilter]}
          onPress={() => filterDishes("All")}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === "Starters" && styles.activeFilter]}
          onPress={() => filterDishes("Starters")}
        >
          <Text style={styles.filterButtonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === "Main Courses" && styles.activeFilter]}
          onPress={() => filterDishes("Main Courses")}
        >
          <Text style={styles.filterButtonText}>Main Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === "Desserts" && styles.activeFilter]}
          onPress={() => filterDishes("Desserts")}
        >
          <Text style={styles.filterButtonText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.averagePriceContainer}>
        <Text style={styles.averagePrice}>
          Average Price: R{calculateAveragePrice(activeFilter)}
        </Text>
      </View>

      <FlatList
        data={filteredDishes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  dishItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dishPrice: {
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "white",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 2,
  },
  activeFilter: {
    backgroundColor: "coral",
  },
  filterButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  averagePriceContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  averagePrice: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChefsChoice;
 // this is the last page where you see all the dishes you added.
