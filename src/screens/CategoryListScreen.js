import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useRef } from "react";
import CustomButton from "../components/CustomButton";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";

// import { CategoryContext } from "../../store/category-context";

// const CategoryCtx = useContext(CategoryContext);

export default function CategoryListScreen({
  data,
  categoryType,
  navigation,
  editTransaction,
}) {
  // Filter the data based on the categoryType
  const filteredData = data.filter(
    (category) => category.categoryType === categoryType
  );

  const sheetRef = useRef(null);

  const renderCategory = (category, level = 0) => {
    return (
      <Pressable
        key={category.id}
        onPress={() => {
          navigation.navigate("AddTransaction", {
            selectedCategory: category,
            selectedTransaction: editTransaction,
          });
        }}
      >
        <View
          style={[
            styles.categoryItem,
            level !== 0 && { marginLeft: 16 }, // Adjust the marginLeft for child categories
          ]}
        >
          <View style={styles.parentCategoryContainer}>
            <View
              style={[
                styles.icon,
                level !== 0 && { backgroundColor: "#c5ffaa" },
              ]}
            />
            <Text style={styles.categoryName}>{category.categoryName}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.listContainer}>
      <CustomButton
        label={"add new " + categoryType}
        onPress={() => {
          // sheetRef.current?.open();
          navigation.navigate("AddNewCategory", { categoryType: categoryType });
        }}
      />
      {filteredData.map((category) => {
        if (category.parentCategory) {
          // Render child categories under their parent
          const parentCategory = data.find(
            (parent) => parent.categoryName === category.parentCategory
          );
          if (parentCategory) {
            return renderCategory(category, 1);
          }
        } else {
          // Render top-level categories
          return renderCategory(category, 0);
        }
        return null;
      })}
      <BottomSheet ref={sheetRef}>
        <Text>Add New {categoryType}</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="category name"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="parent category"
          ></TextInput>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    margin: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#dcdcdc",
    // marginHorizontal: 16,
    flex: 1,
  },
  categoryItem: {
    marginBottom: 12,
  },
  icon: {
    marginRight: 16,
    width: 24,
    height: 24,
    backgroundColor: "green",
    borderRadius: 12,
  },

  parentCategoryContainer: {
    flexDirection: "row",
  },
  categoryName: {
    fontWeight: "bold",
    marginRight: 8,
  },
  subcategoriesContainer: {
    marginLeft: 24, // Indentation for subcategories
  },
  subcategoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  subcategoryIcon: {
    marginRight: 8,
    width: 16,
    height: 16,
    backgroundColor: "blue",
    borderRadius: 8,
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
