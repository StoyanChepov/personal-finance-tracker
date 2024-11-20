import { login, register, logout } from "../api/auth-api";
import { useAuthContext } from "../contexts/AuthContext";
export const LoginHook = () => {
  const { changeAuthState } = useAuthContext();
  const loginHandler = async (email, password) => {
    try {
      console.log("Login authHook: ", email, password);
      const { password: pass, ...authData } = await login(email, password);
      console.log("Auth: ", authData);
      console.log("Auth data for state: ", pass);
      
      changeAuthState(authData);
      //localStorage.setItem("auth", JSON.stringify(authData));
    } catch (error) {
      console.log(error);
    }
  };
  return loginHandler;
};

export const RegisterHook = () => {
  const { changeAuthState } = useAuthContext();
  const registerHandler = async (email, password, repass) => {
    const { password: pass, ...authData } = await register(email, password, repass);
    console.log("Auth data for state: ", authData);
    console.log("Auth data for state: ", pass);
    
    changeAuthState(authData);
    //localStorage.setItem("auth", JSON.stringify(authData));
    return authData;
  };
  return registerHandler;
};

export const LogoutHook = () => {
  const { logout: localLogout } = useAuthContext();
  const logoutHandler = async () => {
    await logout();
    localLogout();
  };
  return logoutHandler;
};
