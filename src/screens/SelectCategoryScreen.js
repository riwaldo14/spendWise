import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CategoryListScreen from "./CategoryListScreen";
import { StyleSheet, Text, View } from "react-native";
import CategoryContextProvider, {
  CategoryContext,
} from "../../store/category-context";

export default function SelectCategoryScreen() {
  // Create a Tab navigator
  const Tab = createMaterialTopTabNavigator();

  const ExpensesScreen = () => {
    return <CategoryListScreen categoryType="Expense" />;
  };

  const IncomeScreen = () => {
    return <CategoryListScreen categoryType="Income" />;
  };

  const DebtLoanScreen = () => {
    return <CategoryListScreen categoryType="Debt/Loan" />;
  };

  const CategoryCtx = useContext(CategoryContext);
  console.log(
    "TransactionCtx dari Category List JSON>>>",
    JSON.stringify(CategoryCtx.categories, null, 2)
  );

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
