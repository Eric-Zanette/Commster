import { useState, createContext } from "react";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState();

  const register_user = async (formData) => {
    const res = await fetch("api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });

    const status = await res.status;
    const data = await res.json();

    console.log(data);
    console.log(status);

    return status === 200 ? true : data;
  };

  const login = (formData) => {
    fetch("api/users");
  };

  return (
    <UsersContext.Provider value={{ user, register_user, login, setUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
