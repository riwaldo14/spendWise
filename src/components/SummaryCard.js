import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { TransactionContext } from "../../store/transaction-context";
import { Ionicons } from "@expo/vector-icons";

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
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Total Expense</Text>
          {/* <View style={styles.iconContainer}>
            <Ionicons
              name="arrow-up-circle-outline"
              color={"black"}
              size={24}
            />
          </View> */}
          <Text style={styles.valueExpense}>{"Rp" + totalExpense}</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Total Income</Text>
          {/* <Ionicons
            name="arrow-down-circle-outline"
            color={"black"}
            size={24}
          /> */}
          <Text style={styles.valueIncome}>{"Rp" + totalIncome}</Text>
        </View>
      </View>

      <View style={styles.columnSaving}>
        <Text style={styles.label}>Balance</Text>
        <Ionicons name="analytics-outline" color={"black"} size={24} />
        <Text style={styles.valueBalance}>{"Rp" + totalSaving}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: "#76ff94",
    borderRadius: 10,
    gap: 12,
  },
  column: {
    flex: 1.5,
    alignItems: "flex-start",
    // backgroundColor: "green",
    // borderColor: "green",
    // borderWidth: 1,
    gap: 12,
  },
  columnSaving: {
    flex: 1,
    backgroundColor: "white",
    // borderWidth: 1,
    borderRadius: 18,
    padding: 8,
  },
  innerContainer: {
    backgroundColor: "white",
    // borderWidth: 1,
    width: "100%",
    borderRadius: 18,
    padding: 8,
    alignContent: "center",
  },
  iconContainer: {
    backgroundColor: "yellow",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  valueIncome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#43a346",
  },
  valueExpense: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6c6c",
  },
  valueBalance: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a389ff",
  },
});
