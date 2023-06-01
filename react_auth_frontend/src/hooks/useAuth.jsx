import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Custom hook for reducing the code every time we use context api
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
