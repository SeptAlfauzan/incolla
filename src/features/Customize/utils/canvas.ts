import { Font } from "../../../interfaces/font";
import { Text } from "../../../interfaces/text";
import Images from "./image";

class Canvas {
  static toDataImage = (src: HTMLCanvasElement): string =>
    src.toDataURL("image/png");
  static download = (e: HTMLAnchorElement, data: string) => {
    try {
      e.href = data;
      e.download = "test.png";
      //   e.click();
    } catch (error) {
      console.error(error);
    }
  };
  static resizeAsTarget = (
    src: HTMLCanvasElement,
    width: number,
    height: number
  ): void => {
    try {
      src.getContext("2d")?.clearRect(0, 0, src.width, src.height); //clear previous canvas
      src.width = width;
      src.height = height;
    } catch (error) {
      console.error(error);
    }
  };

  static redrawForegroundCanvas = (
    foreground: HTMLCanvasElement | null,
    background: HTMLCanvasElement | null
  ): void => {
    if (foreground && background) {
      const ctxBackground: CanvasRenderingContext2D | null =
        background.getContext("2d");
      const foreGroundImage = Images.init(foreground.toDataURL("image/png"));
      Canvas.resizeAsTarget(
        background,
        foreGroundImage.width,
        foreGroundImage.height
      );
      ctxBackground?.drawImage(
        foreGroundImage,
        0,
        0,
        foreGroundImage.width,
        foreGroundImage.height
      );
    }
  };

  static generateCanvasImageUrl = (
    canvas: HTMLCanvasElement,
    bgImage: HTMLImageElement,
    font: Font,
    text: Text,
    name: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const ctx: CanvasRenderingContext2D | undefined | null =
        canvas.getContext("2d");
      bgImage.onload = function () {
        canvas && ctx?.clearRect(0, 0, canvas.width, canvas.height); //clear previous canvas

        canvas && Canvas.resizeAsTarget(canvas, bgImage.width, bgImage.height);
        ctx
          ? ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height)
          : null; //add image to canvas
        // SET CUSTOM FONT

        ctx ? (ctx.font = `${font.size}px Poppins`) : null;
        ctx ? (ctx.fillStyle = text.color) : null;
        ctx
          ? ctx.fillText(name, text.position.x, text.position.y + font.size)
          : null;
        resolve(canvas.toDataURL("image/png"));
      };
      bgImage.onerror = function (error) {
        reject(error);
      };
    });
  };
}
export default Canvas;
