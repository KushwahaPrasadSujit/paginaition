import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Onboarding from "./onboarding";

const index = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container]}>
        <Onboarding
          total={4}
          selectedIndex={selectedIndex}
          onIndexChange={(index: number) => setSelectedIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
