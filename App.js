import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/stack/StackNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ProfileContext } from "./ProfileContext";
export default function App() {
  return (
    <>
      <ProfileContext>
        <StripeProvider publishableKey="pk_test_51QeUPrCGQCKWkYP213Hj5jkugq3CMkSWg4TsiYWdNUxeI90BF87P9FdCoXonyA16P5OpJAmf8YSxDEgnw0n92gLn00pnffMiLf">
          <StackNavigator />
          <StatusBar style="light" />
        </StripeProvider>
      </ProfileContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
