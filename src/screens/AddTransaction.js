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
} from "react-native";
import dayjs from "dayjs";

import { v4 as uuidv4 } from "uuid";

//component import
import DatePicker from "../components/DatePicker";
import InputField from "../components/InputField";
import { TransactionContext } from "../../store/transaction-context";
// import BottomSheet from "@devvie/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";

const AddTransaction = ({ route, navigation }) => {
  // const [amount, setAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD HH:mm"));
  const [sourceOfFund, setSourceOfFund] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const transactionId = uuidv4();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBackdropVisible, setIsBackdropVisible] = useState(true);

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

  const getBackgroundColor = (editTransaction, selectedCategory) => {
    if (!editTransaction) {
      // Case 1: New transaction
      return selectedCategory
        ? getCategoryColor(selectedCategory.categoryType)
        : "grey";
    } else {
      // Case 2: Edit transaction
      return selectedCategory
        ? getCategoryColor(selectedCategory.categoryType)
        : getCategoryColor(editTransaction.categoryType);
    }
  };

  const getCategoryColor = (categoryType) => {
    return categoryType === "expense" ? "pink" : "green";
  };

  const getSofText = (editTransaction, selectedAccount) => {
    if (!editTransaction) {
      return selectedAccount ? selectedAccount : "pick account";
    } else {
      return selectedAccount ? selectedAccount : editTransaction.sourceOfFund;
    }
  };

  const getDateText = (editTransaction, date) => {
    if (!editTransaction) {
      return date ? date : "choose date";
    } else {
      return date ? date : editTransaction.date;
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Rp0"
          style={styles.inputAmount}
          keyboardType={"numeric"}
          returnKeyType="done"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
      </View>

      <View style={styles.contentContainer}>
        <Pressable
          style={styles.inputContainer}
          onPress={chooseCategoryHandler}
        >
          <Text style={styles.input}>
            {getCategoryText(editTransaction, selectedCategory)}
          </Text>
        </Pressable>

        <InputField
          placeholder="Note"
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <Pressable style={styles.inputContainer} onPress={chooseSofHandler}>
          <Text style={styles.input}>
            {getSofText(editTransaction, selectedAccount)}
          </Text>
        </Pressable>

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
        // enableDynamicSizing
        enablePanDownToClose
        contentHeight={"100%"}
        onChange={handleSheetChanges}
      >
        <View style={styles.dateContainer}>
          <DatePicker value={date} onValueChange={handleDateChange} />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: getBackgroundColor(editTransaction, selectedCategory),

    backgroundColor: "pink",
  },
  header: {
    flex: 1,
    width: "100%",
    height: "50%",
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  contentContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 24,
    flex: 3,
    borderRadius: 24,
    borderColor: "black",
    borderWidth: 2,
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
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
  },
});

export default AddTransaction;
