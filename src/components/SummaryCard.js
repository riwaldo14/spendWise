import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { TransactionContext } from "../../store/transaction-context";

export default function SummaryCard() {
  const transactionCtx = useContext(TransactionContext);

  const expenseTransaction = transactionCtx.transactions.filter(
    (transaction) => transaction.transactionType === "Expense"
  );

  const totalExpense = expenseTransaction.reduce((sum, transaction) => {
    return sum + parseFloat(transaction.amount);
  }, 0);

  const incomeTransaction = transactionCtx.transactions.filter(
    (transaction) => transaction.transactionType === "Income"
  );

  const totalIncome = incomeTransaction.reduce((sum, transaction) => {
    return sum + parseFloat(transaction.amount);
  }, 0);

  const totalSaving = totalIncome - totalExpense;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.label}>Total Income</Text>
        <Text style={styles.value}>{totalIncome}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Total Expense</Text>
        <Text style={styles.value}>{totalExpense}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Savings</Text>
        <Text style={styles.value}>{totalSaving}</Text>
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
