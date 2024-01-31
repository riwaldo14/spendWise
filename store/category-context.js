import { createContext, useReducer, useState } from "react";

const INITIAL_CATEGORIES = [
  {
    id: "1",
    categoryName: "Food",
    parentCategory: null,
    categoryType: "Expense",
  },
  {
    id: "2",
    categoryName: "Groceries",
    parentCategory: null,
    categoryType: "Expense",
  },
  {
    id: "3",
    categoryName: "Meals",
    parentCategory: "Food",
    categoryType: "Expense",
  },
  {
    id: "4",
    categoryName: "Service",
    parentCategory: null,
    categoryType: "Expense",
  },

  {
    id: "5",
    categoryName: "Salary",
    parentCategory: null,
    categoryType: "Income",
  },

  {
    id: "6",
    categoryName: "Bonus",
    parentCategory: "Salary",
    categoryType: "Income",
  },
  {
    id: "7",
    categoryName: "Dining Out",
    parentCategory: "Food",
    categoryType: "Expense",
  },
  {
    id: "8",
    categoryName: "Makan",
    parentCategory: "Food",
    categoryType: "Expense",
  },
  //food category
  // Add more initial categories as needed
];

export const CategoryContext = createContext({
  categories: [],
  addCategory: ({ categoryName, parentCategory, categoryType }) => {},
  setCategory: (categories) => {},
  deleteCategory: (id) => {},
  updateCategory: (id, { categoryName, parentCategory, categoryType }) => {},
});

function categoriesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload }, ...state];
    case "SET":
      return action.payload;
    case "DELETE":
      return state.filter((category) => category.id !== action.payload);
    default:
      return state;
  }
}

export default function CategoryContextProvider({ children }) {
  const [categoriesState, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_CATEGORIES
  );

  function addCategory(category) {
    dispatch({ type: "ADD", payload: category });
  }

  function setCategory(categories) {
    dispatch({ type: "SET", payload: categories });
  }

  function deleteCategory(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    categories: categoriesState,
    setCategory: setCategory,
    addCategory: addCategory,
    deleteCategory: deleteCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
