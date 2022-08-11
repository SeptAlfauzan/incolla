export interface Position {
  x: number;
  y: number;
}
export interface Text {
  position: Position;
  color: string;
  align: "center" | "left" | "right";
  width: number;
}
