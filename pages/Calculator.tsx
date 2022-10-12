import React from "react";

const Calculator = () => {
  const [inputs, setInputs] = React.useState({ firstInput: 0, secondInput: 0 });

  const onChange = (input: "first" | "second") => (e: any) => {
    const inputVal = e.currentTarget.value;
    if (isNaN(inputVal)) {
      console.log({ inputVal });
      debugger;
      return;
    }
    if (inputVal < 0) {
      return;
    }

    switch (input) {
      case "first":
        setInputs({ ...inputs, firstInput: e.currentTarget.value });
        break;
      case "second":
        setInputs({ ...inputs, secondInput: e.currentTarget.value });
        break;
    }
  };

  const styles = {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      rowGap: 10,
    } as React.CSSProperties,
    calcElements: {
      display: "flex",
      height: 30,
      columnGap: 10,
      justifyContent: "space-between",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.calcElements}>
        <input
          type={"number"}
          value={inputs.firstInput}
          onKeyDown={blockInvalidChar}
          onChange={onChange("first")}
        />
        <input
          type={"number"}
          value={inputs.secondInput}
          onKeyDown={blockInvalidChar}
          onChange={onChange("second")}
        />
        <div>{Number(inputs.firstInput) + Number(inputs.secondInput)}</div>
      </div>
      <button onClick={() => setInputs({ firstInput: 0, secondInput: 0 })}>
        {"Reset"}
      </button>
    </div>
  );
};
const blockInvalidChar = (e: any) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

export default Calculator;
