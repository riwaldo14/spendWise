import { createContext, useReducer } from "react";

export const TransactionContext = createContext({
  transactions: [],
  addTransaction: ({ amount, category, note, sof, date }) => {},
  setTransaction: (transactions) => {},
  deleteTransaction: (id) => {},
  updateTransaction: (id, { amount, category, note, sof, date }) => {},
});

function transactionsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverese();
      return inverted;
    case "UPDATE":
      const updatableTransactionIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableTransaction = state[updatableTransactionIndex];
      const updatedItem = { ...updatableTransaction, ...action.payload.data };
      const updatedTransactions = [...state];
      updatedTransactions[updatableTransactionIndex] = updatedItem;
      return updatedTransactions;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function TransactionContextProvider({ children }) {
  const [transactionsState, dispatch] = useReducer(transactionsReducer, []);

  function addTransaction(transactionData) {
    dispatch({ type: "ADD", payload: transactionData });
  }

  function setTransactions(transactions) {
    dispatch({ type: "SET", payload: transactions });
  }

  function deleteTransaction(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTransaction(id, transactionData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: transactionData } });
  }

  const value = {
    transactions: transactionsState,
    setTransactions: setTransactions,
    addTransaction: addTransaction,
    deleteTransaction: deleteTransaction,
    updateTransaction: updateTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
