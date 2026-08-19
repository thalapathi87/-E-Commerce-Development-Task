import {
  createContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser =
        localStorage.getItem("user");

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLogoutEvent = () => {
      setUser(null);
    };

    window.addEventListener(
      "auth:logout",
      handleLogoutEvent
    );

    return () => {
      window.removeEventListener(
        "auth:logout",
        handleLogoutEvent
      );
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const data = response.data;

      const token =
        data.token ||
        data.accessToken ||
        data.access_token;

      const loggedInUser =
        data.user ||
        data.data?.user ||
        data.data;

      if (!token) {
        throw new Error(
          "Authentication token not received."
        );
      }

      localStorage.setItem("token", token);

      if (loggedInUser) {
        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name,
    email,
    password
  ) => {
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      const data = response.data;

      const token =
        data.token ||
        data.accessToken ||
        data.access_token;

      const loggedInUser =
        data.user ||
        data.data?.user ||
        data.data;

      if (token) {
        localStorage.setItem("token", token);

        if (loggedInUser) {
          localStorage.setItem(
            "user",
            JSON.stringify(loggedInUser)
          );

          setUser(loggedInUser);
        }
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.dispatchEvent(
      new Event("auth:logout")
    );
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: Boolean(
      localStorage.getItem("token")
    ),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;