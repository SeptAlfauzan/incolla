class Images {
  static init = (url: string) => {
    const bgImage: HTMLImageElement = new Image();
    bgImage.src = url;
    bgImage.crossOrigin = "anonymous";
    return bgImage;
  };
  static getSize = async (url: string) => {
    const bgImage: HTMLImageElement = new Image();
    return await new Promise((resolve, reject) => {
      try {
        bgImage.onload = function () {
          return resolve({
            height: bgImage.height,
            width: bgImage.width,
          });
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  static blobToDataUrl = (blob: Blob) => {
    return new Promise((r) => {
      let fr = new FileReader();
      fr.onload = r;
      fr.readAsDataURL(blob);
    }).then((e: any) => e.target.result);
  };
}

export default Images;
