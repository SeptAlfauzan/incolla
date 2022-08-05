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
}
export default Canvas;
