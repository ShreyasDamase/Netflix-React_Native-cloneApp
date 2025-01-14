import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>
        <ActivityIndicator
          size={"large"}
          color={"red"}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Text>Loading </Text>
      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
