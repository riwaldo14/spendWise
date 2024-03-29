import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AccountContext } from "../../store/account-context";
import CustomButton from "../components/CustomButton";

export default function SelectSourceOfFundScreen({ route, navigation }) {
  const SelectedTrx = route.params?.editTransaction;
  const SelectedCat = route.params?.selectedCategory;

  accountCtx = useContext(AccountContext);

  function selectAccountHandler(selectedAccount) {
    console.log("selected account", selectedAccount);
    navigation.navigate("AddTransaction", {
      selectedAccount: selectedAccount,
      selectedTransaction: SelectedTrx,
      selectedCategory: SelectedCat,
    });
  }

  function addNewSofHandler() {
    navigation.navigate("AddNewSourceOfFund");
  }

  return (
    <View>
      <Text>SelectSourceOfFundScreen</Text>
      <View style={styles.inputContainer}>
        <CustomButton label={"add new wallet"} onPress={addNewSofHandler} />
        {accountCtx.accounts.map((account) => (
          <Pressable
            key={account.id}
            style={styles.input}
            onPress={() => selectAccountHandler(account.accountName)}
          >
            <Text>{account.accountName}</Text>
            <Text>
              amount {account.initialBalance ? account.initialBalance : "Rp0"}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  inputContainer: {
    // alignItems: "center",
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
  },
});
