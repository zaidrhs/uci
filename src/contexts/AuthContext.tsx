import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const roles = {
  "admin@example.com": "ADMIN",
  "admin2@example.com": "ADMIN",
  "user@example.com": "USER",
  "user2@example.com": "USER",
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const storedRole = roles[firebaseUser.email!] || "USER";
        const storedUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName || "User",
          role: storedRole,
        };
        setUser(storedUser);
        localStorage.setItem("user", JSON.stringify(storedUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const register = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const role = roles[email] || "USER";
      const newUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name,
        role,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      throw new Error(error.message || "Registration failed");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const role = roles[email] || "USER";
      const loggedInUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: firebaseUser.displayName || "User",
        role,
      };

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const role = roles[firebaseUser.email!] || "USER";
      const googleUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: firebaseUser.displayName!,
        role,
      };

      setUser(googleUser);
      localStorage.setItem("user", JSON.stringify(googleUser));

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      throw new Error(error.message || "Google login failed");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error: any) {
      throw new Error(error.message || "Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
