import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { CategoryContext } from "../../store/category-context";

export default function AddNewCategoryScreen({ route }) {
  const categoryCtx = useContext(CategoryContext);
  const newCategoryType = route.params?.categoryType;

  const sheetRef = useRef(null);
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);

  console.log(newCategoryType);

  function selectParentCategoryHandler() {
    console.log("test> ");
    sheetRef.current.open();
  }

  function handleCategorySelection(category) {
    setSelectedParentCategory(category);
    sheetRef.current.close();
  }

  return (
    <View style={styles.container}>
      <Text>Add new {newCategoryType} Category </Text>
      <InputField placeholder={"Category Name"} />
      <Pressable
        style={styles.inputContainer}
        onPress={selectParentCategoryHandler}
      >
        <Text style={styles.input}>
          {selectedParentCategory
            ? selectedParentCategory.categoryName
            : "Select parent category"}
        </Text>
      </Pressable>
      <CustomButton
        onPress={() => {
          console.log("saved");
        }}
        label={"Save Category"}
      />

      <BottomSheet
        ref={sheetRef}
        animationType="spring"
        openDuration={"800"}
        closeDuration={"300"}
      >
        {categoryCtx.categories
          .filter(
            (category) =>
              category.parentCategory === null &&
              category.categoryType === newCategoryType
          )
          .map((category) => (
            <Pressable
              style={styles.inputContainer}
              key={category.id}
              onPress={() => handleCategorySelection(category)}
            >
              <Text style={styles.input}>{category.categoryName}</Text>
            </Pressable>
          ))}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
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
