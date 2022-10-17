import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AuthContextProvider } from "../firebase/AuthContext";


const Layout = (props: { children: any }) => {
  const router = useRouter();
  const pages = [
    { title: "Hello World App", url: "/" },
    { title: "Counter App", url: "/Counter" },
    { title: "Calculator App", url: "/Calculator" },
    { title: "Stop Button", url: "/StopButton" },
    { title: "Todo List", url: "/Todo" },
    { title: "Pokemon List", url: "/PokeApi" },
    { title: "Guessing Game", url: "/GuessingGame" },
  ];

  return (
    <AuthContextProvider>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={"layoutLink"}>
          {pages.map((m) => (
            <Link key={m.url} href={m.url}>
              <a style={router.pathname === m.url ? { color: "red" } : {}}>
                {m.title}
              </a>
            </Link>
          ))}
        </div>
        <div className={"appMain"}>{props.children}</div>
      </div>
    </AuthContextProvider>
  );
};

export default Layout;
