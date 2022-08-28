import React from "react";

export const useTimer = (test: () => void, duration: number) => {
  //   const [timer, setTimer] = React.useState<NodeJS.Timer>();

  const timer = setInterval(() => {
    test();
  }, duration);

  return [timer] as const;
};
