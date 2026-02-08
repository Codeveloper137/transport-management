import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://transport-management-amber.vercel.app/",
});

export const { signIn, signUp, signOut, useSession } = authClient;
