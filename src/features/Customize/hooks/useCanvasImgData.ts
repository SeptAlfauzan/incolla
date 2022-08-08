import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCanvas } from "../../../redux/reducers/canvas/canvasSlice";

interface Config {
  fontSize: number;
  fontFamily: string;
  position: {
    x: number;
    y: number;
  };
  context2D: CanvasRenderingContext2D | null | undefined;
}
export const useCanvasImgData = (
  canvas: HTMLCanvasElement | null,
  triggerConfig: Config
) => {
  if (!canvas) return [""];
  const dispatch = useAppDispatch();
  const _canvas = useAppSelector((state) => state.canvas);

  React.useEffect(() => {
    if (!canvas) return;
    const canvasImage = canvas.toDataURL("image/png");
    dispatch(setCanvas(canvasImage));
  }, [canvas?.getContext("2d"), triggerConfig]);
  return [_canvas];
};
