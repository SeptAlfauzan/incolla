class Images {
  static init = (url: string) => {
    const bgImage: HTMLImageElement = new Image();
    bgImage.src = url;
    bgImage.crossOrigin = "anonymous";
    return bgImage;
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
