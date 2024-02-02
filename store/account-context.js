import { createContext, useReducer } from "react";

const INITIAL_ACCOUNTS = [
  {
    id: "1",
    accountName: "Wallet",
    initialBalance: "Rp1000",
  },
  {
    id: "2",
    accountName: "Debit Card",
    initialBalance: null,
  },
];

export const AccountContext = createContext({
  accounts: [],
  addAccount: ({ accountName, parentAccount, accountType }) => {},
  setAccount: (accounts) => {},
  deleteAccount: (id) => {},
  updateAccount: (id, { accountName, parentAccount, accountType }) => {},
});

function accountsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload }, ...state];
    case "SET":
      return action.payload;
    case "DELETE":
      return state.filter((account) => account.id !== action.payload);
    default:
      return state;
  }
}

export default function AccountContextProvider({ children }) {
  const [accountsState, dispatch] = useReducer(
    accountsReducer,
    INITIAL_ACCOUNTS
  );

  function addAccount(account) {
    dispatch({ type: "ADD", payload: account });
  }

  function setAccount(accounts) {
    dispatch({ type: "SET", payload: accounts });
  }

  function deleteAccount(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    accounts: accountsState,
    setAccount: setAccount,
    addAccount: addAccount,
    deleteAccount: deleteAccount,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
