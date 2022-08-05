class Images {
  static init = (url: string) => {
    const bgImage: HTMLImageElement = new Image();
    bgImage.src = url;
    bgImage.crossOrigin = "anonymous";
    return bgImage;
  };
}

export default Images;
