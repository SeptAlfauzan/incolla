import { background, Box, position, useBoolean } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCanvas } from "../../../redux/reducers/canvas/canvasSlice";
import { getLongestNameWidth } from "../utils/csv";
import Canvas from "./../utils/canvas";
import Images from "./../utils/image";
import DraggableText from "./DraggableText";

const PLUS_CODE = 187;
const MINUS_CODE = 189;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.3;
let lastRequest: null | NodeJS.Timeout = null;

interface Props {
  imageUrl: string;
}
const CanvasElement: React.FC<Props> = ({ imageUrl }) => {
  const font = useAppSelector((state) => state.font);
  const text = useAppSelector((state) => state.text);
  const csv = useAppSelector((state) => state.csv);
  const selectedIndex = useAppSelector((state) => state.selectedIndex);
  const dispatch = useAppDispatch();

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const container = React.useRef<HTMLDivElement>(null);
  const [flag, setFlag] = useBoolean();
  const [scale, setScale] = React.useState<number>(1);
  const [trigger, setTrigger] = React.useState<boolean>();

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.ctrlKey && (e.keyCode === 187 || e.keyCode === 189) && !flag) {
      e.preventDefault();
    }
    if (e.ctrlKey && (e.keyCode === 187 || e.keyCode === 189) && flag) {
      //  container.current?.style.scale
      e.preventDefault();
      if (e.keyCode == PLUS_CODE && scale < MAX_ZOOM)
        setScale((prev) => (prev += 0.1));
      if (e.keyCode == MINUS_CODE && scale > MIN_ZOOM)
        setScale((prev) => (prev -= 0.1));
    }
  };

  const setCanvasToImgwithDelay = async (delay: number) => {
    if (lastRequest) {
      clearTimeout(lastRequest);
    }
    lastRequest = setTimeout(async () => {
      dispatch(setCanvas([]));
      const canvasImages = await Promise.all(
        csv.value.map(async (name) => {
          try {
            const canvas = document.createElement("canvas");
            return await Canvas.generateCanvasImageUrl(
              canvas,
              Images.init(imageUrl),
              font.value,
              text.value,
              name
            );
          } catch (error) {
            throw error;
          }
        })
      );
      dispatch(setCanvas(canvasImages));
    }, delay);
  };

  React.useEffect(() => {
    const ctx: CanvasRenderingContext2D | undefined | null =
      canvasRef.current?.getContext("2d");

    const bgImage: HTMLImageElement = Images.init(imageUrl);

    bgImage.onload = function () {
      canvasRef.current &&
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); //clear previous canvas

      canvasRef.current &&
        Canvas.resizeAsTarget(canvasRef.current, bgImage.width, bgImage.height);
      ctx ? ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height) : null; //add image to canvas
      // SET CUSTOM FONT

      ctx ? (ctx.font = `${font.value.size}px Poppins`) : null;
      ctx ? (ctx.fillStyle = text.value.color) : null;
      ctx
        ? ctx.fillText(
            csv.value[selectedIndex.value],
            text.value.position.x,
            text.value.position.y + font.value.size
          )
        : null;
    };
    setTrigger(!trigger);
  }, [text.value, font.value.size, selectedIndex.value]);

  React.useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [flag]);

  React.useMemo(() => {
    setCanvasToImgwithDelay(1000);
  }, [trigger]);

  return (
    <Box
      flexGrow={1}
      width={"500px"}
      borderWidth={2}
      borderColor={"black"}
      overflow={"scroll"}
      order={{ base: 1, md: 2 }}
      onMouseEnter={setFlag.on}
      height={"full"}
      position={"relative"}
      // display={"flex"}
      // justifyContent={"center"}
      // alignContent={"center"}
      onMouseLeave={setFlag.off}
    >
      <Box
        transform={"scale(1)"}
        ref={container}
        id="canvas-parent"
        position="relative"
        // display={"flex"}
        width={"content-fit"}
        height={"content-fit"}
        borderWidth={"10px"}
      >
        <DraggableText
          bounds="#canvas-parent"
          longestName={getLongestNameWidth(csv.value)}
          label={csv.value[selectedIndex.value]}
        />
        <canvas ref={canvasRef} />
      </Box>
    </Box>
  );
};
export default CanvasElement;
