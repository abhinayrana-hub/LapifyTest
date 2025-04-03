import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const register = (user) => {
    setUsers((prev) => [...prev, user]);
    setLoggedInUser(user);
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setLoggedInUser(user);
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      return true;
    }
    register({ email, password });
    return false;
  };

  const logout = () => {
    setLoggedInUser(null);
    sessionStorage.removeItem("loggedInUser");
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    alert(`${item.name} added to cart`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const increaseQty = (id, delta = 1) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
    );
  };

  const checkout = (address) => {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order = {
      id: Date.now(),
      items: cart,
      address,
      total,
      date: new Date().toLocaleString(),
    };
    setOrders((prev) => [...prev, order]);
    setCart([]);
    return order;
  };

  return (
    <AppContext.Provider
      value={{
        users,
        loggedInUser,
        cart,
        orders,
        login,
        logout,
        register,
        addToCart,
        removeFromCart,
        increaseQty,
        checkout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
