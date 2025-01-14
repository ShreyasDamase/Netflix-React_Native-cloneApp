// HomeScreen.js
import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import NetflixHeader from "../components/NetflixHeader"; // Ensure the path is correct
import TrendingComponent from "../components/TrendingComponent"; // Ensure the path is correct
import MovieRows from "../components/MovieRows"; // Ensure the path is correct

const HomeScreen = () => {
  useEffect(() => {}, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View>
        <NetflixHeader />
        <TrendingComponent />

        <MovieRows />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
