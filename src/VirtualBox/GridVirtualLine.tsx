import React, { FunctionComponent } from "react";
import styled from "styled-components";
interface IGridVirtualLineProps {
  sheetRowIndex: number;
  sheetCellIndex: number;
  cells: number;
  size: number;
}
const GridVirtualLine: FunctionComponent<IGridVirtualLineProps> = ({
  cells,
	size,
	sheetRowIndex,
	sheetCellIndex
}) => {
  return (
    <GridVirtualLineContainer>
      {new Array(cells).fill(null).map((value, index) => (
        <VirtualLineItem size={size} key={`virtual-line-${sheetRowIndex}-${sheetCellIndex}-${index}`} />
      ))}
    </GridVirtualLineContainer>
  );
};

export default GridVirtualLine;

const GridVirtualLineContainer: any = styled.div`
  position: absolute;
  top: 0;
  left: 0;
	right: 0;
	bottom: 0;
  display: flex;
  flex-direction: row;
`;
const VirtualLineItem: any = styled.div`
  height: 100%;
  width: ${(props: { size: number }) => props.size}px;
  border-right: 1px solid #d4d4d4;
`;
