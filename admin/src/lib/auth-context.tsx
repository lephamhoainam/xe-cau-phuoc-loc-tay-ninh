"use client";

import { createContext, useContext } from "react";
import type { User } from "./api";

export const AuthContext = createContext<User | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}