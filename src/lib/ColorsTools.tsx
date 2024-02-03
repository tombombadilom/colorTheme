import chroma from 'chroma-js';

export type CalculatedColor = {
  h: number;
  s: number;
  l: number;
  a: number;
  name: string; // Add the missing properties
  colorName: string; // Add the missing properties
  value: string; // Add the missing properties
};
export type HSLA = {
  name: string;
  h: number;
  s: number;
  l: number;
  a: number;
  // value should be a string formatted as hsla(h, s%, l%, a)
  value: string;
};

const adjustHue = (hue: number, adjustment: number): number => (hue + adjustment) % 360;

const calculateForegroundColor = (l: number, name: string): CalculatedColor => {
  const newLightness = l > 50 ? l - 40 : l + 40;
  const colorValue = `hsl(0, 0%, ${newLightness}%)`; // Generate HSL string
  const colorName = guessColorCategory(colorValue); // Use guessColorCategory to determine the color name

  return {
    h: 0,
    s: 0,
    l: newLightness,
    a: 1,
    name: name,
    colorName: colorName,
    value: colorValue,
  };
};

const calculateCardColor = (color: CalculatedColor, name: string): CalculatedColor => {
  // Adjust saturation and lightness within their respective bounds
  const newSaturation = Math.max(color.s - 10, 0);
  const newLightness = Math.min(color.l + 10, 100);

  // Construct the value string in the 'hsla(var(h,s,l,a))' format
  const newValue = `hsla(${color.h}, ${newSaturation}%, ${newLightness}%, ${color.a})`;

  // Use guessColorCategory to determine the color name
  const colorName = guessColorCategory(newValue);

  return {
    h: color.h,
    s: newSaturation,
    l: newLightness,
    a: color.a,
    value: newValue,
    name: name, // Use the provided name parameter
    colorName: colorName, // Use the calculated colorName
  };
};
type HSLAColor = [number, number, number, number];

function guessColorCategory(value: string): string {
  const hsl = chroma(value).hsl(); // Returns [hue, saturation, lightness]
  const alpha = chroma(value).alpha(); // Extracts the alpha value
  const hsla: HSLAColor = [...hsl, alpha]; // Constructs the HSLAColor type with the alpha

  // Now, you can use hsla as an HSLAColor type
  const hue: number = hsla[0];
  const saturation: number = hsla[1];
  const lightness: number = hsla[2];

  // Check for black, white, and grays first (little to no saturation)
  if (lightness <= 0.1) return 'black';
  if (lightness >= 0.9) return 'white';
  if (saturation <= 0.1 && lightness > 0.1 && lightness < 0.9) return 'gray';

  // Then check for other colors
  if (hue !== null && hue !== undefined) {
    // When hue is not undefined or null
    if (hue >= 0 && hue < 30) return 'red';
    if (hue >= 30 && hue < 90) return 'yellow';
    if (hue >= 90 && hue < 150) return 'green';
    if (hue >= 150 && hue < 270) return 'blue';
    if (hue >= 270 && hue < 330) return 'purple';
    if ((hue >= 330 && hue <= 360) || hue < 10) return 'pink'; // Pink hues
  }

  return 'gray'; // Default to gray if hue is undefined or null
}
type CalculateHarmoniousColors = (
  h: number,
  s: number,
  l: number,
  a: number,
  name: string,
) => CalculatedColor[];

const calculateHarmoniousColors: CalculateHarmoniousColors = (h, s, l, a, name) => {
  const colorString = `hsl(${h}, ${s}%, ${l}%)`;
  const colorName = guessColorCategory(colorString); // Now it is called correctly
  const primary: CalculatedColor = {
    h,
    s,
    l,
    a,
    name,
    colorName: colorName,
    value: `hsla(${h}, ${s}%, ${l}%, ${a})`,
  };

  const secondary: CalculatedColor = {
    h: adjustHue(h, 30),
    s,
    l,
    a,
    name: 'secondary',
    colorName: guessColorCategory(`hsla(${adjustHue(h, 30)}, ${s}%, ${l}%, ${a})`),
    value: `hsla(${adjustHue(h, 30)}, ${s}%, ${l}%, ${a})`,
  };

  const tertiary: CalculatedColor = {
    h: adjustHue(h, 60),
    s,
    l,
    a,
    name: 'tertiary',
    colorName: guessColorCategory(`hsla(${adjustHue(h, 60)}, ${s}%, ${l}%, ${a})`),
    value: `hsla(${adjustHue(h, 60)}, ${s}%, ${l}%, ${a})`,
  };

  const accent: CalculatedColor = {
    h,
    s: Math.min(s + 10, 100),
    l: Math.min(l + 10, 100),
    a,
    name: 'accent',
    colorName: guessColorCategory(
      `hsla(${h}, ${Math.min(s + 10, 100)}%, ${Math.min(l + 10, 100)}%, ${a})`,
    ),
    value: `hsla(${h}, ${Math.min(s + 10, 100)}%, ${Math.min(l + 10, 100)}%, ${a})`,
  };

  const success: CalculatedColor = {
    h: adjustHue(primary.h, 120),
    s: 70,
    l: 40,
    a,
    name: 'success',
    colorName: guessColorCategory(`hsla(${adjustHue(primary.h, 120)}, 70%, 40%, ${a})`),
    value: `hsla(${adjustHue(primary.h, 120)}, 70%, 40%, ${a})`,
  };

  const error: CalculatedColor = {
    h: adjustHue(primary.h, 180),
    s: 70,
    l: 50,
    a,
    name: 'error',
    colorName: guessColorCategory(`hsla(${adjustHue(primary.h, 180)}, 70%, 50%, ${a})`),
    value: `hsla(${adjustHue(primary.h, 180)}, 70%, 50%, ${a})`,
  };

  // Assuming calculateForegroundColor and calculateCardColor return objects with the required properties
  const primaryForeground: CalculatedColor = calculateForegroundColor(
    primary.l,
    'primary-foreground',
  );
  const secondaryForeground: CalculatedColor = calculateForegroundColor(
    secondary.l,
    'secondary-foreground',
  );
  const tertiaryForeground: CalculatedColor = calculateForegroundColor(
    tertiary.l,
    'tertiary-foreground',
  );

  const cardPrimary: CalculatedColor = calculateCardColor(primary, 'primary-card');
  const cardSecondary: CalculatedColor = calculateCardColor(secondary, 'secondary-card');
  const cardTertiary: CalculatedColor = calculateCardColor(tertiary, 'tertiary-card');

  const cardPrimaryForeground: CalculatedColor = calculateForegroundColor(
    cardPrimary.l,
    'primary-card-foreground',
  );
  const cardSecondaryForeground: CalculatedColor = calculateForegroundColor(
    cardSecondary.l,
    'secondary-card-foreground',
  );
  const cardTertiaryForeground: CalculatedColor = calculateForegroundColor(
    cardTertiary.l,
    'tertiary-card-foreground',
  );

  return [
    primary,
    secondary,
    tertiary,
    accent,
    success,
    error,
    cardPrimary,
    cardSecondary,
    cardTertiary,
    cardPrimaryForeground,
    cardSecondaryForeground,
    cardTertiaryForeground,
    primaryForeground,
    secondaryForeground,
    tertiaryForeground,
  ];
};

/**
 * Creates a dynamic style and appends it to the document head.
 * @param {string} className - The class name for the dynamic style.
 * @param {HSLAColor} hslaColor - The HSLA color value for the background.
 * @returns {void}
 */
const createDynamicStyle = (className: string, hslaColor: string): void => {
  const style = document.createElement('style');
  style.innerHTML = `
    .${className} {
      background-color: ${hslaColor};
    }
  `;
  document.head.appendChild(style);
};

export {
  createDynamicStyle,
  guessColorCategory,
  adjustHue,
  calculateHarmoniousColors,
  calculateForegroundColor,
  calculateCardColor,
};
