import { Select } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCanvas } from "../../../redux/reducers/canvas/canvasSlice";
import { setFont } from "../../../redux/reducers/font/fontSlice";
import GoogleFontAPI from "../../../services/googleFontAPI";
import Font from "../../../utils/font";

interface WebfontFamily {
  category?: string | undefined;
  kind: string;
  family: string;
  subsets: string[];
  variants: string[];
  version: string;
  lastModified: string;
  files: { [variant: string]: string };
}
interface WebfontList {
  kind: string;
  items: WebfontFamily[];
}

const FontSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const font = useAppSelector((state) => state.font);
  const canvas = useAppSelector((state) => state.canvas);
  const [fonts, setFonts] = React.useState<WebfontList>();

  const handleSelected = (family: string, url: string, size: number) =>
    dispatch(setFont({ family, url, size }));

  React.useEffect(() => {
    const initFont = async () => {
      setFonts(await (await GoogleFontAPI.get()).data);
    };
    initFont();
  }, []);

  React.useEffect(() => {
    console.log("test");
    Font.setFont(font.value.family, font.value.url);
  }, [font]);

  return (
    <Select
      onChange={(e) => {
        const family =
          e.target.options[e.target.options.selectedIndex].getAttribute(
            "data-family"
          );
        handleSelected(family ? family : "", e.target.value, font.value.size);
      }}
      // variant="filled"
      placeholder="Select Font"
      fontSize={12}
    >
      {fonts?.items.map((font: WebfontFamily, i: number) => (
        <option value={font.files.regular} data-family={font.family} key={i}>
          {font.family}
        </option>
      ))}
    </Select>
  );
};

export default FontSelector;
