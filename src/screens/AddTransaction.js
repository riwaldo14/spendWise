import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import dayjs from "dayjs";

//component import
import DatePicker from "../components/DatePicker";
import InputField from "../components/InputField";
import { TransactionContext } from "../../store/transaction-context";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const [date, setDate] = useState(dayjs());
  const [sourceOfFund, setSourceOfFund] = useState("");

  const TransactionsCtx = useContext(TransactionContext);

  const handleAddTransaction = () => {
    // Handle adding transaction logic here
    console.log("Transaction added:", {
      amount,
      category,
      note,
      date,
      sourceOfFund,
    });

    TransactionsCtx.addTransaction({
      amount,
      category,
      note,
      date,
      sourceOfFund,
      date,
    });
  };

  return (
    <View style={styles.container}>
      <InputField
        placeholder={"Amount"}
        keyboardType={"numeric"}
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <InputField
        placeholder={"Category"}
        value={category}
        onChangeText={(text) => setCategory(text)}
      />

      <InputField
        placeholder="Note"
        value={note}
        onChangeText={(text) => setNote(text)}
      />

      <InputField
        placeholder="Source of Fund"
        value={sourceOfFund}
        onChangeText={(text) => setSourceOfFund(text)}
      />

      <DatePicker value={date} onValueChange={(date) => setDate(date)} />
      <Button title="Add Transaction" onPress={handleAddTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  datePicker: {
    width: "100%",
    marginBottom: 10,
  },
});

export default AddTransaction;
