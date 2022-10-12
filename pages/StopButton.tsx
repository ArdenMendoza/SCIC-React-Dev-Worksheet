import React from "react";

const StopButton = () => {
  const [buttonProps, setButtonProps] = React.useState({
    color: "white",
    height: 100,
    width: 320,
  });

  const styles = React.useMemo(
    () =>
      ({
        WebkitTextStrokeWidth: 0.3,
        WebkitTextStrokeColor: "white",
        fontSize: 40,
        fontWeight: 'bolder',
        color: "black",
        backgroundColor: buttonProps.color,
        height: buttonProps.height,
        width: buttonProps.width,
      } as React.CSSProperties),
    [buttonProps]
  );

  const onButtonClick = () =>
    setButtonProps({
      color: getRandomColor(),
      height: buttonProps.height + 10,
      width: buttonProps.width + 10,
    });

  return (
    <button style={styles} onClick={onButtonClick}>
      {'STOP'}
    </button>
  );
};

const getRandomColor = () => {
  const randomColorInt = () => Math.floor(Math.random() * 256);
  const color = `rgb(${randomColorInt()},${randomColorInt()},${randomColorInt()})`;
  return color;
};

export default StopButton;
