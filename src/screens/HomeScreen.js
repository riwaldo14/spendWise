import { View, Text, SafeAreaView, StyleSheet, Platform } from "react-native";
import React, { useContext } from "react";

//Components Import
import SummaryCard from "../components/SummaryCard";
import TransactionItem from "../components/TransactionItem";
import TransactionList from "../components/TransactionList";
import { TransactionContext } from "../../store/transaction-context";

export default function HomeScreen() {
  const TransactionsCtx = useContext(TransactionContext);

  // console.log(
  //   "TransactionCtx dari HomeScreen JSON>>>",
  //   JSON.stringify(TransactionsCtx.transactions, null, 2)
  // );
  return (
    <>
      <SafeAreaView style={styles.rootContainer}>
        <SummaryCard />
      </SafeAreaView>
      <View style={styles.listContainer}>
        <Text>Transaction List here ↓↓ </Text>
        {TransactionsCtx.transactions.length === 0 ? (
          <Text style={{ textAlign: "center", padding: 32 }}>
            Empty State: No transactions available
          </Text>
        ) : (
          <TransactionList transactions={TransactionsCtx.transactions} />
        )}
        {/* <TransactionList transactions={TransactionsCtx.transactions} /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
});
