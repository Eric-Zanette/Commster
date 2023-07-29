import { useState, createContext } from "react";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = (formData) => {
    fetch("api/users");
  };

  return <UsersContext.Provider>{children}</UsersContext.Provider>;
};

export default UsersContext;
