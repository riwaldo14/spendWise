import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { CategoryContext } from "../../store/category-context";

export default function AddNewCategoryScreen({ route, navigation }) {
  const CategoryCtx = useContext(CategoryContext);
  const categoryType = route.params?.categoryType;
  const sheetRef = useRef(null);
  const [parentCategory, setParentCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const categoryId = CategoryCtx.categories.length + 1;

  // console.log(categoryName);

  function selectParentCategoryHandler() {
    // console.log("test> ");
    sheetRef.current.open();
  }

  function handleCategorySelection(category) {
    console.log("log category", category.categoryName);
    setParentCategory(category.categoryName);
    sheetRef.current.close();
  }

  function submitNewCategoryHandler() {
    const categoryData = {
      categoryName,
      parentCategory,
      categoryType,
    };

    CategoryCtx.addCategory(categoryData);
    // console.log("category Data", categoryData);
    // console.log(JSON.stringify(CategoryCtx.categories, null, 2));
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>Add new {categoryType} Category </Text>
      <InputField
        placeholder={"Category Name"}
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />
      <Pressable
        style={styles.inputContainer}
        onPress={selectParentCategoryHandler}
      >
        <Text style={styles.input}>
          {parentCategory ? parentCategory : "Select parent category"}
        </Text>
      </Pressable>
      <CustomButton
        onPress={submitNewCategoryHandler}
        label={"Save Category"}
      />
      <Text>
        {CategoryCtx.categories.map((category) => {
          category.categoryName;
        })}
      </Text>

      <BottomSheet
        ref={sheetRef}
        animationType="spring"
        openDuration={"800"}
        closeDuration={"300"}
      >
        {CategoryCtx.categories
          .filter(
            (category) =>
              category.parentCategory === null &&
              category.categoryType === categoryType
            // category.categoryName
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
