import React, { FunctionComponent } from "react";
import styled from "styled-components";

import {
  PageHorizontalSize,
  PageVerticalSize,
  CellWidth,
  CellHeight,
  SheetRowsCount,
  SheetCellsCount
} from "../Constants";
import GridHorizontalLine from "./GridHorizontalLine";
import GridVirtualLine from "./GridVirtualLine";
import GridValues from "./GridValues";

interface IVirtualPagerCell {
  pageHorizontalIndex: number;
  pageVerticalIndex: number;
}

const VirtualPagerCell: FunctionComponent<IVirtualPagerCell> = ({
  pageVerticalIndex,
  pageHorizontalIndex
}) => {
  return (
    <StyledVirtualPagerCell>
      <GridHorizontalLine
        sheetRowIndex={pageVerticalIndex}
        sheetCellIndex={pageHorizontalIndex}
        rows={SheetRowsCount}
        size={CellHeight}
      />
      <GridVirtualLine
        sheetRowIndex={pageVerticalIndex}
        sheetCellIndex={pageHorizontalIndex}
        cells={SheetCellsCount}
        size={CellWidth}
      />
      <GridValues
        pageRowIndex={pageVerticalIndex}
        pageCellIndex={pageHorizontalIndex}
      />
    </StyledVirtualPagerCell>
  );
};

export default VirtualPagerCell;

const StyledVirtualPagerCell: any = styled.div<IVirtualPagerCell>`
  float: left;
  height: ${PageVerticalSize}px;
  width: ${PageHorizontalSize}px;
  position: relative;
`;
