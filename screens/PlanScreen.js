import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import plans from "../data/plan";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useRoute } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";

const PlanScreen = () => {
  const [selected, setSelected] = useState([]);
  const route = useRoute();
  const email = route.params.email;
  const password = route.params.password;
  const [price, setPrice] = useState();
  console.log(selected);
  console.log(price);
  const data = plans;
  const stripe = useStripe();
  const subscribe = async () => {
    console.log("inside subscribe");

    try {
      // Sending the payment request
      console.log("Sending payment request to server...");
      const response = await fetch("http://192.168.0.177:8080/payment", {
        method: "POST",
        body: JSON.stringify({
          amount: Math.floor(price * 100),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Received response:", response);

      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error in response:",
          errorData.message || "Unknown error"
        );
        return Alert.alert(errorData.message || "An error occurred");
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Extract the client secret
      const clientSecret = data.clientSecret;
      console.log("Client Secret:", clientSecret);

      // Initialize payment sheet
      console.log("Initializing payment sheet...");
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Your Business Name", // Add your merchant name here
      });

      console.log("Payment sheet initialized:", initSheet);

      if (initSheet.error) {
        console.error(
          "Error initializing payment sheet:",
          initSheet.error.message
        );
        return Alert.alert(initSheet.error.message);
      }

      // Present payment sheet
      console.log("Presenting payment sheet...");
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      console.log("Payment sheet presented:", presentSheet);

      if (presentSheet.error) {
        console.error(
          "Error presenting payment sheet:",
          presentSheet.error.message
        );
        return Alert.alert(presentSheet.error.message);
      } else {
        console.log("Payment successful, creating user...");

        // Create user after successful payment
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            console.log("User created:", userCredentials);
            const user = userCredentials.user;
            console.log("User email:", user.email);
          })
          .catch((error) => {
            console.error("Error creating user:", error.message);
          });
      }
    } catch (error) {
      console.error("Error in subscribe function:", error.message);
    }
  };

  console.log(subscribe);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ padding: 10 }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
              Choose the plan that is right for you
            </Text>
            <View style={styles.iconTextContainer}>
              <Feather name="check" size={24} color="#d90000" />
              <Text style={styles.iconText}>Watch all you want ad-free</Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Feather name="check" size={24} color="#d90000" />
              <Text style={styles.iconText}>Recommendations just for you</Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Feather name="check" size={24} color="#d90000" />
              <Text style={styles.iconText}>cancle your plan any time</Text>
            </View>
            <View style={{ marginTop: 20 }}></View>
            {data.map((item, index) => (
              <Pressable
                key={index}
                style={
                  selected.includes(item.name)
                    ? styles.planBoxSelected
                    : styles.planBox
                }
                onPress={() => {
                  setSelected(item.name);
                  setPrice(item.price);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",

                    justifyContent: "space-between",
                    marginRight: 0,
                  }}
                >
                  <View style={styles.planHeading}>
                    <Text style={styles.planHeadingText}>{item.name}</Text>
                  </View>

                  <Text style={{ fontSize: 20, fontWeight: 500 }}>
                    Prise: ₹{item.price}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{ fontSize: 15, fontWeight: 500, color: "gray" }}
                    >
                      Video quality {item.videoQuality}
                    </Text>
                    <Text
                      style={{ fontSize: 15, fontWeight: 500, marginTop: 3 }}
                    >
                      Resolution {item.resolution}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="netflix"
                    size={28}
                    color="black"
                  />
                </View>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    Devices you can watch on:
                  </Text>

                  {item.devices.map((devices) => (
                    <Entypo
                      name={devices.name}
                      size={20}
                      color="#d90000"
                      margin={2}
                    />
                  ))}
                </View>
              </Pressable>
            ))}{" "}
            <View style={{ marginTop: 20 }}></View>
          </View>
        </ScrollView>

        {selected.length > 0 ? (
          <Pressable
            style={{
              backgroundColor: "#d90000",
              padding: 10,
              flexDirection: "row",
              marginBottom: 9,
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 6,
              height: 55,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: 600, color: "white" }}>
                Selected Plan {selected}
              </Text>
            </View>
            <Pressable onPress={subscribe}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "white" }}
              >
                PAY Rs.{price}
              </Text>
            </Pressable>
          </Pressable>
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 40,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center", // Align text and icon vertically centered
  },
  iconText: {
    fontSize: 16,
    marginLeft: 6,
    fontWeight: 600,
  },
  planBox: {
    height: 160,
    borderRadius: 7,
    borderColor: "#626060",
    borderWidth: 0.5,
    padding: 15,
    margin: 8,
  },
  planBoxSelected: {
    height: 160,
    borderRadius: 7,
    borderColor: "red",
    borderWidth: 1.5,
    padding: 15,
    margin: 8,
  },
  planHeading: {
    backgroundColor: "#e00813",
    padding: 10,
    width: 120,
    borderRadius: 7,
  },
  planHeadingText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
  },
});
