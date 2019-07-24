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
  HeaderHorizontalSize
} from "./constants";
import PlaceHolder from "./PlaceHolder";
import VirtualPagerRow from "./VirtualPagerRow";
import HorizontalHeader from "./HeaderHorizontal";
import VerticalHeader from "./HeaderVertical";

const VirtualBox: React.FC = (...rest: any) => {
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

    console.log("init", verticalScrollCache);
    console.log(
      verticalScrollCache,
      horizontalScrollCache,
      pageHorizontalIndex,
      pageVerticalIndex
    );

    let handler = throttle((e: Event) => {
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
          console.log(
            "update",
            currentPageVerticalIndex,
            pageVerticalIndex,
            verticalScrollCache,
            scrollTop
          );
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
    }, 200);

    el && el.addEventListener("scroll", handler);

    return () => {
      if (el) {
        el.removeEventListener("scroll", handler);
      }
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

const MaxPoint: any = styled.div`
  height: 1px;
  width: 1px;
  position: absolute;
  visibility: hidden;
`;

export default VirtualBox;
