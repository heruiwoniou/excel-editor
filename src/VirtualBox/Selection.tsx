import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { CellWidth, CellHeight } from "./constants";

interface ISelectionProps {
  startRowIndex: number;
  endRowIndex: number;
  startCellIndex: number;
  endCellIndex: number;
}

const Selection: FunctionComponent<ISelectionProps> = ({
  startRowIndex,
  endRowIndex,
  startCellIndex,
  endCellIndex
}) => {
  const isShowTopArea = !!(endCellIndex - startCellIndex);
  const isShowBottomArea = !!(endRowIndex - startRowIndex);
  const style = {
    top: startRowIndex * CellHeight,
    left: startCellIndex * CellWidth,
    width: (endCellIndex - startCellIndex + 1) * CellWidth,
    height: (endRowIndex - startRowIndex + 1) * CellHeight
  };
  return (
    <SelectionContainer style={style}>
      <SelectionBorder>
        <SelectionInnerBorder />
      </SelectionBorder>
      <SelectionAreaContainer>
        <SelectionInputArea />
        {isShowTopArea && <SelectionAreaTop />}
        {isShowBottomArea && <SelectionAreaBottom />}
      </SelectionAreaContainer>
    </SelectionContainer>
  );
};

export default Selection;

const SelectionBorder: any = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -1px;
  bottom: -1px;
  border: 2px solid #217346;
  z-index: 1;
  pointer-events: none;
`;
const SelectionInnerBorder: any = styled.div`
  border: 1px solid #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`;

const commonStyle = css`
  position: absolute;
  right: 0;
  background: #141414;
  opacity: 0.24;
`;

const SelectionAreaContainer: any = styled.div``;
const SelectionInputArea: any = styled.div`
  height: ${CellHeight}px;
  width: ${CellWidth}px;
`;
const SelectionAreaTop: any = styled.div`
  ${commonStyle}
  top: 0;
  left: ${CellWidth - 1}px;
  height: ${CellHeight - 1}px;
`;
const SelectionAreaBottom: any = styled.div`
  ${commonStyle}
  top: ${CellHeight - 1}px;
  left: 0;
  bottom: 0;
`;

const SelectionContainer: any = styled.div`
  position: absolute;
  pointer-events: none;
`;
