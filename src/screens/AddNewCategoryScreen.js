import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

export default function AddNewCategoryScreen({ route }) {
  const newCategoryType = route.params?.categoryType;

  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  return (
    <View style={styles.container}>
      <Text>{"New " + newCategoryType}</Text>
      <InputField
        placeholder={"Category Name"}
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />
      <InputField placeholder={"parent category"} />
      <CustomButton
        onPress={() => {
          console.log(categoryName);
        }}
        label={"Button"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});
