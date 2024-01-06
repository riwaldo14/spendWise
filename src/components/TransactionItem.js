import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

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
            {/* Insert Category Icon Here */}
          </View>
          <View style={styles.details}>
            <Text style={styles.category}>{"CAT> " + category}</Text>
            <Text style={styles.date}>{"SOF> " + sof}</Text>
            <Text style={styles.date}>{"NOTE> " + note}</Text>
            <Text style={styles.date}>{"DATE> " + date}</Text>
          </View>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
    overflow: "hidden",
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
  date: {
    color: "#777",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
