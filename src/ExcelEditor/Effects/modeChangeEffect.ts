import { useEffect, RefObject } from "react";

const useModeChangeEffect = (
  ref: RefObject<HTMLElement>,
  setInputMode: (mode: boolean) => void
) => {
  useEffect(() => {
    let el = ref.current;

    let dblClickHandler = (e: MouseEvent) => setInputMode(true);
    el && el.addEventListener("dblclick", dblClickHandler);
    return () => {
      el && el.removeEventListener("dblclick", dblClickHandler);
    };
  }, [ref, setInputMode]);

  useEffect(() => {
    let handler = (e: KeyboardEvent) => {
      let keyCode = e.keyCode;
      if (
        (keyCode >= 48 && keyCode <= 57) || // 0 - 9
        (keyCode >= 96 && keyCode <= 111) || // Small keyboard characters
        (keyCode >= 65 && keyCode <= 90) || // a - z
        (keyCode >= 186 && keyCode <= 192) || // punctuation
        (keyCode >= 186 && keyCode <= 222)    // punctuation
      ) {
        setInputMode(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [setInputMode]);
};

export default useModeChangeEffect;
