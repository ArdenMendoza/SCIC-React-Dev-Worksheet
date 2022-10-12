import React, { useContext, createContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "./firebase-config";
import { createSecureServer } from "http2";

export const AuthContext = createContext({
  //   isAuthenticated: false,
  user: undefined,
  googleSignIn: () => {},
  googleSignOut: () => {},
});

export const AuthContextProvider = (props: { children: JSX.Element }) => {
  const [user, setUser] = React.useState<any>();
  const eHandlers = {
    googleSignIn: async () => {
      const googleAuthProvider = new GoogleAuthProvider();
      const authResponse = await signInWithPopup(
        firebaseAuth,
        googleAuthProvider
      ).then((res) => res);
      authResponse.user && setUser(authResponse.user);
      return authResponse;
    },
    googleSignOut: async () => {
      setUser(undefined);
      signOut(firebaseAuth);
    },
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn: eHandlers.googleSignIn,
        googleSignOut: eHandlers.googleSignOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
