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
};

export default useModeChangeEffect;
