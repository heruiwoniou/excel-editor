import { useEffect } from "react";
import { PageVerticalSize, PageHorizontalSize } from "../Constants";

const useVirtualScrollEffect = (
  ref: React.RefObject<HTMLElement>,
  verticalHeaderRef: React.RefObject<HTMLElement>,
  horizontalHeaderRef: React.RefObject<HTMLElement>,
  verticalScrollCache: number,
  horizontalScrollCache: number,
  pageHorizontalIndex: number,
  pageVerticalIndex: number,
  updatePageHorizontalDataHander: (pageIndex: number, cacheX: number, cacheY: number) => void,
  updatePageVerticalDataHander: (pageIndex: number, cacheX: number, cacheY: number) => void
) => {
  useEffect(() => {
    let el = ref.current;
    let vel = verticalHeaderRef.current;
    let hel = horizontalHeaderRef.current;
    if (el) {
      el.scrollTop = verticalScrollCache;
      el.scrollLeft = horizontalScrollCache;
    }

    if (vel) {
      vel.scrollTop = verticalScrollCache;
      vel.scrollLeft = horizontalScrollCache;
    }

    if (hel) {
      hel.scrollTop = verticalScrollCache;
      hel.scrollLeft = horizontalScrollCache;
    }

    let handler = (e: Event) => {
      let container: HTMLDivElement;
      let scrollTop: number;
      let currentPageHorizontalIndex: number;
      let scrollLeft: number;
      let currentPageVerticalIndex: number;

      if (e.target) {
        container = e.target as HTMLDivElement;

        //Vertical
        scrollTop = container.scrollTop;
        scrollLeft = container.scrollLeft;

        if (verticalHeaderRef.current) {
          verticalHeaderRef.current.scrollTop = scrollTop;
        }
        currentPageVerticalIndex = Math.floor(scrollTop / PageVerticalSize);
        if (currentPageVerticalIndex !== pageVerticalIndex) {
          updatePageVerticalDataHander(
            currentPageVerticalIndex,
            scrollLeft,
            scrollTop
          );
        }

        // Horizontal
        if (horizontalHeaderRef.current) {
          horizontalHeaderRef.current.scrollLeft = scrollLeft;
        }
        currentPageHorizontalIndex = Math.floor(
          scrollLeft / PageHorizontalSize
        );
        if (currentPageHorizontalIndex !== pageHorizontalIndex) {
          updatePageHorizontalDataHander(
            currentPageHorizontalIndex,
            scrollLeft,
            scrollTop
          );
        }
      }
    };

    el && el.addEventListener("scroll", handler);

    return () => {
      el && el.removeEventListener("scroll", handler);
    };
  }, [
    ref,
    horizontalHeaderRef,
    verticalHeaderRef,
    verticalScrollCache,
    horizontalScrollCache,
    pageHorizontalIndex,
    pageVerticalIndex,
    updatePageHorizontalDataHander,
    updatePageVerticalDataHander
  ]);
};

export default useVirtualScrollEffect;
