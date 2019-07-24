import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDom from "react-dom";
import { throttle } from "lodash-es";
import styled from "styled-components";
import {
  PageHorizontalSize,
  PageVerticalSize,
  PerLoadCountDefault,
  RearLoadCountDefault,
  DirectionType,
  CellWidth,
  CellHeight,
  HeaderVerticalSize,
  HeaderHorizontalSize
} from "./constants";
import PlaceHolder from "./PlaceHolder";
import VirtualPagerRow from "./VirtualPagerRow";
import HorizontalHeader from "./HeaderHorizontal";
import VerticalHeader from "./HeaderVertical";
import Selection from "./Selection";

const VirtualBox: React.FC = (...rest: any) => {
  // Selection
  let [selection, setSelection] = useState<number[]>([-1, -1, -1, -1]);

  // Vertical parameters
  const verticalHeaderRef = useRef<HTMLDivElement>(null);
  const [verticalScrollCache, setVerticalScrollCache] = useState<number>(0);
  const [pageVerticalIndex, updatePageVerticalIndex] = useState<number>(0);
  const [coefficientVertical, updateCoefficientVertical] = useState<number>(1);
  const [perLoadVerticalCount, updatePerLoadVerticalCount] = useState<number>(
    PerLoadCountDefault * coefficientVertical
  );
  const [rearLoadVerticalCount, updateRearLoadVerticalCount] = useState<number>(
    RearLoadCountDefault * coefficientVertical
  );

  const updatePageVerticalDataHander = useCallback(
    (pageIndex: number, cache: number) =>
      ReactDom.unstable_batchedUpdates(() => {
        setVerticalScrollCache(cache);
        updatePageVerticalIndex(pageIndex);
      }),
    []
  );
  const updateLoadVerticalCount = useCallback((n: number) => {
    updateCoefficientVertical(n);
    updatePerLoadVerticalCount(PerLoadCountDefault * n);
    updateRearLoadVerticalCount(RearLoadCountDefault * n);
  }, []);

  // Horizontal parameters
  const horizontalHeaderRef = useRef<HTMLDivElement>(null);
  const [horizontalScrollCache, setHorizontalScrollCache] = useState<number>(0);
  const [pageHorizontalIndex, updatePageHorizontalIndex] = useState<number>(0);
  const [coefficientHorizontal, updateCoefficientHorizontal] = useState<number>(
    1
  );
  const [perLoadHorizontalCount, updatePerLoadHorizontalCount] = useState<
    number
  >(PerLoadCountDefault * coefficientHorizontal);
  const [rearLoadHorizontalCount, updateRearLoadHorizontalCount] = useState<
    number
  >(RearLoadCountDefault * coefficientHorizontal);

  const updatePageHorizontalDataHander = useCallback(
    (pageIndex: number, cache: number) =>
      ReactDom.unstable_batchedUpdates(() => {
        setHorizontalScrollCache(cache);
        updatePageHorizontalIndex(pageIndex);
      }),
    []
  );
  const updateLoadHorizontalCount = useCallback((n: number) => {
    updateCoefficientHorizontal(n);
    updatePerLoadHorizontalCount(PerLoadCountDefault * n);
    updateRearLoadHorizontalCount(RearLoadCountDefault * n);
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  const [startRowIndex, startCellIndex, endRowIndex, endCellIndex] = selection;

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
        if (verticalHeaderRef.current) {
          verticalHeaderRef.current.scrollTop = scrollTop;
        }
        currentPageVerticalIndex = Math.floor(scrollTop / PageVerticalSize);
        if (currentPageVerticalIndex !== pageVerticalIndex) {
          container.removeEventListener("scroll", handler);
          updatePageVerticalDataHander(currentPageVerticalIndex, scrollTop);
        }

        // Horizontal
        scrollLeft = container.scrollLeft;
        if (horizontalHeaderRef.current) {
          horizontalHeaderRef.current.scrollLeft = scrollLeft;
        }
        currentPageHorizontalIndex = Math.floor(
          scrollLeft / PageHorizontalSize
        );
        if (currentPageHorizontalIndex !== pageHorizontalIndex) {
          updatePageHorizontalDataHander(
            currentPageHorizontalIndex,
            scrollLeft
          );
        }
      }
    };

    el && el.addEventListener("scroll", handler);

    return () => {
      el && el.removeEventListener("scroll", handler);
    };
  }, [
    verticalScrollCache,
    horizontalScrollCache,
    pageHorizontalIndex,
    pageVerticalIndex,
    updatePageHorizontalDataHander,
    updatePageVerticalDataHander
  ]);

  useEffect(() => {
    let el = ref.current;
    let sRowIndex: number;
    let sCellIndex: number;
    let eRowIndex: number;
    let eCellIndex: number;
    let cacheOnselectstart: any;

    let mouseDownHandler = (e: MouseEvent) => {
      cacheOnselectstart = document.onselectstart;
      document.onselectstart = () => false;
      sCellIndex = Math.floor((e.clientX - HeaderVerticalSize) / CellWidth);
      sRowIndex = Math.floor(
        (e.clientY - HeaderHorizontalSize) / CellHeight
      );
      setSelection([sRowIndex, sCellIndex, sRowIndex, sCellIndex]);
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };
    let mouseUpHandler = (e: MouseEvent) => {
      document.onselectstart = cacheOnselectstart;
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
    let mouseMoveHandler = (e: MouseEvent) => {
      eCellIndex = Math.floor((e.clientX - HeaderVerticalSize) / CellWidth);
      eRowIndex = Math.floor(
        (e.clientY - HeaderHorizontalSize) / CellHeight
      );
      setSelection([sRowIndex, sCellIndex, eRowIndex, eCellIndex]);
    };

    el && el.addEventListener("mousedown", mouseDownHandler);
    return () => {
      el && el.removeEventListener("mousedown", mouseDownHandler);
    };
  });

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
  }, [updateLoadHorizontalCount, updateLoadVerticalCount]);

  const VirtualPagerRowProps = {
    pageHorizontalIndex,
    perLoadHorizontalCount,
    rearLoadHorizontalCount
  };

  const VerticalHeaderProps = {
    headerRef: verticalHeaderRef,
    pageVerticalIndex,
    perLoadVerticalCount,
    rearLoadVerticalCount
  };

  const HorizontalHeaderProps = {
    headerRef: horizontalHeaderRef,
    pageHorizontalIndex,
    perLoadHorizontalCount,
    rearLoadHorizontalCount
  };

  return (
    <TableContainer>
      <HorizontalHeader {...HorizontalHeaderProps} />
      <ContentContainer>
        <VerticalHeader {...VerticalHeaderProps} />
        <VirtualContainer ref={ref} {...rest}>
          <PlaceHolder
            type={DirectionType.Virtual}
            size={
              pageVerticalIndex - perLoadVerticalCount > 0
                ? (pageVerticalIndex - perLoadVerticalCount) * PageVerticalSize
                : 0
            }
          />
          <div
            style={{
              width:
                (pageHorizontalIndex + rearLoadHorizontalCount + 1) *
                PageHorizontalSize
            }}
          >
            {new Array(perLoadVerticalCount).fill(null).map((value, index) => {
              let count = perLoadVerticalCount - index;
              return (
                pageVerticalIndex - count >= 0 && (
                  <VirtualPagerRow
                    key={`perload-${pageVerticalIndex - count}`}
                    data-key={`perload-${pageVerticalIndex - count}`}
                    pageVerticalIndex={pageVerticalIndex - count}
                    {...VirtualPagerRowProps}
                  />
                )
              );
            })}
            <VirtualPagerRow
              key={`current-${pageVerticalIndex}`}
              data-key={`current-${pageVerticalIndex}`}
              pageVerticalIndex={pageVerticalIndex}
              {...VirtualPagerRowProps}
            />
            {new Array(rearLoadVerticalCount).fill(null).map((value, index) => {
              let count = index + 1;
              return (
                <VirtualPagerRow
                  key={`rearload-${pageVerticalIndex + count}`}
                  data-key={`rearload-${pageVerticalIndex + count}`}
                  pageVerticalIndex={pageVerticalIndex + count}
                  {...VirtualPagerRowProps}
                />
              );
            })}
          </div>
          <Selection
            startRowIndex={startRowIndex}
            endRowIndex={endRowIndex}
            startCellIndex={startCellIndex}
            endCellIndex={endCellIndex}
          />
        </VirtualContainer>
      </ContentContainer>
    </TableContainer>
  );
};
const TableContainer: any = styled.div`
  height: 100vh;
  width: 100vw;
`;

const VirtualContainer: any = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  position: relative;
`;

const ContentContainer: any = styled.div`
  width: 100%;
  height: calc(100% - ${HeaderHorizontalSize}px);
  display: flex;
`;

export default VirtualBox;
