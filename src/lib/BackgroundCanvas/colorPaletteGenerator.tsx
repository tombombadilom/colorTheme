import { generatePalette } from 'utility-color-palette-generator';

const Palette = (mode: string, color: string, maxColors: number = 5) => {
  const startingColor: string = color;
  const numColors: number = maxColors;
  const palette = generatePalette(startingColor, numColors);
  console.log('palette', palette);
  return <p style={{ color: color }}>{mode}</p>;
};
export default Palette;
