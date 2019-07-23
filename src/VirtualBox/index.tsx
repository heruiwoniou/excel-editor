import React, { useState, useRef, useEffect, useCallback } from "react";
import { debounce } from "lodash-es";
import styled from "styled-components";
import {
  PageHorizontalSize,
  PageVerticalSize,
  PerLoadCountDefault,
  RearLoadCountDefault,
  PlaceHolderType
} from "./constants";
import PlaceHolder from "./PlaceHolder";
import VirtualPagerRow from "./VirtualPagerRow";
import HorizontalHeader from "./HeaderHorizontal";
import VerticalHeader from "./HeaderVertical";

const VirtualBox: React.FC = (...rest: any) => {
  // Vertical parameters
  const [maxVerticalIndex, setMaxVerticalIndex] = useState<number>(0);
  const [pageVerticalIndex, updatePageVerticalIndex] = useState<number>(0);
  const [coefficientVertical, updateCoefficientVertical] = useState<number>(1);
  const [perLoadVerticalCount, updatePerLoadVerticalCount] = useState<number>(
    PerLoadCountDefault * coefficientVertical
  );
  const [rearLoadVerticalCount, updateRearLoadVerticalCount] = useState<number>(
    RearLoadCountDefault * coefficientVertical
  );

  const updatePageVerticalIndexHander = useCallback(
    (pageIndex: number) => {
      if (maxVerticalIndex < pageIndex) {
        setMaxVerticalIndex(pageIndex);
      }
      updatePageVerticalIndex(pageIndex);
    },
    [maxVerticalIndex]
  );
  const updateLoadVerticalCount = useCallback((n: number) => {
    updateCoefficientVertical(n);
    updatePerLoadVerticalCount(PerLoadCountDefault * n);
    updateRearLoadVerticalCount(RearLoadCountDefault * n);
  }, []);

  // Horizontal parameters
  const [maxHorizontalIndex, setMaxHorizontalIndex] = useState<number>(0);
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

  const updatePageHorizontalIndexHander = useCallback(
    (pageIndex: number) => {
      if (maxHorizontalIndex < pageIndex) {
        setMaxHorizontalIndex(pageIndex);
      }
      updatePageHorizontalIndex(pageIndex);
    },
    [maxHorizontalIndex]
  );
  const updateLoadHorizontalCount = useCallback((n: number) => {
    updateCoefficientHorizontal(n);
    updatePerLoadHorizontalCount(PerLoadCountDefault * n);
    updateRearLoadHorizontalCount(RearLoadCountDefault * n);
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let el = ref.current;

    let handler = debounce((e: Event) => {
      let container: HTMLDivElement;
      let scrollTop: number;
      let currentPageHorizontalIndex: number;
      let scrollLeft: number;
      let currentPageVerticalIndex: number;

      if (e.target) {
        container = e.target as HTMLDivElement;

        //Vertical
        scrollTop = container.scrollTop;
        currentPageVerticalIndex = Math.floor(scrollTop / PageVerticalSize);
        if (currentPageVerticalIndex !== pageVerticalIndex) {
          container.removeEventListener("scroll", handler);
          updatePageVerticalIndexHander(currentPageVerticalIndex);
        }

        // Horizontal
        scrollLeft = container.scrollLeft;
        currentPageHorizontalIndex = Math.floor(
          scrollLeft / PageHorizontalSize
        );
        if (currentPageHorizontalIndex !== pageHorizontalIndex) {
          container.removeEventListener("scroll", handler);
          updatePageHorizontalIndexHander(currentPageHorizontalIndex);
        }
      }
    }, 200);
    el && el.addEventListener("scroll", handler);

    return () => {
      el && el.removeEventListener("scroll", handler);
    };
  }, [
    pageHorizontalIndex,
    pageVerticalIndex,
    updatePageHorizontalIndexHander,
    updatePageVerticalIndexHander
  ]);

  useEffect(() => {
    let handler = debounce(() => {
      let el = ref.current;
      if (el) {
        // Horizontal
        let offsetWidth = el.offsetWidth;
        updateLoadVerticalCount(Math.ceil(offsetWidth / PageVerticalSize));

        // Vertical
        let offsetHeight = el.offsetHeight;
        updateLoadHorizontalCount(Math.ceil(offsetHeight / PageHorizontalSize));
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
    pageVerticalIndex,
    perLoadVerticalCount,
    rearLoadVerticalCount
  };

  const HorizontalHeaderProps = VirtualPagerRowProps;

  return (
    <TableContainer>
      <HorizontalHeader {...VirtualPagerRowProps} />
      <ContentContainer>
        <VerticalHeader {...VerticalHeaderProps} />
        <VirtualContainer ref={ref} {...rest}>
          <PlaceHolder
            type={PlaceHolderType.Virtual}
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
              key={`${pageVerticalIndex}`}
              data-key={`${pageVerticalIndex}`}
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
          <MaxPoint
            style={{
              top:
                (maxVerticalIndex + rearLoadVerticalCount) * PageVerticalSize,
              left:
                (maxHorizontalIndex + rearLoadHorizontalCount) *
                PageHorizontalSize
            }}
          />
        </VirtualContainer>
      </ContentContainer>
    </TableContainer>
  );
};
const TableContainer: any = styled.div`
  height: 100vh;
  width: 100vw;
  table {
    table-layout: fixed;
    border-collapse: collapse;
  }
`;

const VirtualContainer: any = styled.div`
  height: 100vh;
  width: 100vw;
  background: #efefef;
  overflow: scroll;
  position: relative;
`;

const ContentContainer: any = styled.div``;

const MaxPoint: any = styled.div`
  height: 1px;
  width: 1px;
  position: absolute;
  visibility: hidden;
`;

export default VirtualBox;
