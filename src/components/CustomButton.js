import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CustomButton({ label, onPress }) {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
    backgroundColor: "#a5d8ff",
  },
});
