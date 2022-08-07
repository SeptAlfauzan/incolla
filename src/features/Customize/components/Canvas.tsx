import { background, Box, useBoolean } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import Canvas from "./../utils/canvas";
import Images from "./../utils/image";
import DraggableText from "./DragableText";

const PLUS_CODE = 187;
const MINUS_CODE = 189;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.3;

interface Props {
  imageUrl: string;
}
const CanvasElement: React.FC<Props> = ({ imageUrl }) => {
  const font = useAppSelector((state) => state.font);
  const text = useAppSelector((state) => state.text);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const container = React.useRef<HTMLCanvasElement>(null);
  const [flag, setFlag] = useBoolean();
  const [scale, setScale] = React.useState<number>(1);

  const download = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.target instanceof HTMLAnchorElement && canvasRef.current) {
      try {
        const anchor: HTMLAnchorElement = e.target;
        const data = Canvas.toDataImage(canvasRef.current);
        Canvas.download(anchor, data);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(e.target, canvasRef.current);
  };

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

  React.useEffect(() => {
    const ctx: CanvasRenderingContext2D | undefined | null =
      canvasRef.current?.getContext("2d");
    const ctxBackground: CanvasRenderingContext2D | undefined | null =
      container.current?.getContext("2d");

    const bgImage: HTMLImageElement = Images.init(imageUrl);

    bgImage.onload = function () {
      ctx && canvasRef.current
        ? Canvas.resizeAsTarget(
            canvasRef.current,
            bgImage.width,
            bgImage.height
          )
        : null;
      ctx ? ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height) : null; //add image to canvas
      // SET CUSTOM FONT
      const myFont = new FontFace(font.value.family, `url(${font.value.url})`);
      myFont.load().then(function (customFont) {
        document.fonts.add(customFont);
        console.log("font loaded!", customFont);

        // ctx ? (ctx.font = `10px Arial`) : null;
        // ctx ? (ctx.fillStyle = "pink") : null;
        // ctx ? ctx.fillText("hallo dunia", 100, 100) : null;
      });
      ctx ? (ctx.font = `${font.value.size}px Poppins`) : null;
      ctx ? (ctx.fillStyle = "pink") : null;
      ctx
        ? ctx.fillText(
            "hallo dunia",
            text.value.x,
            text.value.y + font.value.size + 3
          )
        : null;

      Canvas.redrawForegroundCanvas(canvasRef.current, container.current);
    };
  }, [text.value, font.value.size]);

  React.useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [flag]);

  React.useEffect(() => {
    console.log(scale);
    container.current?.getContext("2d")?.scale(scale, scale);
  }, [scale]);

  return (
    <Box
      flexGrow={1}
      width={"500px"}
      borderWidth={2}
      borderColor={"black"}
      overflow={"clip"}
      order={{ base: 1, md: 2 }}
      onMouseEnter={setFlag.on}
      height={"full"}
      display={"flex"}
      position={"relative"}
      justifyContent={"center"}
      alignContent={"center"}
      onMouseLeave={setFlag.off}
    >
      {/* <canvas id="bound-target" ref={container}> */}
      <Box id="canvas-parent" position="relative">
        <DraggableText bounds="#canvas-parent" label="hallo dunia" />
        <canvas ref={canvasRef} />
      </Box>
      {/* </canvas> */}

      {/* <Box transform={`scale(${scale})`} ref={container}>
        <canvas ref={canvasRef}>adasd</canvas>
      </Box> */}
      <a href="#" onClick={download}>
        download
      </a>
    </Box>
  );
};
export default CanvasElement;
