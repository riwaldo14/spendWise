import { createContext, useReducer, useState } from "react";

export const CategoryContext = createContext({
  categories: [],
  addCategory: ({ categoryName, categoryDescription }) => {},
  setCategory: (categories) => {},
  deleteCategory: (id) => {},
  updateCategory: (id, { categoryName, categoryDescription }) => {},
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
  const [categoriesState, dispatch] = useReducer(categoriesReducer, []);

  function addCategory(categoryData) {
    dispatch({ type: "ADD", payload: categoryData });
  }

  function setCategory(categories) {
    dispatch({ type: "SET", payload: categories });
  }

  function deleteCategory(id) {
    dispatch({ typeof: "DELETE", payload: id });
  }

  const value = {
    categories: categoriesState,
    setCategory: setCategory,
    addCategory: addCategory,
    deleteCategory: deleteCategory,
  };
}
