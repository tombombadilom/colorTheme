import { useEffect, useState, FunctionComponent } from "react";
import { index } from "./index.ts"

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
}
const Canvas = ({ defaultBackground }): CanvasProps => {
  const initialValue: number = defaultBackground ? index?.find((b) => (b?.name === defaultBackground))[0]?.index : 0;
  const [background, setBackground] = useLocalStorage('background', initialValue);


  // on background change set background in localStorage
  useEffect(() => {
    setBackground(background);
  }, [background]);

  const BackgroundComponent: FunctionComponent = index[background].el;

  return (
    <BackgroundComponent
      style={{
        position: 'fixed', 
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: 'var(--background)',
        opacity: 1,
      }}
    />
  )
}
export default Canvas;