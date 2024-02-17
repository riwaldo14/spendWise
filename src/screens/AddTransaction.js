import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Button,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  SafeAreaView,
  Animated,
} from "react-native";
import dayjs from "dayjs";

import { v4 as uuidv4 } from "uuid";

//component import
import DatePicker from "../components/DatePicker";
import InputField from "../components/InputField";
import { TransactionContext } from "../../store/transaction-context";
// import BottomSheet from "@devvie/bottom-sheet";
import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

const AddTransaction = ({ route, navigation }) => {
  // const [amount, setAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD HH:mm"));
  const [sourceOfFund, setSourceOfFund] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const transactionId = uuidv4();

  const [activeTransaction, setActiveTransaction] = useState("Expense");
  const translateX = useRef(new Animated.Value(0)).current;

  const handleDateChange = (newDate) => {
    setDate(newDate);
    bottomSheetRef.current?.close();
  };
  const TransactionsCtx = useContext(TransactionContext);
  const editTransaction = route.params?.selectedTransaction;
  const selectedCategory = route.params?.selectedCategory;
  const selectedAccount = route.params?.selectedAccount;

  const sheetRef = useRef(null);

  function selectDateHandler() {
    sheetRef.current.open();
  }

  // console.log("=====");
  // console.log("params selected account > " + selectedAccount);
  // console.log("params edit transaction > " + editTransaction);
  // console.log("params category > " + selectedCategory);
  // console.log(transactionType);

  useEffect(() => {
    if (!editTransaction) {
      // Case 1: New transaction
      if (selectedCategory) {
        setCategory(selectedCategory.categoryName);
        setTransactionType(selectedCategory.categoryType);
      }
      if (selectedAccount) {
        setSourceOfFund(selectedAccount);
      }
    } else {
      // Case 2: Edit transaction
      setAmount(editTransaction.amount);
      setNote(editTransaction.note);
      // setSourceOfFund(editTransaction.sourceOfFund);
      setDate(editTransaction.date);
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
      setSourceOfFund(
        selectedAccount ? selectedAccount : editTransaction.sourceOfFund
      );
    }
  }, [editTransaction, selectedCategory, selectedAccount]);

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

  const getSofText = (editTransaction, selectedAccount) => {
    if (!editTransaction) {
      return selectedAccount ? selectedAccount : "pick account";
    } else {
      return selectedAccount ? selectedAccount : editTransaction.sourceOfFund;
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
      selectedAccount: selectedAccount,
    });
  }

  function chooseSofHandler() {
    navigation.navigate("SelectSourceOfFund", {
      editTransaction: editTransaction,
      selectedCategory: selectedCategory,
    });
  }

  const bottomSheetRef = React.useRef(null);

  const handleSheetChanges = (index) => {
    console.log("Sheet index:", index);
    setIsBottomSheetOpen(index > 0);
    setIsBackdropVisible(index > 0);
  };

  const backgroundColor =
    transactionType === "Expense"
      ? "#ffc8c8"
      : transactionType === "Income"
      ? "#8fff8f"
      : transactionType === "Transfer"
      ? "#80f9ff"
      : "#d6d6d6";

  const handleTransactionTypePress = (type) => {
    setActiveTransaction(type);

    // Move the background smoothly to the selected transaction type
    Animated.spring(translateX, {
      toValue: type === "Expense" ? 0 : type === "Income" ? 1 : 2,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      {/* HEADER SECTION */}
      <SafeAreaView
        style={{
          ...styles.container,
          backgroundColor,
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
              activeTransaction === "Expense" && styles.activeTransactionType,
            ]}
            onPress={() => handleTransactionTypePress("Expense")}
          >
            <Text>Expense</Text>
          </Pressable>
          <Pressable
            style={[
              styles.transactionType,
              activeTransaction === "Income" && styles.activeTransactionType,
            ]}
            onPress={() => handleTransactionTypePress("Income")}
          >
            <Text>Income</Text>
          </Pressable>
          <Pressable
            style={[
              styles.transactionType,
              activeTransaction === "Transfer" && styles.activeTransactionType,
            ]}
            onPress={() => handleTransactionTypePress("Transfer")}
          >
            <Text>Transfer</Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.inputContainer}
          onPress={chooseCategoryHandler}
        >
          <Text style={styles.input}>
            {getCategoryText(editTransaction, selectedCategory)}
          </Text>
        </Pressable>

        <Pressable style={styles.inputContainer} onPress={chooseSofHandler}>
          <Text style={styles.input}>
            {getSofText(editTransaction, selectedAccount)}
          </Text>
        </Pressable>

        <InputField
          placeholder="Note"
          value={note}
          onChangeText={(text) => setNote(text)}
        />

        <Pressable
          style={styles.inputContainer}
          onPress={() => bottomSheetRef.current?.expand()}
        >
          <Text style={styles.input}>{getDateText(editTransaction, date)}</Text>
        </Pressable>

        <Button title="Add Transaction" onPress={submitHandler} />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
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

  datePicker: {
    // flex: 1,
    // height: "100%",
    // width: "80%",
    // marginBottom: 10,
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
    // backgroundColor: "white", // Set the default white background color
  },
  activeTransactionType: {
    backgroundColor: "white", // Set the active white background color
  },
});

export default AddTransaction;
