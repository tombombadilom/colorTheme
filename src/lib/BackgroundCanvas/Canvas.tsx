import { useEffect, useState, FunctionComponent, CSSProperties } from "react";
import { index } from "./index.ts";

function useLocalStorage(key: string, initialValue: number) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
type CanvasProps = {
  defaultBackground?: string;
};
const Canvas: FunctionComponent<CanvasProps> = ({ defaultBackground }) => {
  const initialValue: number = defaultBackground
    ? index?.find((b) => b?.name === defaultBackground)?.index ?? 0
    : 0;
  const [background, setBackground] = useLocalStorage(
    "background",
    initialValue,
  );

  // on background change set background in localStorage
  useEffect(() => {
    setBackground(background);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [background]);

  type BackgroundComponent = FunctionComponent<{
    style?:
      | CSSProperties
      | {
          position: "fixed";
          top: 0;
          left: 0;
          width: "100%";
          height: "100%";
          zIndex: 0;
          backgroundColor: "var(--background)";
          opacity: 1;
        };
  }>;
  const BackgroundComponent: BackgroundComponent = index[background]?.el;
  const style: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    backgroundColor: "hsla(var(--background), 0.25)",
    opacity: 1,
  };
  return background === -1 ? null : <BackgroundComponent style={style} />;
};
export default Canvas;
