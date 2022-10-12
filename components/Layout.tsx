import Link from "next/link";
import React from "react";

const Layout = (props: { children: any }) => {
  const pages = [
    { title: "Hello World App", url: "/" },
    { title: "Counter App", url: "/Counter" },
    { title: "Calculator App", url: "/Calculator" },
    { title: "Stop Button", url: "/StopButton" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={"layoutLink"}>
        {pages.map((m) => (
          <Link href={m.url}>
            <a>{m.title}</a>
          </Link>
        ))}
      </div>
      <div className={'appMain'}>{props.children}</div>
    </div>
  );
};

export default Layout;
