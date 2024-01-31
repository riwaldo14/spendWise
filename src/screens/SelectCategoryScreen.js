import React, { useContext, useRef } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CategoryListScreen from "./CategoryListScreen";
import { StyleSheet, Text, View } from "react-native";
import CategoryContextProvider, {
  CategoryContext,
} from "../../store/category-context";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";

export default function SelectCategoryScreen({ navigation, route }) {
  const CategoryCtx = useContext(CategoryContext);

  const Tab = createMaterialTopTabNavigator();

  const editTrx = route.params?.editTransaction;

  const ExpensesScreen = () => {
    return (
      <CategoryListScreen
        data={CategoryCtx.categories}
        categoryType="Expense"
        navigation={navigation}
        editTransaction={editTrx}
      />
    );
  };

  const IncomeScreen = () => {
    return (
      <CategoryListScreen
        data={CategoryCtx.categories}
        categoryType="Income"
        navigation={navigation}
        editTransaction={editTrx}
      />
    );
  };

  const DebtLoanScreen = () => {
    return (
      <CategoryListScreen
        data={CategoryCtx.categories}
        categoryType="Debt/Loan"
        navigation={navigation}
        editTransaction={editTrx}
      />
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Expenses" component={ExpensesScreen} />
        <Tab.Screen name="Income" component={IncomeScreen} />
        <Tab.Screen name="Debt/Loan" component={DebtLoanScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
