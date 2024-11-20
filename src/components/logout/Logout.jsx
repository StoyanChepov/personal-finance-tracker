import { Navigate } from "react-router-dom";
import { LogoutHook } from "../../hooks/useAuthHook";

export default function Logout() {
  const logout = LogoutHook();
  logout();

  return <Navigate to="/login" />;
}
