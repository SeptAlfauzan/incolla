class Font {
  static setFont = (fontFamily: string, fontUrl: string) => {
    const myFont = new FontFace(fontFamily, `url(${fontUrl})`);
    myFont.load().then((font) => {
      document.fonts.add(font);
      console.log("font loaded!");
    });
  };
}
export default Font;
