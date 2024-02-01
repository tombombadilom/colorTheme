import { FunctionComponent } from "react";
import CanvasBackground from "./CanvasBackground";
import BackgroundCanvas from "./BackgroundCanvas";

export type indexProps = {
  index: number;
  name: string;
  src: string;
  el: FunctionComponent;
}[];

export const index: indexProps = [
  { index: 0, name: 'colored particules', src: 'CanvasBackgroud', el: CanvasBackground },
  { index: 1, name: 'background circles', src: 'BackgroundCanvas', el: BackgroundCanvas },
];
