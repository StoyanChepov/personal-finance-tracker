import { createContext, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { useContext } from "react";

export const AuthContext = createContext({
  email: "",
  accessToken: "",
  isAuthenticated: false,
  changeAuthState: (authState = {}) => {},
  logout: () => null,
});

export function AuthContextProvider(props) {
  const [authState, setAuthState] = usePersistedState("auth", {});
  const changeAuthState = (state) => {
    setAuthState(state);
  };

  const logout = () => {
    setAuthState(null);
  };

  const contextData = {
    userId: authState?._id,
    email: authState?.email,
    accessToken: authState?.accessToken,
    isAuthenticated: !!authState?.email,
    changeAuthState,
    logout,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
