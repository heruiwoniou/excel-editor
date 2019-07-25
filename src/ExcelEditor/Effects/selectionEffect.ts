import { useEffect, RefObject } from "react";
import {
  HeaderVerticalSize,
  HeaderHorizontalSize,
  CellWidth,
  CellHeight
} from "../Constants";
import { calcStyle } from "../Common";
import { addClass, removeClass, forEach } from "../../common/utils";

const useSelectionEffect = (
  ref: RefObject<HTMLElement>,
  selectionRef: RefObject<HTMLElement>,
  setSelection: (selection: number[]) => void,
  deleteSelection: () => void
) => {
  useEffect(() => {
    let el = ref.current;
    let selectionEl = selectionRef.current;
    let sRowIndex: number;
    let sCellIndex: number;
    let eRowIndex: number;
    let eCellIndex: number;
    let isHReverse: boolean;
    let isVReverse: boolean;
    let cacheOnselectstart: any;
    let checkInputMode = () => !!document.querySelector(".edit-mode-input");

    let mouseDownHandler = (e: MouseEvent) => {
      let scrollTop = el ? el.scrollTop : 0;
      let scrollLeft = el ? el.scrollLeft : 0;
      cacheOnselectstart = document.onselectstart;
      document.onselectstart = () => false;

      sCellIndex = eCellIndex = Math.floor(
        (scrollLeft + e.clientX - HeaderVerticalSize) / CellWidth
      );
      sRowIndex = eRowIndex = Math.floor(
        (scrollTop + e.clientY - HeaderHorizontalSize) / CellHeight
      );
      setSelection([sRowIndex, sCellIndex, eRowIndex, eCellIndex]);
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };
    let mouseUpHandler = (e: MouseEvent) => {
      if (checkInputMode()) return;
      document.onselectstart = cacheOnselectstart;
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("mousemove", mouseMoveHandler);
      setSelection([
        isVReverse ? eRowIndex : sRowIndex,
        isHReverse ? eCellIndex : sCellIndex,
        isVReverse ? sRowIndex : eRowIndex,
        isHReverse ? sCellIndex : eCellIndex
      ]);
    };
    let mouseMoveHandler = (e: MouseEvent) => {
      if (checkInputMode()) return;
      let scrollTop = el ? el.scrollTop : 0;
      let scrollLeft = el ? el.scrollLeft : 0;
      eCellIndex = Math.floor(
        (scrollLeft + e.clientX - HeaderVerticalSize) / CellWidth
      );
      eRowIndex = Math.floor(
        (scrollTop + e.clientY - HeaderHorizontalSize) / CellHeight
      );
      isHReverse = eCellIndex < sCellIndex;
      isVReverse = eRowIndex < sRowIndex;

      let { top, left, width, height } = calcStyle({
        startRowIndex: isVReverse ? eRowIndex : sRowIndex,
        endRowIndex: isVReverse ? sRowIndex : eRowIndex,
        startCellIndex: isHReverse ? eCellIndex : sCellIndex,
        endCellIndex: isHReverse ? sCellIndex : eCellIndex
      });

      if (selectionEl) {
        selectionEl.style.top = `${top}px`;
        selectionEl.style.left = `${left}px`;
        selectionEl.style.width = `${width}px`;
        selectionEl.style.height = `${height}px`;
      }

      forEach(document.querySelectorAll(".selection"), (el: HTMLElement) =>
        removeClass(el, "selection")
      );

      let corner = document.querySelector(".header-corner");
      if (sCellIndex === 0 || eCellIndex === 0) {
        addClass(corner, "selection");
      } else {
        removeClass(corner, "selection");
      }

      forEach(
        document.querySelectorAll(
          new Array(Math.abs(eCellIndex - sCellIndex))
            .fill(null)
            .reduce(
              (p, c, i) =>
                (p += `, .horizontal-header-cell-${(isHReverse
                  ? eCellIndex
                  : sCellIndex) +
                  i +
                  2}`),
              `.horizontal-header-cell-${(isHReverse
                ? eCellIndex
                : sCellIndex) + 1}`
            )
        ),
        (el: HTMLElement) => addClass(el, "selection")
      );

      forEach(
        document.querySelectorAll(
          new Array(Math.abs(eRowIndex - sRowIndex))
            .fill(null)
            .reduce(
              (p, c, i) =>
                (p += `, .vertical-header-cell-${(isVReverse
                  ? eRowIndex
                  : sRowIndex) +
                  i +
                  2}`),
              `.vertical-header-cell-${(isVReverse ? eRowIndex : sRowIndex) +
                1}`
            )
        ),
        (el: HTMLElement) => addClass(el, "selection")
      );
    };

    el && el.addEventListener("mousedown", mouseDownHandler);
    return () => {
      el && el.removeEventListener("mousedown", mouseDownHandler);
    };
  }, [ref, selectionRef, setSelection]);

  useEffect(() => {
    let handler = (e: KeyboardEvent) => {
      let el = e.target as HTMLElement;
      if (e.keyCode === 8 && el.nodeName !== "INPUT") {
				deleteSelection();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [deleteSelection]);
};

export default useSelectionEffect;
