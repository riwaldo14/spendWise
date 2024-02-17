import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions }) {
  return (
    <FlatList
      data={transactions}
      renderItem={({ item, index }) => {
        // console.log("Item being rendered:", item.date); // Log the item here
        return (
          <TransactionItem
            id={item.id}
            amount={item.amount}
            category={item.category}
            date={item.date}
            sof={item.sourceOfFund}
            note={item.note}
            transactionType={item.transactionType}
          />
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({});
