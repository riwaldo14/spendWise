import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

// import { CategoryContext } from "../../store/category-context";

// const CategoryCtx = useContext(CategoryContext);

export default function CategoryListScreen({ categoryType }) {
  // console.log(
  //   "TransactionCtx dari Category List JSON>>>",
  //   JSON.stringify(CategoryCtx.categories, null, 2)
  // );
  return (
    <View style={styles.listContainer}>
      <View style={styles.icon}></View>
      <View style={styles.label}></View>
      <Text>{categoryType}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: "#dcdcdc",
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
    width: 24,
    height: 24,
    backgroundColor: "green",
    borderRadius: 16,
  },
});
