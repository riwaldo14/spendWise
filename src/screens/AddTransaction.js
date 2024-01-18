import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import dayjs from "dayjs";

import { v4 as uuidv4 } from "uuid";

//component import
import DatePicker from "../components/DatePicker";
import InputField from "../components/InputField";
import { TransactionContext } from "../../store/transaction-context";

const AddTransaction = ({ route, navigation }) => {
  // const [amount, setAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD HH:mm"));
  const [sourceOfFund, setSourceOfFund] = useState("");
  const [transactionType, setTransactionType] = useState("");

  //generate the ID
  const transactionId = uuidv4();
  //date change handler
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  //panggil context transaction.
  const TransactionsCtx = useContext(TransactionContext);

  const editTransaction = route.params?.selectedTransaction;

  const selectedCategory = route.params?.selectedCategory;

  console.log("transaction type> ", transactionType);

  useEffect(() => {
    if (!editTransaction) {
      // Case 1: New transaction
      if (selectedCategory) {
        setCategory(selectedCategory.categoryName);
        setTransactionType(selectedCategory.categoryType);
      }
    } else {
      // Case 2: Edit transaction
      setAmount(editTransaction.amount);
      setNote(editTransaction.note);
      setSourceOfFund(editTransaction.sourceOfFund);
      setDate(editTransaction.date);

      // Set category based on selectedCategory or editTransaction.category
      setCategory(
        selectedCategory
          ? selectedCategory.categoryName
          : editTransaction.category
      );

      setTransactionType(
        selectedCategory
          ? selectedCategory.categoryType
          : editTransaction.transactionType
      );
    }
  }, [editTransaction, selectedCategory]);

  const getCategoryText = (editTransaction, selectedCategory) => {
    if (!editTransaction) {
      // Case 1: New transaction
      return selectedCategory ? selectedCategory.categoryName : "Pick category";
    } else {
      // Case 2: Edit transaction
      return selectedCategory
        ? selectedCategory.categoryName
        : editTransaction.category;
    }
  };

  function submitHandler() {
    const transactionData = {
      amount,
      category,
      note,
      date,
      sourceOfFund,
      transactionType,
    };
    if (editTransaction) {
      TransactionsCtx.updateTransaction(editTransaction.id, transactionData);
      console.log("editted>", transactionId, editTransaction);
    } else {
      TransactionsCtx.addTransaction({ id: transactionId, ...transactionData });
      console.log("Transaction added:", transactionData);
    }

    navigation.goBack();
  }

  function chooseCategoryHandler() {
    navigation.navigate("SelectCategory", {
      editTransaction: editTransaction,
    });
  }

  return (
    <View style={styles.container}>
      <InputField
        placeholder={"Amount"}
        keyboardType={"numeric"}
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={(text) => setCategory(text)}
          // editable={false}
        />

        <Button title="List Categories" onPress={chooseCategoryHandler} />
      </View> */}

      <Pressable style={styles.inputContainer} onPress={chooseCategoryHandler}>
        <Text style={styles.input}>
          {getCategoryText(editTransaction, selectedCategory)}
        </Text>
      </Pressable>

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

      <DatePicker value={date} onValueChange={handleDateChange} />
      {/* <DatePicker value={date} onValueChange={(date) => setDate(date)} /> */}
      <Button title="Add Transaction" onPress={submitHandler} />
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
  },
});

export default AddTransaction;
