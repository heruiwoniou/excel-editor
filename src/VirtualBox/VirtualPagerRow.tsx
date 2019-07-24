import React, { FunctionComponent } from "react";
import styled from "styled-components";

import {
  PageVerticalSize,
  PageHorizontalSize,
  DirectionType
} from "./constants";
import PlaceHolder from "./PlaceHolder";
import VirtualPagerCell from "./VirtualPagerCell";

interface IVirtualPagerRow {
  key?: string;
  pageVerticalIndex: number;
  pageHorizontalIndex: number;
  perLoadHorizontalCount: number;
  rearLoadHorizontalCount: number;
}

const VirtualPagerRow: FunctionComponent<IVirtualPagerRow> = ({
  pageVerticalIndex,
  pageHorizontalIndex,
  perLoadHorizontalCount,
  rearLoadHorizontalCount,
  ...rest
}) => {
  return (
    <StyledVirtualPagerRow {...rest}>
      <PlaceHolder
        type={DirectionType.Horizontal}
        size={
          pageHorizontalIndex - perLoadHorizontalCount > 0
            ? (pageHorizontalIndex - perLoadHorizontalCount) *
              PageHorizontalSize
            : 0
        }
      />
      <div>
        {new Array(perLoadHorizontalCount).fill(null).map((value, index) => {
          let count = perLoadHorizontalCount - index;
          return (
            pageHorizontalIndex - count >= 0 && (
              <VirtualPagerCell
                key={`perload-${pageHorizontalIndex - count}`}
                pageVerticalIndex={pageVerticalIndex}
                pageHorizontalIndex={pageHorizontalIndex - count}
              />
            )
          );
        })}
        <VirtualPagerCell
          key={`current-${pageHorizontalIndex}`}
          pageVerticalIndex={pageVerticalIndex}
          pageHorizontalIndex={pageHorizontalIndex}
        />
        {new Array(rearLoadHorizontalCount).fill(null).map((value, index) => {
          let count = index + 1;
          return (
            <VirtualPagerCell
              key={`rearload-${pageHorizontalIndex + count}`}
              pageVerticalIndex={pageVerticalIndex}
              pageHorizontalIndex={pageHorizontalIndex + count}
            />
          );
        })}
      </div>
    </StyledVirtualPagerRow>
  );
};

export default VirtualPagerRow;

const StyledVirtualPagerRow: any = styled.div`
  height: ${PageVerticalSize}px;
  width: 100%;
  display: flex;
`;
