import { background, Box, useBoolean } from "@chakra-ui/react";
import React from "react";
import Canvas from "./../utils/canvas";
import Images from "./../utils/image";

const PLUS_CODE = 187;
const MINUS_CODE = 189;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.3;

interface Props {
  imageUrl: string;
}
const CanvasElement: React.FC<Props> = ({ imageUrl }) => {
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
      ctx ? ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height) : null;
      ctx ? (ctx.fillStyle = "#ff0000") : null;
      ctx ? ctx.fillRect(0, 0, bgImage.width - 100, 75) : null;
      Canvas.redrawForegroundCanvas(canvasRef.current, container.current);
    };
  }, [canvasRef.current]);

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
      width={"100px"}
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
      <canvas ref={container}>
        <canvas ref={canvasRef} />
      </canvas>
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
