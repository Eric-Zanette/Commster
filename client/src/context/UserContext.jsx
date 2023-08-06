import { useState, createContext, useEffect } from "react";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    get_user();
  }, []);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const register_user = async (formData) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      const status = res.status;
      const data = await res.json();

      return status === 200 ? true : data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const login_user = async (formData) => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });

    const status = res.status;
    const data = await res.json();

    if (status === 200) {
      const token = data.token;
      console.log(token);
      localStorage.setItem("token", token);
      get_user();

      return true;
    }

    return data;
  };

  const get_user = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    const res = await fetch("/api/users/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    const data = await res.json();

    data.username
      ? setUser({ username: capitalize(data.username), id: data.id })
      : setUser(null);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <UsersContext.Provider
      value={{ user, register_user, login_user, setUser, logout }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
