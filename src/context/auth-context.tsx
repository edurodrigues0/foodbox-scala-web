import React, { createContext, useState, useEffect, useContext } from "react";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { refresh } from "@/api/refresh";

interface AuthContextProps {
  user: User | null | undefined;
  accessToken: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const userOnStorage = localStorage.getItem("@foodbox.scala:auth");
    if (userOnStorage) {
      const parsedUser = JSON.parse(userOnStorage);
      setUser(parsedUser);
    } else {
      setUser(undefined)
    }
  }, []);


  const mutation = useMutation({
    mutationFn: refresh,
    onSuccess: (data) => {
      setAccessToken(data?.auth_metadata.token || null);
    },
    onError: (error) => {
      console.error("Erro ao renovar token:", error);
    },
  });

  const refreshAccessToken = async () => {
    if (!user) {
      console.warn("Usuário não está autenticado.");
      return;
    }
    try {
      await mutation.mutateAsync()
    } catch (error) {
      console.error("Erro ao renovar o token:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        refreshAccessToken,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
