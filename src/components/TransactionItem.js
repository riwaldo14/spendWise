import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";

export default function TransactionItem({
  id,
  amount,
  category,
  note,
  sof,
  date,
}) {
  const navigation = useNavigation();

  function transactionItemPressHandler() {
    navigation.navigate("DetailsScreen", { transactionId: id });
  }

  return (
    <Pressable onPress={transactionItemPressHandler}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.categoryIcon}>
            <Ionicons
              name="arrow-down-circle-outline"
              color={"black"}
              size={24}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.date}>{sof}</Text>
          </View>
          <Text style={styles.amount}>{amount}</Text>
        </View>
        {note !== "" ? (
          <View style={styles.noteContainer}>
            <Ionicons
              name="document-text-outline"
              color={"black"}
              size={16}
              style={{ marginRight: 4, color: "#777" }}
            />
            <Text style={styles.note}>{note}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    marginTop: 8,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noteContainer: {
    marginTop: 8,
    backgroundColor: "#f4f4f4",
    padding: 8,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  note: {
    color: "#777",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
