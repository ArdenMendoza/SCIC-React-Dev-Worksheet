import React, { useContext, createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseAuth } from "./firebase-config";
import { setCookie, deleteCookie } from "cookies-next";

export class User {
  constructor(public email: string, public displayName: string) {}
}
class AuthContextModel {
  constructor(
    public googleSignIn: () => any,
    public googleSignOut: () => void
  ) {}
}

export const AuthContext = createContext(
  new AuthContextModel(
    () => undefined,
    () => {}
  )
);

export const AuthContextProvider = (props: { children: JSX.Element }) => {
  const eHandlers = {
    googleSignIn: async () => {
      const googleAuthProvider = new GoogleAuthProvider();
      const authResponse = await signInWithPopup(
        firebaseAuth,
        googleAuthProvider
      ).then((res) => res);

      setCookie("userEmail", authResponse.user?.email, {
        expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      });
      setCookie("userDisplayName", authResponse.user?.displayName, {
        expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      });
      return authResponse
    },
    googleSignOut: async () => {
      // setUser(undefined);
      deleteCookie("userEmail");
      deleteCookie("userDisplayName");
      signOut(firebaseAuth);
    },
  };

  return (
    <AuthContext.Provider
      value={{
        googleSignIn: eHandlers.googleSignIn,
        googleSignOut: eHandlers.googleSignOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
