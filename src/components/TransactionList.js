import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions }) {
  return (
    <FlatList
      data={transactions}
      renderItem={({ item, index }) => (
        <TransactionItem amount={item.amount} category={item.category} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({});
