import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";

export default function DatePicker({ value, onValueChange }) {
  return (
    <View style={styles.container}>
      <DateTimePicker
        mode={"date"}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
});
