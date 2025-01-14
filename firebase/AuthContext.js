//  import React from "react";
//  import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
//  import { signOut } from "firebase/auth"; // Import signOut from Firebase Auth
//  import { auth } from "../firebase/firebaseConfig"; // Import the auth instance

//  const ProfileScreen = ({ navigation }) => {
//    const handleLogout = async () => {
//      try {
//        await signOut(auth); // Perform sign-out operation
//        navigation.navigate("Login"); // Navigate to the login screen after successful logout
//      } catch (error) {
//        console.error("Logout failed:", error); // Log any error that occurs during sign-out
//      }
//    };

//    return (
//      <View style={styles.container}>
//        <Text style={styles.title}>Profile Screen</Text>
//        {/* Logout Button with custom styles */}
//        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//          <Text style={styles.logoutButtonText}>Logout</Text>
//        </TouchableOpacity>
//      </View>
//    );
//  };

//  const styles = StyleSheet.create({
//    container: {
//      flex: 1,
//      justifyContent: "center",
//      alignItems: "center",
//      backgroundColor: "#f4f4f4",
//    },
//    title: {
//      fontSize: 24,
//      fontWeight: "bold",
//      marginBottom: 20,
//    },
//    logoutButton: {
//      backgroundColor: "#ff4d4d", // Red background color
//      paddingVertical: 12,
//      paddingHorizontal: 40,
//      borderRadius: 5,
//      marginTop: 20,
//    },
//    logoutButtonText: {
//      color: "#fff", // White text
//      fontSize: 16,
//      fontWeight: "600",
//      textAlign: "center",
//    },
//  });

//  export default ProfileScreen;
