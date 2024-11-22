import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [nameSurname, setNameSurname] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Alert.alert("Welcome", "Welcome back boss", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Menu"),
      },
    ]);
  };

  return (
    <ImageBackground
      source={require("../assets/Useback.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Chef Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Name & Surname"
          placeholderTextColor="#888"
          value={nameSurname}
          onChangeText={setNameSurname}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white",
  },
  button: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default LoginScreen;
