import React from "react";

export class Carousell {
  static cycle = (
    length: number,
    active: number,
    action: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (active == length - 1) {
      return action(0);
    }
    action((prev) => prev + 1);
  };
}
