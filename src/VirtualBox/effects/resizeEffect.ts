import { useEffect, RefObject } from "react";
import { throttle } from "lodash";
import { PageHorizontalSize, PageVerticalSize } from "../constants";

const useResizeEffect = (
  ref: RefObject<HTMLElement>,
  updateLoadHorizontalCount: (n: number) => void,
  updateLoadVerticalCount: (n: number) => void
) => {
  useEffect(() => {
    let handler = throttle(() => {
      let el = ref.current;
      if (el) {
        // Horizontal
        let offsetWidth = el.offsetWidth;
        if (offsetWidth < PageHorizontalSize) {
          updateLoadVerticalCount(1);
        } else {
          updateLoadVerticalCount(Math.floor(offsetWidth / PageHorizontalSize));
        }

        // Vertical
        let offsetHeight = el.offsetHeight;
        if (offsetHeight < PageVerticalSize) {
          updateLoadHorizontalCount(Math.ceil(offsetHeight / PageVerticalSize));
        }
      }
    });
    handler();
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [ref, updateLoadHorizontalCount, updateLoadVerticalCount]);
};

export default useResizeEffect;
