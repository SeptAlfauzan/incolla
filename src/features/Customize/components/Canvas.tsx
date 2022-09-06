import {
  background,
  Box,
  Button,
  Image,
  position,
  useBoolean,
} from "@chakra-ui/react";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Transformer } from "konva/lib/shapes/Transformer";
import { Stage } from "konva/lib/Stage";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCanvas } from "../../../redux/reducers/canvas/canvasSlice";
import { setKonvaObj } from "../../../redux/reducers/konva/konvaSlice";
import { setPreviewImage } from "../../../redux/reducers/previewImage/previewImageSlice";
import {
  setTextPosition,
  setWidth,
} from "../../../redux/reducers/text/textSlice";
import { useKonvaCanvas } from "../hooks/useKonvaCanvas";
import CanvasKonva from "../libs/konva";
import { getLongestNameWidth } from "../utils/csv";
import Canvas from "./../utils/canvas";
import Images from "./../utils/image";

const PLUS_CODE = 187;
const MINUS_CODE = 189;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.3;

const SCALE_MULTIPLIER = 0.9;

let lastRequest: null | NodeJS.Timeout = null;

interface Props {
  imageUrl: string;
}
const CanvasElement: React.FC<Props> = ({ imageUrl }) => {
  const font = useAppSelector((state) => state.font);
  const text = useAppSelector((state) => state.text);
  const csv = useAppSelector((state) => state.csv);
  const selectedIndex = useAppSelector((state) => state.selectedIndex);
  const konvaRedux = useAppSelector((state) => state.konva);

  const dispatch = useAppDispatch();
  const [flag, setFlag] = useBoolean();
  const [disableEdit, setDisableEdit] = useBoolean(false);
  const [scale, setScale] = React.useState<number>(0.5);
  const [trigger, setTrigger] = React.useState<boolean>();
  const width = useAppSelector((state) => state.text.value.width);

  const [konva, setKonva] = useKonvaCanvas(imageUrl, "#canvas-parent");
  const [tempKonva, setTempKonva] = useKonvaCanvas(imageUrl, "#temp"); //used for temporary canvas to for 'download all feature'

  React.useEffect(() => {
    const text = getLongestNameWidth(csv.value);
    dispatch(
      setWidth(CanvasKonva.getTextWidth(text, font.value.size, "Calibry"))
    );
  }, [font.value]);

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

  const setCanvasToImgwithDelay = async (delay: number) => {
    if (lastRequest) {
      clearTimeout(lastRequest);
    }
    lastRequest = setTimeout(async () => {
      dispatch(setCanvas([]));
      // setDisableEdit.on;
      const canvasImages = await Promise.all(
        csv.value.map(async (name: string, index: number) => {
          if (index !== selectedIndex.value) return "";
          try {
            tempKonva?.textLayer?.setText(name);
            return tempKonva?.generateImageUrl() || "";
          } catch (error) {
            throw error;
          }
        })
      );
      dispatch(setCanvas(canvasImages));
      // setDisableEdit.off;
    }, delay);
  };

  React.useEffect(() => {
    if (!konva) return;
    if (!tempKonva) return;

    const bgImage: HTMLImageElement = Images.init(imageUrl);
    bgImage.onload = function () {
      const imageLayer = new Konva.Image({
        x: 0,
        y: 0,
        image: bgImage,
        width: bgImage.width,
        height: bgImage.height,
      });

      tempKonva.stage.setSize({ width: bgImage.width, height: bgImage.height });
      tempKonva.layer.clear();
      tempKonva.layer.add(imageLayer.clone());

      tempKonva.addText(
        csv.value[selectedIndex.value],
        "Calibry",
        font.value.size,
        text.value.color,
        width,
        text.value.align,
        text.value.position
      );

      konva.stage.setSize({ width: bgImage.width, height: bgImage.height });
      konva.layer.clear();
      konva.layer.add(imageLayer);
      konva.addText(
        csv.value[selectedIndex.value],
        "Calibry",
        font.value.size,
        text.value.color,
        width,
        text.value.align,
        text.value.position
      );
      // konva.stage.value;
      // const clone: Stage = konva.stage.clone();

      dispatch(setKonvaObj(tempKonva));
    };
    setTrigger(!trigger);
  }, [text.value, selectedIndex.value, konva]);

  React.useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [flag]);

  React.useMemo(() => {
    setCanvasToImgwithDelay(1000);
  }, [trigger]);

  const handleScaleUp = () => {
    setScale((prev) => prev / SCALE_MULTIPLIER);
  };
  const handleScaleDown = () => {
    setScale((prev) => prev * SCALE_MULTIPLIER);
  };

  return (
    <Box
      flexGrow={1}
      width={"500px"}
      // borderWidth={2}
      // borderColor={"black"}
      overflow={"scroll"}
      order={{ base: 1, md: 2 }}
      onMouseEnter={setFlag.on}
      height={"full"}
      position={"relative"}
      onMouseLeave={setFlag.off}
    >
      <Box
        position={"fixed"}
        zIndex={200}
        display={"flex"}
        gap={"5px"}
        margin={"10px"}
        flexDirection={"column"}
      >
        <Button
          backgroundColor={"white"}
          border={"1px"}
          borderColor={"blackAlpha.300"}
          onClick={handleScaleUp}
        >
          +
        </Button>
        <Button
          backgroundColor={"white"}
          border={"1px"}
          borderColor={"blackAlpha.300"}
          onClick={handleScaleDown}
        >
          -
        </Button>
      </Box>
      {/* THIS USE FOR TEMPORARY IMAGE DATA, IN ORDER TO GENERATE THOSE IMAGE URLS BASED ON CSV VALUES */}
      <Box
        transform="auto"
        id="temp"
        width={"fit-content"}
        height={"fit-content"}
        position={"relative"}
        borderWidth={"1px"}
        borderColor={"green.400"}
        display={"none"}
        zIndex={100}
      />
      {/* THIS IS MAIN CANVAS CONTAINER, FOR EDITING PREVIEW'S PURPOSE */}
      <Box
        transform="auto"
        scale={scale}
        width={"fit-content"}
        height={"fit-content"}
        position={"relative"}
        id="canvas-parent"
        borderWidth={"1px"}
        borderColor={"blue.400"}
        zIndex={100}
      />
    </Box>
  );
};
export default CanvasElement;
