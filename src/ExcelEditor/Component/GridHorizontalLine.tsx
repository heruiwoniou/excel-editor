import React, { FunctionComponent } from "react";
import styled from "styled-components";
interface IGridHorizontalLineProps {
  sheetRowIndex: number;
  sheetCellIndex: number;
  rows: number;
  size: number;
}
const GridHorizontalLine: FunctionComponent<IGridHorizontalLineProps> = ({
  rows,
  size,
  sheetRowIndex,
  sheetCellIndex
}) => {
  return (
    <GridHorizontalLineContainer>
      {new Array(rows).fill(null).map((value, index) => (
        <HorizontalLineItem
          size={size}
          key={`horizontal-line-${sheetRowIndex}-${sheetCellIndex}-${index}`}
        />
      ))}
    </GridHorizontalLineContainer>
  );
};

export default GridHorizontalLine;

const GridHorizontalLineContainer: any = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;
const HorizontalLineItem: any = styled.div`
  width: 100%;
  height: ${(props: { size: number }) => props.size}px;
  border-bottom: 1px solid #d4d4d4;
`;
