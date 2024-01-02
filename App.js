import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Import Screens
import AccountScreen from "./src/screens/AccountScreen";
import BudgetScreen from "./src/screens/BudgetScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ReportScreen from "./src/screens/ReportScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import AddTransaction from "./src/screens/AddTransaction";
import TransactionContextProvider from "./store/transaction-context";

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </HomeStack.Navigator>
  );
}

const ReportStack = createNativeStackNavigator();

function ReportStackScreen() {
  return (
    <ReportStack.Navigator>
      <ReportStack.Screen name="Reports" component={ReportScreen} />
    </ReportStack.Navigator>
  );
}

const AddTransactionStack = createNativeStackNavigator();

function AddTransactionStackScreen() {
  return (
    <AddTransactionStack.Navigator>
      <AddTransactionStack.Screen
        name="AddTransaction"
        component={AddTransaction}
      />
    </AddTransactionStack.Navigator>
  );
}

const BudgetStack = createNativeStackNavigator();

function BudgetStackScreen() {
  return (
    <BudgetStack.Navigator>
      <BudgetStack.Screen name="Budget" component={BudgetScreen} />
    </BudgetStack.Navigator>
  );
}

const AccountStack = createNativeStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} />
    </AccountStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TransactionContextProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="HomeTab" component={HomeStackScreen} />
          <Tab.Screen name="ReportsTab" component={ReportStackScreen} />
          <Tab.Screen
            name="AddTransactionTab"
            component={AddTransactionStackScreen}
          />
          <Tab.Screen name="BudgetTab" component={BudgetStackScreen} />
          <Tab.Screen name="AccountTab" component={AccountStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TransactionContextProvider>
  );
  ``;
}
