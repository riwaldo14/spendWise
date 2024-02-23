import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  SafeAreaView,
} from "react-native";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// Component import
import DatePicker from "../components/DatePicker";
import InputField from "../components/InputField";
import { TransactionContext } from "../../store/transaction-context";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { CategoryContext } from "../../store/category-context";
import { AccountContext } from "../../store/account-context";

const AddTransaction = ({ route, navigation }) => {
  const editTransaction = route.params?.selectedTransaction;

  const transactionId = uuidv4();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD HH:mm"));
  const [sourceOfFund, setSourceOfFund] = useState("");
  const [transactionType, setTransactionType] = useState("Expense");

  const TransactionsCtx = useContext(TransactionContext);
  const CategoryCtx = useContext(CategoryContext);
  const AccountCtx = useContext(AccountContext);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetDateRef = useRef(null);
  const bottomSheetCategoryRef = useRef(null);
  const bottomSheetSofRef = useRef(null);

  useEffect(() => {
    if (editTransaction) {
      setAmount(editTransaction.amount);
      setNote(editTransaction.note);
      setSourceOfFund(editTransaction.sourceOfFund);
      setDate(editTransaction.date);
      setCategory(editTransaction.category);
      setTransactionType(editTransaction.transactionType);
    }
  }, [editTransaction]);

  const getCategoryText = (editTransaction) => {
    if (!editTransaction) {
      return category ? category : "Pick category";
    } else {
      return category ? category : editTransaction.category;
    }
  };

  const getSofText = (editTransaction) => {
    if (!editTransaction) {
      return sourceOfFund ? sourceOfFund : "pick account";
    } else {
      return sourceOfFund ? sourceOfFund : editTransaction.sourceOfFund;
    }
  };

  const getDateText = (editTransaction, date) => {
    const formattedDate = dayjs(date).format("DD MMMM YYYY");

    if (!editTransaction) {
      return date ? formattedDate : "choose date";
    } else {
      return date
        ? formattedDate
        : dayjs(editTransaction.date).format("DD MMMM YYYY");
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    bottomSheetDateRef.current?.close();
  };

  const handleSheetChanges = (index) => {
    setIsBottomSheetOpen(index > 0);
  };

  const filteredCategory = CategoryCtx.categories.filter(
    (category) => category.categoryType === transactionType
  );

  const backgroundColor = (trxType) => {
    return trxType === "Expense"
      ? "#ffc8c8"
      : trxType === "Income"
      ? "#8fff8f"
      : trxType === "Transfer"
      ? "#80f9ff"
      : "#d6d6d6";
  };

  const handleTransactionTypePress = (type) => {
    setTransactionType(type);
  };

  const submitHandler = () => {
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
  };

  return (
    <>
      {/* HEADER SECTION */}
      <SafeAreaView
        style={{
          ...styles.container,
          backgroundColor: backgroundColor(transactionType),
        }}
      >
        <View style={{ ...styles.header, backgroundColor }}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" color={"black"} size={24} />
          </Pressable>
          <TextInput
            autoFocus
            placeholder="Rp0"
            style={styles.inputAmount}
            keyboardType={"numeric"}
            returnKeyType="done"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
        </View>
      </SafeAreaView>

      {/* INPUT FORM SECTION */}
      <View style={styles.contentContainer}>
        <View style={styles.transactionTypeContainer}>
          <Pressable
            style={[
              styles.transactionType,
              transactionType === "Expense" && styles.activeTransactionType,
            ]}
            onPress={() => handleTransactionTypePress("Expense")}
          >
            <Text>Expense</Text>
          </Pressable>
          <Pressable
            style={[
              styles.transactionType,
              transactionType === "Income" && styles.activeTransactionType,
            ]}
            onPress={() => handleTransactionTypePress("Income")}
          >
            <Text>Income</Text>
          </Pressable>
          <Pressable
            style={[
              styles.transactionType,
              transactionType === "Transfer" && styles.activeTransactionType,
            ]}
            onPress={() => handleTransactionTypePress("Transfer")}
          >
            <Text>Transfer</Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.inputContainer}
          onPress={() => bottomSheetCategoryRef.current?.expand()}
        >
          <Text style={styles.input}>{getCategoryText(editTransaction)}</Text>
        </Pressable>

        <Pressable
          style={styles.inputContainer}
          onPress={() => bottomSheetSofRef.current?.expand()}
        >
          <Text style={styles.input}>{getSofText(editTransaction)}</Text>
        </Pressable>

        <InputField
          placeholder="Note"
          value={note}
          onChangeText={(text) => setNote(text)}
        />

        <Pressable
          style={styles.inputContainer}
          onPress={() => bottomSheetDateRef.current?.expand()}
        >
          <Text style={styles.input}>{getDateText(editTransaction, date)}</Text>
        </Pressable>

        <Button title="Add Transaction" onPress={submitHandler} />
      </View>
      <BottomSheet
        ref={bottomSheetDateRef}
        index={-1}
        snapPoints={["40%", "62%"]}
        enablePanDownToClose
        contentHeight={"100%"}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
      >
        <View style={styles.dateContainer}>
          <DatePicker value={date} onValueChange={handleDateChange} />
        </View>
      </BottomSheet>
      <BottomSheet
        ref={bottomSheetCategoryRef}
        index={-1}
        snapPoints={["40%", "62%"]}
        enablePanDownToClose
        contentHeight={"100%"}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
      >
        <Text style={styles.bottomSheetTitle}>{transactionType}</Text>
        {filteredCategory.map((category) => (
          <Pressable
            style={{ padding: 8 }}
            key={category.id}
            onPress={() => {
              console.log(category.categoryName);
              setCategory(category.categoryName);
              bottomSheetCategoryRef.current?.close();
            }}
          >
            <Text>{category.categoryName}</Text>
          </Pressable>
        ))}
      </BottomSheet>
      <BottomSheet
        ref={bottomSheetSofRef}
        index={-1}
        snapPoints={["40%", "62%"]}
        enablePanDownToClose
        contentHeight={"100%"}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
      >
        {AccountCtx.accounts.map((account) => (
          <Pressable
            key={account.id}
            style={styles.input}
            onPress={() => {
              bottomSheetSofRef.current?.close();
              setSourceOfFund(account.accountName);
            }}
          >
            <Text>{account.accountName}</Text>
            <Text>
              amount {account.initialBalance ? account.initialBalance : "Rp0"}
            </Text>
          </Pressable>
        ))}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    backgroundColor: "blue",
    width: "100%",
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 24,
    position: "absolute",
    left: 24,
    top: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 24,
    flex: 2,
  },
  inputAmount: {
    fontSize: 32,
    padding: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 16,
  },
  transactionTypeContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    borderRadius: 24,
    borderBlockColor: "black",
    borderWidth: 1,
    backgroundColor: "lightgrey", // Set the light grey background color
  },
  transactionType: {
    flex: 1,
    borderBlockColor: "black",
    borderWidth: 1,
    alignItems: "center",
    alignContent: "center",
    marginHorizontal: 8,
    marginVertical: 8,
    padding: 8,
    borderRadius: 16,
  },
  activeTransactionType: {
    backgroundColor: "white", // Set the active white background color
  },
  bottomSheetTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default AddTransaction;
