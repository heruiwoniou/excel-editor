import { useEffect, RefObject } from "react";
import useStore from "../Store";

const useModeChangeEffect = (
  ref: RefObject<HTMLElement>,
  enableInputMode: () => void
) => {
  const [
    {
      settings: { disablekeyboardMonitoring }
    }
  ] = useStore();
  useEffect(() => {
    let el = ref.current;

    let dblClickHandler = (e: MouseEvent) => enableInputMode();
    el && el.addEventListener("dblclick", dblClickHandler);
    return () => {
      el && el.removeEventListener("dblclick", dblClickHandler);
    };
  }, [ref, enableInputMode]);

  useEffect(() => {
    let handler = (e: KeyboardEvent) => {
      let keyCode = e.keyCode;
      if (
        !disablekeyboardMonitoring &&
        ((keyCode >= 48 && keyCode <= 57) || // 0 - 9
        (keyCode >= 96 && keyCode <= 111) || // Small keyboard characters
        (keyCode >= 65 && keyCode <= 90) || // a - z
        (keyCode >= 186 && keyCode <= 192) || // punctuation
          (keyCode >= 186 && keyCode <= 222)) // punctuation
      ) {
        enableInputMode();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [enableInputMode, disablekeyboardMonitoring]);
};

export default useModeChangeEffect;
