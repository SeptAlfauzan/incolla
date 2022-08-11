import JSZip from "jszip";
import { saveAs } from "file-saver";

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
export const downloadAll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  canvasImagesData: string[]
) => {
  if (!(e.target instanceof HTMLAnchorElement) && canvasImagesData) return null;

  try {
    const anchor: HTMLAnchorElement = e.target as HTMLAnchorElement;
    const zip = new JSZip();

    canvasImagesData.map((imageURL: string, i: number) => {
      zip.file(
        `image-${i}.png`,
        imageURL.replace(/^data:image\/(png|jpg);base64,/, ""),
        { base64: true }
      );
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "test.zip");
    });
    // anchor.href = canvasImageData;
    // anchor.download = "test.png";
  } catch (error) {
    console.log(error);
  }
};
