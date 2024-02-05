import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { TransactionContext } from "../../store/transaction-context";
import { AccountContext } from "../../store/account-context";

export default function ReportScreen() {
  const transactionCtx = useContext(TransactionContext);
  const accountCtx = useContext(AccountContext);

  const accountNames = accountCtx.accounts.map(
    (account) => account.accountName
  );

  // Group transactions by source of fund
  const groupedTransactions = transactionCtx.transactions.reduce(
    (groups, transaction) => {
      const key = transaction.sourceOfFund;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(transaction);
      return groups;
    },
    {}
  );

  console.log(JSON.stringify(groupedTransactions, null, 2));

  return (
    <View>
      <Text>ReportScreen</Text>
      {accountNames.map((sourceOfFund) => {
        const transactions = groupedTransactions[sourceOfFund] || [];
        const initialBalance =
          accountCtx.accounts.find(
            (account) => account.accountName === sourceOfFund
          )?.initialBalance || "Rp0";

        const totalSum = transactions.reduce((sum, transaction) => {
          const transactionAmount = parseFloat(transaction.amount);
          const transactionType = transaction.transactionType.toLowerCase();

          if (transactionType === "income") {
            return sum + transactionAmount;
          } else if (transactionType === "expense") {
            return sum - transactionAmount;
          }

          return sum;
        }, parseFloat(initialBalance.replace("Rp", "")));

        return (
          <View key={sourceOfFund} style={styles.box}>
            <Text>{sourceOfFund}</Text>
            <Text>Total: Rp{totalSum}</Text>
          </View>
        );
      })}
    </View>
  );
}
``;

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 5,
  },
});
