import React from "react";

const GuessingGame = () => {
  const getRandomNumber = () => Math.floor(Math.random() * 100);
  const newRandomNum = getRandomNumber();
  const [number, setNumber] = React.useState(newRandomNum);
  const [guessNumber, setGuessNumber] = React.useState(0);

  const message = React.useMemo(
    () =>
      guessNumber === number
        ? "BINGO!"
        : guessNumber > number
        ? "Lower"
        : "Higher",
    [number, guessNumber]
  );

  const onReset = () => {
    setNumber(getRandomNumber());
    setGuessNumber(0);
  }
  const onNumberChange = (newNum: number) => setGuessNumber(newNum)

  const styles = {
    mainContainer: {},
    inputContainer: { display: "flex", gap: 5 } as React.CSSProperties,
  };

  return (
    <div style={styles.mainContainer}>
      <div>{"Guessing Game"}</div>
      <div>{`Guess: ${number}`}</div>
      <div style={styles.inputContainer}>
        <button
          onClick={onReset}
        >
          {"Restart Game"}
        </button>
        <input
          type={"number"}
          value={guessNumber}
          onChange={(e) => onNumberChange(Number(e.target.value))}
        ></input>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default GuessingGame;
