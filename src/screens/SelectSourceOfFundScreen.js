import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AccountContext } from "../../store/account-context";

export default function SelectSourceOfFundScreen() {
  accountCtx = useContext(AccountContext);

  function selectAccountHandler(selectedAccount) {
    console.log("selected account", selectedAccount);
  }

  return (
    <View>
      <Text>SelectSourceOfFundScreen</Text>
      <View style={styles.inputContainer}>
        {accountCtx.accounts.map((account) => (
          <Pressable
            style={styles.input}
            onPress={selectAccountHandler(account.accountName)}
          >
            <Text key={account.id}>{account.accountName}</Text>
            <Text>amount {account.balance ? account.balance : "Rp0"}</Text>
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
