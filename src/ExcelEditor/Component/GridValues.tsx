import React, { FunctionComponent } from "react";
import _ from "lodash";
import styled from "styled-components";
import {
  SheetRowsCount,
  SheetCellsCount,
  CellHeight,
  CellWidth
} from "../Constants";
import useStore from "../../store";

interface IGridValuesProps {
  pageRowIndex: number;
  pageCellIndex: number;
}

const GridValues: FunctionComponent<IGridValuesProps> = ({
  pageRowIndex,
  pageCellIndex
}) => {
  const [state] = useStore();
  const hasValueRowArray = _.chain(state.data)
    .keys()
    .map(value => ~~value.split(/:/)[1])
    .flatten()
    .value();
  const hasValueCellArray = _.chain(state.data)
    .keys()
    .map(value => ~~value.split(/:/)[0])
    .flatten()
    .value();
  return (
    <GridValuesContainer>
      {new Array(SheetRowsCount).fill(null).map((value, rowIndex) => {
        let rowNumber = pageRowIndex * SheetRowsCount + rowIndex + 1;
        return (
          <GridRow key={`grid-value-row-${rowNumber}`}>
            {hasValueRowArray.includes(rowNumber) &&
              new Array(SheetCellsCount).fill(null).map((value, cellIndex) => {
                let cellNumber =
                  pageCellIndex * SheetCellsCount + cellIndex + 1;
                return (
                  hasValueCellArray.includes(cellNumber) && (
                    <GridCell
                      key={`${cellNumber}:${rowNumber}`}
                      data-key={`${cellNumber}:${rowNumber}`}
                      style={{
                        left: `${cellIndex * CellWidth}px`
                      }}
                    >
                      {state.data[`${cellNumber}:${rowNumber}`]}
                    </GridCell>
                  )
                );
              })}
          </GridRow>
        );
      })}
    </GridValuesContainer>
  );
};

export default GridValues;

const GridValuesContainer: any = styled.div`
  height: 100%;
  width: 100%;
`;

const GridRow: any = styled.div`
  position: relative;
  height: ${CellHeight}px;
`;
const GridCell: any = styled.div`
  position: absolute;
  top: 0;
  width: ${CellWidth - 3}px;
  height: ${CellHeight - 1}px;
  line-height: ${CellHeight - 1}px;
  margin: 0 2px 0 1px;
  box-sizing: border-box;
  font-size: 12px;
  overflow: hidden;
`;
