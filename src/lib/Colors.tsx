import React, { useState, type FC, useEffect, type ChangeEvent } from "react";
import { HslaColorPicker } from "react-colorful";
import {
	type CalculatedColor,
	type HSLA,
	calculateHarmoniousColors,
	createDynamicStyle,
	guessColorCategory,
} from "./ColorsTools";

import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

type Props = {
	color: CalculatedColor;
	index: number;
	handleNewColor: (color: HSLA) => void;
};

/**
 * Renders a color picker component with the ability to customize and save colors.
 *
 * @param {Props} color - The color object to be rendered.
 * @param {number} index - The index of the color in the list.
 * @param {Function} handleNewColor - The function to handle saving the new color.
 * @return {JSX.Element} The color picker component.
 */
const PickColor: FC<Props> = ({
	color,
	index,
	handleNewColor,
}: Props): JSX.Element => {
	const [show, toggleShow] = useState(false);
	const [hue, setHue] = useState<number>(color.h);
	const [saturation, setSaturation] = useState<number>(color.s);
	const [lightness, setLightness] = useState<number>(color.l);
	const [alpha, setAlpha] = useState<number>(color.a);
	const [hslaColor, setHslaColor] = useState<string>(
		`hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
	);
	useEffect(() => {
		const className = `dynamic-bg-${index}`;
		createDynamicStyle(className, hslaColor);
	}, [hslaColor, index]);

	/**
	 * Updates the color state with the values from the provided CalculatedColor object.
	 *
	 * @param {CalculatedColor} newColor - the new color values to update the state with
	 * @return {void}
	 */
	const NewColor = (newColor: CalculatedColor): void => {
		setHue(newColor.h);
		setSaturation(newColor.s);
		setLightness(newColor.l);
		setAlpha(newColor.a);
		// Assume the value is the hsla string representation of the color
		setHslaColor(newColor.value);
	};

	useEffect(() => {
		setHslaColor(`hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`);
	}, [hue, saturation, lightness, alpha]);

	const handleHueChange = (e: ChangeEvent<HTMLInputElement>) =>
		setHue(Number.parseInt(e.currentTarget.value, 10));
	const handleSaturationChange = (e: ChangeEvent<HTMLInputElement>) =>
		setSaturation(Number.parseInt(e.currentTarget.value, 10));
	const handleLightnessChange = (e: ChangeEvent<HTMLInputElement>) =>
		setLightness(Number.parseInt(e.currentTarget.value, 10));
	const handleAlphaChange = (e: ChangeEvent<HTMLInputElement>) =>
		setAlpha(Number.parseFloat(e.currentTarget.value));

	return (
		<Card
			key={"c" + index}
			className={`border-0 backdrop-filter backdrop-blur-lg grow hover:grow-2 dynamic-bg-${index} bg-opacity-heavy`}
		>
			<CardTitle>{color.colorName || color.name}</CardTitle>
			<CardContent className="min-h-[20dvh]">
				{show && (
					<div>
						<HslaColorPicker
							color={{
								h: hue,
								s: saturation,
								l: lightness,
								a: alpha,
							}}
							onChange={(newColor) =>
								NewColor({
									h: newColor.h,
									s: newColor.s,
									l: newColor.l,
									a: newColor.a,
									name: color.name,
									colorName:
										color.colorName ||
										guessColorCategory(
											`hsla(${newColor.h}, ${newColor.s}%, ${newColor.l}%, ${newColor.a})`,
										),
									value: `hsla(${newColor.h}, ${newColor.s}%, ${newColor.l}%, ${newColor.a})`, // Assuming value is the hsla string
								})
							}
						/>
						<Input
							placeholder="hsla(240, 100%, 50%, 1)"
							defaultValue={hslaColor}
							onChange={(e) => setHslaColor(e.currentTarget.value)}
						/>
						<Input
							placeholder="Hue"
							type="range"
							id="hue"
							name="hue"
							min="0"
							max="360"
							value={hue}
							onChange={handleHueChange}
						/>
						<Input
							placeholder="Saturation"
							type="range"
							id="saturation"
							name="saturation"
							min="0"
							max="100"
							value={saturation}
							onChange={handleSaturationChange}
						/>
						<Input
							placeholder="Lightness"
							type="range"
							id="lightness"
							name="lightness"
							min="0"
							max="100"
							value={lightness}
							onChange={handleLightnessChange}
						/>
						<Input
							placeholder="Alpha"
							type="range"
							id="alpha"
							name="alpha"
							min="0"
							max={1}
							step={0.01}
							value={alpha}
							onChange={handleAlphaChange}
						/>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex gap-2 justify-end">
				<Button className="flex-1" onClick={() => toggleShow(!show)}>
					{!show ? "Set Color" : "Hide Color Picker"}
				</Button>
				<Button
					className="flex-1"
					onClick={() =>
						handleNewColor({
							name: color.name,
							h: hue,
							s: saturation,
							l: lightness,
							a: alpha,
							value: hslaColor,
						})
					}
				>
					Save
				</Button>
				<Button className="flex-1">Reset</Button>
			</CardFooter>
		</Card>
	);
};
type HandleNewColor = (color: HSLA) => void;

/**
 * Renders a component for managing and displaying a color picker and theme settings.
 *
 * @param {HandleNewColor} color - The color object to be added or updated
 * @return {void}
 */
const Colors: FC = (): JSX.Element => {
	const [colors, updateColors] = useState([
		{
			name: "primary",
			colorName: "blue",
			h: 240,
			s: 100,
			l: 50,
			a: 1,
			value: "hsla(240,100%,50%,1)",
		},
		{
			name: "secondary",
			colorName: "purple",
			h: 300,
			s: 100,
			l: 50,
			a: 1,
			value: "hsla(300,100%,50%,1)",
		},
		{
			name: "tertiary",
			colorName: "pink",
			h: 350,
			s: 100,
			l: 50,
			a: 1,
			value: "hsla(350,100%,50%,1)",
		},
	]);

	const [newTheme, setNewTheme] = useState<CalculatedColor[]>([]);
	useEffect(() => {
		console.log("newTheme", newTheme);
	}, [newTheme]);

	/**
	 * Handles a new color by updating the colors array and triggering color-related updates.
	 *
	 * @param {HandleNewColor} color - the new color to be handled
	 * @return {void}
	 */
	const handleNewColor: HandleNewColor = (color) => {
		const { name, h, s, l, a, value } = color;
		const newColorsArray: CalculatedColor[] = colors.map(
			({ name: colorName, h, s, l, a, value }) => ({
				name,
				colorName,
				h,
				s,
				l,
				a,
				value,
			}),
		);

		const colorName = guessColorCategory(value);
		const colorIndex = newColorsArray.findIndex((color) => color.name === name);

		if (colorIndex !== -1) {
			newColorsArray[colorIndex] = {
				...newColorsArray[colorIndex],
				colorName,
				h,
				s,
				l,
				a,
				value: `hsla(${h}, ${s}%, ${l}%, ${a})`,
			};
		} else {
			newColorsArray.push({
				name,
				colorName,
				h,
				s,
				l,
				a,
				value: `hsla(${h}, ${s}%, ${l}%, ${a})`,
			});
		}

		updateColors(newColorsArray);

		if (name === "primary") {
			const harmoniousColors = calculateHarmoniousColors(h, s, l, a, name);
			console.log("harmoniousColors", harmoniousColors);
			if (harmoniousColors) setNewTheme(harmoniousColors);
		}
	};

	return (
		<>
			{colors.map((color, index) =>
				PickColor({ color, index, handleNewColor }),
			)}
		</>
	);
};

export default Colors;
