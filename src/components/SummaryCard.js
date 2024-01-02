import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SummaryCard() {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.label}>Total Income</Text>
        <Text style={styles.value}>Rp10.000</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Total Expense</Text>
        <Text style={styles.value}>Rp10.000</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Savings</Text>
        <Text style={styles.value}>Rp10.000</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    margin: 10,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
