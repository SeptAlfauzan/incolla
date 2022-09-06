import { PayloadAction } from "@reduxjs/toolkit";
import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Image } from "konva/lib/shapes/Image";
import { Text } from "konva/lib/shapes/Text";
import { Transformer } from "konva/lib/shapes/Transformer";
import { Stage } from "konva/lib/Stage";
import { Font } from "../../../interfaces/font";
import { Position, Text as TextState } from "../../../interfaces/text";
import { useAppSelector } from "../../../redux/hooks";

export default class CanvasKonva {
  parentContainerId: string | null;
  stage: Stage;
  layer: Layer;
  textLayer: Text | null;
  image: HTMLImageElement | null;
  transformer: Transformer | null;
  dispatch?: (arg: any) => void;
  setPosition?: (payload: Position) => void;

  constructor(
    image: HTMLImageElement | null,
    parentContainerId: string | null
  ) {
    this.parentContainerId = parentContainerId;
    this.image = image;

    this.stage = new Konva.Stage({
      container: this.parentContainerId || "",
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.textLayer = null;
    this.transformer = null;
  }

  addImage(img: HTMLImageElement, x: number = 0, y: number = 0) {
    img.onload = () => {
      this.image = img;
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
    position: Position,
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
      position,
      draggable: true,
    });
    this.layer.add(simpleText);
    var tr = new Konva.Transformer({
      nodes: [simpleText],
      padding: 5,
      rotateEnabled: false,
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

    this.transformer = tr;
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

    simpleText.on("dragend", () => {
      const position: Position = {
        x: simpleText.position().x,
        y: simpleText.position().y,
      };
      if (this.dispatch && this.setPosition) {
        this.dispatch(this.setPosition(position));
      }
    });

    this.textLayer = simpleText;

    this.layer.on("click", (event) => {
      if (event.target === this.textLayer) return this.transformer?.show();
      return this.transformer?.hide();
    });
  }

  onTextEndMove(
    dispatch: (arg: any) => void,
    setPosition: (payload: Position) => void
  ) {
    this.dispatch = dispatch;
    this.setPosition = setPosition;
  }

  static getTextWidth(text: string, fontSize: number, fontFamily: string) {
    const txt = new Konva.Text({
      text,
      fontFamily,
      fontSize,
    });
    return txt.width();
  }

  generateImageUrl(
    name: string,
    size: {
      height: number;
      width: number;
    }
  ) {
    const stage = new Konva.Stage({
      container: document.createElement("div"),
      size,
    });
    stage.add(this.layer);
    return stage.toDataURL();
    // stage.add(imageLayer);
  }
}
