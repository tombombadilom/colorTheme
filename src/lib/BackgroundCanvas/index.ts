import { FunctionComponent } from 'react';
import CanvasBackground from './CanvasBackground';
import BackgroundCanvas from './BackgroundCanvas';
// import Plasma from "./Plasma";

const Empty: FunctionComponent = () => null;

export type indexProps = {
  index: number;
  name: string;
  src: string;
  el: FunctionComponent;
}[];

export const index: indexProps = [
  {
    index: -1,
    name: 'none',
    src: 'empty',
    el: Empty,
  },
  {
    index: 0,
    name: 'colored particules',
    src: 'CanvasBackgroud',
    el: CanvasBackground,
  },
  {
    index: 1,
    name: 'background circles',
    src: 'BackgroundCanvas',
    el: BackgroundCanvas,
  },
  // {
  //   index: 2,
  //   name: "plasma",
  //   src: "Plasma",
  //   el: Plasma,
  // },
];
