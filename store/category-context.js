import { createContext, useReducer, useState } from "react";

export const CategoryContext = createContext({
  categories: [],
  addCategory: ({
    categoryName,
    categoryDescription,
    parentCategory,
    CategoryType,
  }) => {},
  setCategory: (categories) => {},
  deleteCategory: (id) => {},
  updateCategory: (
    id,
    { categoryName, categoryDescription, parentCategory }
  ) => {},
});

function categoriesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "DELETE":
      return state.filter((category) => category.id !== action.payload);
    default:
      return state;
  }
}

export default function CategoryContextProvider({ children }) {
  const initialCategories = [
    {
      id: "1",
      categoryName: "Food",
      categoryDescription: "Expenses related to food",
      parentCategory: null,
      categoryType: "Expense",
    },
    {
      id: "2",
      categoryName: "Salary",
      categoryDescription: "Monthly income",
      parentCategory: null,
      categoryType: "Income",
    },
    {
      id: "3",
      categoryName: "Groceries",
      categoryDescription: "Expenses on household essentials",
      parentCategory: "1",
      categoryType: "Expense",
    },
    {
      id: "4",
      categoryName: "Bonus",
      categoryDescription: "Year-end bonus",
      parentCategory: "2",
      categoryType: "Income",
    },
    {
      id: "5",
      categoryName: "Dining Out",
      categoryDescription: "Expenses on eating out",
      parentCategory: "1",
      categoryType: "Expense",
    },
    // Add more initial categories as needed
  ];

  const [categoriesState, dispatch] = useReducer(
    categoriesReducer,
    initialCategories
  );

  function addCategory(categoryData) {
    dispatch({ type: "ADD", payload: categoryData });
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