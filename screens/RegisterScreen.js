import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Animated,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "react-native-elements";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Create animated value for the button
  const buttonAnim = useRef(new Animated.Value(1)).current; // Initial scale is 1 (normal size)

  const scaleButton = (isPressed) => {
    Animated.timing(buttonAnim, {
      toValue: isPressed ? 0.9 : 1, // Scale down when pressed, scale back up when released
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.inputContainer}>
            <Input
              type="email"
              placeholder="Email or phone number"
              placeholderTextColor="white"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={styles.input}
              value={input}
              onChangeText={(text) => setInput(text)} // No email validation now
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <Input
              type="password"
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="white"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={
                password.length > 3 ? styles.inputPassword : styles.inputWarning
              }
              value={password}
              onChangeText={(text) => setPassword(text)} // No password validation now
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

          <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
            <Pressable
              disabled={!input || !password} // Only disable if inputs are empty
              style={styles.button}
              android_ripple={{
                color: "#ffffff53", // White ripple effect
                borderless: false, // Ripple stays inside the button
              }}
              onPressIn={() => scaleButton(true)} // Scale down when pressed
              onPressOut={() => scaleButton(false)} // Scale back up when released
              onPress={() =>
                navigation.navigate("PlanScreen", {
                  email: input,
                  password: password,
                })
              }
            >
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "space-between",
    paddingTop: 50,
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
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});
