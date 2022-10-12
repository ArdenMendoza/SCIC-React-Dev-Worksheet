import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  } as React.CSSProperties
  return (
    <div style={style}>{'Hello World!'}</div>
  )
};

export default Home;
