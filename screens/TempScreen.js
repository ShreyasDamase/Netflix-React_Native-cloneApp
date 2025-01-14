import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Video } from "expo-av";

const TempScreen = ({ navigation }) => {
  // Playback status state to check when video finishes
  const [status, setStatus] = useState({});

  const handlePlaybackStatusUpdate = (status) => {
    setStatus(status);
    // If video is finished, navigate to LoginScreen and reset the stack
    if (status.didJustFinish) {
      navigation.reset({
        index: 0, // Reset the stack to start with LoginScreen
        routes: [{ name: "Login" }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Video
          source={require("./temp.mp4")} // Local video file
          style={styles.video} // Apply responsive video styles
          controls={true} // Optional: Allows video controls (play/pause etc.)
          resizeMode="cover" // Ensures video covers the whole screen
          shouldPlay={true} // Automatically starts the video
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate} // Handles playback updates
          onError={(e) => console.log("Error loading video", e)}
          onLoad={() => console.log("Video loaded successfully")}
        />
      </View>
    </SafeAreaView>
  );
};

export default TempScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000",
    padding: 8,
  },
  video: {
    flex: 1,
    width: "100%", // Make the video take up the full width
    height: "100%", // Make the video take up the full height
  },
});
