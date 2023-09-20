import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
function authReducer(state, action) {
  switch (action.type) {
    case "login": {
      return { user: action.payload, isAuthenticated: true };
    }

    case "logout": {
      return { user: null, isAuthenticated: false };
    }

    default:
      throw new Error("unkhown action");
  }
}
export const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(user) {
    dispatch({ type: "login", payload: user });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ login, logout , user, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
