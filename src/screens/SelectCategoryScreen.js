import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CategoryListScreen from "./CategoryListScreen";
import { StyleSheet, Text, View } from "react-native";
import CategoryContextProvider, {
  CategoryContext,
} from "../../store/category-context";

export default function SelectCategoryScreen({ navigation, route }) {
  // Create a Tab navigator
  const Tab = createMaterialTopTabNavigator();

  console.log("test passing params> ", route.params?.editTransaction);

  const ExpensesScreen = () => {
    return (
      <CategoryListScreen
        data={CategoryCtx.categories}
        categoryType="Expense"
        navigation={navigation}
        editTransaction={route.params?.editTransaction}
      />
    );
  };

  const IncomeScreen = () => {
    return (
      <CategoryListScreen
        data={CategoryCtx.categories}
        categoryType="Income"
        navigation={navigation}
        editTransaction={route.params?.editTransaction}
      />
    );
  };

  const DebtLoanScreen = () => {
    return (
      <CategoryListScreen
        data={CategoryCtx.categories}
        categoryType="Debt/Loan"
        navigation={navigation}
        editTransaction={route.params?.editTransaction}
      />
    );
  };

  const CategoryCtx = useContext(CategoryContext);
  // console.log(
  //   "TransactionCtx dari Category List JSON>>>",
  //   JSON.stringify(CategoryCtx.categories, null, 2)
  // );

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
