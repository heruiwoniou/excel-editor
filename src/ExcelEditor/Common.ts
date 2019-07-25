import { CellWidth, CellHeight } from "./Constants";
export interface ISelectionProps {
  startRowIndex: number;
  endRowIndex: number;
  startCellIndex: number;
  endCellIndex: number;
}
export const calcStyle = ({
  startRowIndex,
  endRowIndex,
  startCellIndex,
  endCellIndex
}: ISelectionProps) => ({
  display: startRowIndex === -1 ? "none" : "block",
  top: startRowIndex * CellHeight,
  left: startCellIndex * CellWidth,
  width: (Math.abs(endCellIndex - startCellIndex) + 1) * CellWidth,
  height: (Math.abs(endRowIndex - startRowIndex) + 1) * CellHeight
});
