import React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setTextPosition } from "../../../redux/reducers/text/textSlice";
import CanvasKonva from "../libs/konva";
import Images from "../utils/image";

export const useKonvaCanvas = (imageUrl: string, parentId: string) => {
  const [konva, setKonva] = React.useState<CanvasKonva>();
  const dispatch = useAppDispatch();
  const image: HTMLImageElement = Images.init(imageUrl);

  React.useEffect(() => {
    const newCanvas = new CanvasKonva(image, parentId);
    newCanvas.onTextEndMove(dispatch, setTextPosition);
    setKonva(newCanvas);
  }, []);

  return [konva, setKonva] as const;
};
