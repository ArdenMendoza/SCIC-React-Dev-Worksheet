import React from "react";

const Counter = () => {
  const [count, setCount] = React.useState(0);
  const styles = {
    mainContainer: {
      display: "flex",
      flexDirection: 'column',
      rowGap: 20,
      justifyContent: 'center'
    } as React.CSSProperties,
    countContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 150,
    } as React.CSSProperties,
    counterContainer: {
      display: "flex",
      columnGap: 20,
      alignItems: "center",
      justifyContent: "center",
    } as React.CSSProperties,
  };
  return (
    <div style={styles.mainContainer}>
      <div style={styles.counterContainer}>
        <button onClick={() => setCount(count - 1)}>{"Decrement"}</button>
        <div style={styles.countContainer}>
          <div>{count}</div>
          <div>{`The number is ${count % 2 == 0 ? "EVEN" : "ODD"}`}</div>
        </div>
        <button onClick={() => setCount(count + 1)}>{"Increment"}</button>
      </div>
      <button onClick={() => setCount(0)}>{"Reset"}</button>
    </div>
  );
};

export default Counter;
