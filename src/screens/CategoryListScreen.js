import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import CustomButton from "../components/CustomButton";

// import { CategoryContext } from "../../store/category-context";

// const CategoryCtx = useContext(CategoryContext);

export default function CategoryListScreen({ data, categoryType, navigation }) {
  // Filter the data based on the categoryType
  const filteredData = data.filter(
    (category) => category.categoryType === categoryType
  );

  return (
    <View style={styles.listContainer}>
      <CustomButton
        label={"add new " + categoryType}
        onPress={() =>
          navigation.navigate("AddNewCategory", { categoryType: categoryType })
        }
      />
      {filteredData.map((category, index) => (
        <>
          <View
            key={category.id}
            style={[styles.categoryItem, index !== 0 && { marginTop: 16 }]}
          >
            <View style={styles.parentCategoryContainer}>
              <View style={styles.icon} />
              <Text style={styles.categoryName}>{category.categoryName}</Text>
            </View>
            {category.subcategories && category.subcategories.length > 0 && (
              <View style={styles.subcategoriesContainer}>
                {category.subcategories.map((subcategory) => (
                  <View key={subcategory.id} style={styles.subcategoryItem}>
                    <View style={styles.subcategoryIcon} />
                    <Text>{subcategory.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    margin: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#dcdcdc",
    marginHorizontal: 16,
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
});
