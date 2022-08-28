import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Image } from "konva/lib/shapes/Image";
import { Text } from "konva/lib/shapes/Text";
import { Stage } from "konva/lib/Stage";
import { useAppSelector } from "../../../redux/hooks";

export default class CanvasKonva {
  text: string;
  image: string;
  parentContainerId: string;
  stage: Stage;
  layer: Layer;
  textLayer: Text | null;

  constructor(text: string, image: string, parentContainerId: string) {
    this.text = text;
    this.image = image;
    this.parentContainerId = parentContainerId;

    this.stage = new Konva.Stage({
      container: this.parentContainerId,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.layer = new Konva.Layer();
    this.textLayer = null;
    this.stage.add(this.layer);
  }

  addImage(img: HTMLImageElement, x: number = 0, y: number = 0) {
    img.onload = () => {
      const imageLayer = new Konva.Image({
        x: 100,
        y: 100,
        image: img,
        width: 100,
        height: 100,
      });
      this.layer.add(imageLayer);
    };
  }

  addText(
    text: string,
    fontFamily: string,
    fontSize: number,
    fill: string,
    MIN_WIDTH: number,
    align: string,
    onDragEvent?: (...arg: any) => void
  ) {
    const simpleText = new Konva.Text({
      x: 0,
      y: 0,
      text,
      fontFamily,
      fontSize,
      width: MIN_WIDTH,
      fill,
      align,
      draggable: true,
    });
    this.layer.add(simpleText);
    var tr = new Konva.Transformer({
      nodes: [simpleText],
      padding: 5,
      // enable only side anchors
      enabledAnchors: ["middle-left", "middle-right"],
      // limit transformer size
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < MIN_WIDTH) {
          return oldBox;
        }
        return newBox;
      },
    });
    this.layer.add(tr);
    simpleText.on("transform", () => {
      // with enabled anchors we can only change scaleX
      // so we don't need to reset height
      // just width
      simpleText.setAttrs({
        width: Math.max(MIN_WIDTH, MIN_WIDTH),
        scaleX: 1,
        scaleY: 1,
      });
    });

    this.textLayer = simpleText;
  }

  static getTextWidth(text: string, fontSize: number, fontFamily: string) {
    const txt = new Konva.Text({
      text,
      fontFamily,
      fontSize,
    });
    return txt.width();
  }
}
