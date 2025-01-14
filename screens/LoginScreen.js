import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  Animated,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // Import auth from firebase config

const LoginScreen = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation(); // Ensure useNavigation is properly imported and used

  // Create animated value for the button
  const buttonAnim = useRef(new Animated.Value(1)).current; // Initial scale is 1 (normal size)

  // Auto-login functionality (Check if user is already logged in)
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user); // Debugging: Log auth state
      setLoading(false);
      if (user) {
        // Reset the navigation stack to make ProfileScreen the root
        navigation.reset({
          index: 0, // Make ProfileScreen the root screen
          routes: [{ name: "ProfileScreen" }], // Set ProfileScreen as the only route
        });
      }
    });

    return unsubscribe; // Clean up listener on component unmount
  }, [navigation]);

  // Handle button animation (scale effect)
  const scaleButton = (isPressed) => {
    Animated.timing(buttonAnim, {
      toValue: isPressed ? 0.9 : 1, // Scale down when pressed, scale back up when released
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // Sign-in function
  const signIn = async () => {
    setLoading(true); // Set loading true before starting sign-in
    setErrorMessage(""); // Clear any previous error message
    try {
      await signInWithEmailAndPassword(auth, input, password);
      console.log("User signed in successfully.");
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.error("Error signing in:", error.message);
      navigation.reset({
        index: 0, // Reset to the first screen
        routes: [{ name: "ProfileScreen" }], // Navigate to ProfileScreen only
      }); // Set the error message if login fails
    } finally {
      setLoading(false); // Set loading false after sign-in attempt
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading</Text>
            <ActivityIndicator
              size={"large"}
              color={"red"}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
        ) : (
          <>
            <ScrollView>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.netflixLogo}
                  source={require("../assets/loginLogo.png")}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  type="Email"
                  placeholder="Email or phone number"
                  placeholderTextColor="white"
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  style={styles.input}
                  value={input}
                  onChangeText={(text) => setInput(text)}
                />
                <Input
                  type="password"
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="white"
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  style={
                    password.length > 3
                      ? styles.inputPassword
                      : styles.inputWarning
                  }
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                {errorMessage ? (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
              </View>

              {/* Animated Pressable Button */}
              <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
                <Pressable
                  style={styles.button}
                  android_ripple={{
                    color: "#ffffff53", // White ripple effect
                    borderless: false, // Ripple stays inside the button
                  }}
                  onPress={signIn}
                  onPressIn={() => scaleButton(true)} // Scale down when pressed
                  onPressOut={() => scaleButton(false)} // Scale back up when released
                >
                  <Text style={styles.buttonText}>Sign in</Text>
                </Pressable>
              </Animated.View>
              <Text
                style={{
                  margin: 18,
                  color: "#a4a4a4",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                OR
              </Text>
              <Pressable
                style={styles.signup}
                android_ripple={{
                  color: "#4b4747ba",
                  borderless: false,
                  radius: 150,
                }}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.signupText}>
                  New to Netflix? Sign up now.
                </Text>
              </Pressable>
            </ScrollView>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "space-between",
    paddingTop: 50,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginTop: 50,
  },
  loadingText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    marginBottom: 20,
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  netflixLogo: {
    height: 120,
    width: 140,
    marginTop: 20,
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 25,
  },
  input: {
    width: 330,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    color: "white",
    backgroundColor: "gray",
  },

  inputPassword: {
    width: 330,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    color: "white",
    backgroundColor: "gray",
  },
  inputWarning: {
    width: 330,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    color: "white",
    backgroundColor: "#8a0909bb",
  },
  button: {
    width: 330,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ff0000",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#e50914",
  },
  signup: {
    width: 330,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  signupText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
  },
});
