import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function InputField({
  placeholder,
  keyboardType,
  value,
  onChangeText,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
});
