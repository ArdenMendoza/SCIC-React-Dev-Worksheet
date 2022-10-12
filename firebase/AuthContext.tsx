import React, { useContext, createContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "./firebase-config";

export class User {
  constructor(public email: string, public displayName: string) {}
}
class AuthContextModel {
  user?: User;
  constructor(
    public googleSignIn: () => void,
    public googleSignOut: () => void
  ) {}
}

export const AuthContext = createContext(
  new AuthContextModel(
    () => {},
    () => {}
  )
);

export const AuthContextProvider = (props: { children: JSX.Element }) => {
  const [user, setUser] = React.useState<User>();
  const eHandlers = {
    googleSignIn: async () => {
      const googleAuthProvider = new GoogleAuthProvider();
      const authResponse = await signInWithPopup(
        firebaseAuth,
        googleAuthProvider
      ).then((res) => res);
      authResponse.user &&
        setUser(
          new User(
            authResponse.user?.email ?? "",
            authResponse.user?.displayName ?? ""
          )
        );
      console.log(authResponse.user);
      return authResponse;
    },
    googleSignOut: async () => {
      setUser(undefined);
      signOut(firebaseAuth);
    },
  };

  // React.useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
  //     setUser(new User(currentUser?.email, currentUser?.displayName));
  //   });
  //   unsubscribe();
  // }, []);

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
