import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = () => {
    if (firstName && lastName && email && phone) {
      navigation.navigate("ChefsChoice");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Useback.jpeg")}
      style={styles.background}
    >
      <TouchableOpacity 
        style={styles.profileIconContainer}
        onPress={() => setShowLoginForm(true)}
      >
        <Image 
          source={require("../assets/User.png")}
          style={styles.profileIcon}
        />
      </TouchableOpacity>

      {showLoginForm ? (
        <View style={styles.loginContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setShowLoginForm(false)}
          >
            <Text style={styles.backButtonText}>back</Text>
          </TouchableOpacity>
          
          <Text style={styles.loginTitle}>Enter Login Details</Text>
          
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="gray"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="gray"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="gray"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Enter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.heading}>
            Welcome to the ChrisFoodie Restuarant
          </Text>

          <Image source={require("../assets/chef2.jpg")} style={styles.image} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  profileIconContainer: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 1,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'pink',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: 'brown',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: 300,
    marginBottom: 15,
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#918383',
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default HomeScreen;
