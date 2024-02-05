import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { AccountContext } from "../../store/account-context";

export default function AddNewSourceOfFundScreen({ navigation }) {
  const [accountName, setAccountName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const AccountCtx = useContext(AccountContext);

  function submitNewSofHandler() {
    const sofData = {
      accountName,
      initialBalance,
    };

    AccountCtx.addAccount(sofData);
    navigation.goBack();
  }

  //   function submitNewCategoryHandler() {
  //     const categoryData = {
  //       categoryName,
  //       parentCategory,
  //       categoryType,
  //     };

  //     CategoryCtx.addCategory(categoryData);
  //     navigation.goBack();
  //   }

  return (
    <View style={styles.container}>
      <Text>Add New Source Of Fund Screen</Text>
      <InputField
        placeholder={"account name"}
        value={accountName}
        onChangeText={(text) => setAccountName(text)}
      />
      <InputField
        placeholder={"initial balance"}
        keyboardType={"numeric"}
        value={initialBalance}
        onChangeText={(text) => setInitialBalance(text)}
      />
      <CustomButton label={"save new wallet"} onPress={submitNewSofHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});
