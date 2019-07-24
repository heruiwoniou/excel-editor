import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { CellWidth, CellHeight } from "./constants";

interface ISelectionProps {
  startRowIndex: number;
  endRowIndex: number;
  startCellIndex: number;
  endCellIndex: number;
}

const Selection: FunctionComponent<ISelectionProps> = props => {
  return <SelectionContainer {...props}/>;
};

export default Selection;

const SelectionContainer: any = styled.div<ISelectionProps>`
	position: absolute;
	top: ${({ startRowIndex }) => startRowIndex * CellHeight}px;
	left: ${({ startCellIndex }) => startCellIndex * CellWidth}px;
	width: ${({ startCellIndex, endCellIndex }) => (endCellIndex - startCellIndex) * CellWidth}px;
	height: ${({ startRowIndex, endRowIndex }) => (endRowIndex - startRowIndex) * CellHeight}px;
	background: #ccc;
`;
