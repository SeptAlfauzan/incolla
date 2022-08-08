import Canvas from "../utils/canvas";

export const download = (
  e: React.MouseEvent<HTMLAnchorElement>,
  canvasImageData: string
) => {
  if (!(e.target instanceof HTMLAnchorElement) && canvasImageData == "")
    return null;

  try {
    const anchor: HTMLAnchorElement = e.target as HTMLAnchorElement;
    anchor.href = canvasImageData;
    anchor.download = "test.png";
  } catch (error) {
    console.log(error);
  }
};
