import React, { useContext } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import profileDada from "../data/profileDada";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { MovieItems } from "../ProfileContext";

const ProfileScreen = ({ navigation }) => {
  const { profile, setProfile } = useContext(MovieItems);

  console.log("Selected Profile Name:", profile); // Log profile object

  const profiles = profileDada;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
        <Text style={styles.text}>Profiles and more</Text>
      </Pressable>
      <View style={styles.imgContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/loginLogo.png")}
        />
      </View>
      <View style={styles.profileBox}>
        <Text
          style={{
            color: "gray",
            fontSize: 17,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Who's Watching?
        </Text>
        <FlatList
          numColumns={2}
          data={profiles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={{ margin: 10, padding: 10 }}
              onPress={() => {
                setProfile({ name: item.name, image: item.image }); // Set both profile name and image
                navigation.navigate("LoadingScreen");
              }}
            >
              <Image
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 7,
                  resizeMode: "contain",
                }}
                source={{ uri: item.image }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: 15,
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
        />
        <Pressable
          style={styles.button}
          android_ripple={{
            color: "#ffffff32",
            borderless: false,
          }}
          onPress={handleLogout}
        >
          <Text style={{ fontSize: 18, textAlign: "center", color: "gray" }}>
            Sign Out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  text: { color: "white", fontWeight: "600", fontSize: 20, marginLeft: 3 },
  imgContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 140,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profileBox: { flex: 1, alignItems: "center" },
  button: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 45,
  },
});
