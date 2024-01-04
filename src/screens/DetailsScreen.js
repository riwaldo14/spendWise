import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { TransactionContext } from "../../store/transaction-context";

export default function DetailsScreen({ route, navigation }) {
  const transactionCtx = useContext(TransactionContext);

  const selectedTransactionId = route.params?.transactionId;

  const selectedTransaction = transactionCtx.transactions.find(
    (transaction) => transaction.id === selectedTransactionId
  );

  function deleteTransactionHandler() {
    transactionCtx.deleteTransaction(selectedTransactionId);
    navigation.goBack();
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Details</Text>
      {selectedTransaction && (
        <>
          <View style={styles.details}>
            <Text style={styles.label}>Amount:</Text>
            <Text>{selectedTransaction.amount}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.label}>Category:</Text>
            <Text>{selectedTransaction.category}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.label}>Note:</Text>
            <Text>{selectedTransaction.note}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.label}>Date:</Text>
            <Text>{selectedTransaction.date}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.label}>Source of Fund:</Text>
            <Text>{selectedTransaction.sourceOfFund}</Text>
          </View>
          <Pressable onPress={deleteTransactionHandler} style={styles.button}>
            <Text>Delete Transaction</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
  },
  button: {
    padding: 16,
    backgroundColor: "#ff9494",
  },
});
