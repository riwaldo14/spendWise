import { View, Text } from "react-native";
import React, { useContext } from "react";

//Components Import
import SummaryCard from "../components/SummaryCard";
import TransactionItem from "../components/TransactionItem";
import TransactionList from "../components/TransactionList";
import { TransactionContext } from "../../store/transaction-context";

export default function HomeScreen() {
  const TransactionsCtx = useContext(TransactionContext);
  console.log(
    "TransactionCtx dari HomeScreen>>>" + TransactionsCtx.transactions
  );

  console.log(
    "TransactionCtx dari HomeScreen JSON>>>",
    JSON.stringify(TransactionsCtx.transactions, null, 2)
  );
  return (
    <View>
      <SummaryCard />
      <Text>Transaction item↓ </Text>
      <TransactionItem />
      <Text>Transaction List here ↓↓ </Text>
      <TransactionList transactions={TransactionsCtx.transactions} />
    </View>
  );
}
