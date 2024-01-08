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
  const initialCategories = [
    {
      id: 1,
      categoryName: "Electronics",
      categoryDescription: "Devices and gadgets",
      subcategories: [
        { id: 1, name: "Smartphones" },
        { id: 2, name: "Laptops" },
        { id: 3, name: "Tablets" },
      ],
    },
    {
      id: 2,
      categoryName: "Clothing",
      categoryDescription: "Fashion and apparel",
      subcategories: [
        { id: 1, name: "Men's Clothing" },
        { id: 2, name: "Women's Clothing" },
        { id: 3, name: "Kids' Clothing" },
      ],
    },
    {
      id: 3,
      categoryName: "Home & Kitchen",
      categoryDescription: "Household items",
      subcategories: [
        { id: 1, name: "Furniture" },
        { id: 2, name: "Cookware" },
        { id: 3, name: "Home Decor" },
      ],
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
