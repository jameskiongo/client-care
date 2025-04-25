import { useContext, createContext, useState } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const handleLogin = () => {
    setAuthenticated(true);
  };
  const logout = () => {
    setAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ handleLogin, authenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
