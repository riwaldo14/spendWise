import * as React from "react";
import { Button, Pressable, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

//Import Screens
import AccountScreen from "./src/screens/AccountScreen";
import BudgetScreen from "./src/screens/BudgetScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ReportScreen from "./src/screens/ReportScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import AddTransaction from "./src/screens/AddTransaction";
import TransactionContextProvider from "./store/transaction-context";
import CategoryListScreen from "./src/screens/CategoryListScreen";
import SelectCategoryScreen from "./src/screens/SelectCategoryScreen";
import CategoryContextProvider from "./store/category-context";

const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function ReportStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Reports" component={ReportScreen} />
    </Stack.Navigator>
  );
}

function BudgetStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Budget" component={BudgetScreen} />
    </Stack.Navigator>
  );
}

function AccountStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainPage() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReportsTab"
        component={ReportStackScreen}
        options={{
          tabBarLabel: "Report",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddTransactionTab"
        component={AddTransaction}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("AddTransaction");
          },
        })}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-add-circle-outline" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="BudgetTab"
        component={BudgetStackScreen}
        options={{
          tabBarLabel: "Budget",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStackScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <TransactionContextProvider>
      <CategoryContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen name="CategoryList" component={CategoryListScreen} />
            <Stack.Screen
              name="SelectCategory"
              component={SelectCategoryScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CategoryContextProvider>
    </TransactionContextProvider>
  );
  ``;
}
