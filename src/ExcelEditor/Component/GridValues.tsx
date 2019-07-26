import React, { FunctionComponent, useCallback } from "react";
import styled from "styled-components";
import cls from "classnames";
import {
  SheetRowsCount,
  SheetCellsCount,
  CellHeight,
  CellWidth
} from "../Constants";
import useStore, { DataType, IFunctionDataValue } from "../Store";

interface IGridValuesProps {
  pageRowIndex: number;
  pageCellIndex: number;
}

const GridValues: FunctionComponent<IGridValuesProps> = ({
  pageRowIndex,
  pageCellIndex
}) => {
  const [state] = useStore();
  const { data: storeData } = state;
  const getFunctionValue = useCallback(
    ({ type, params }: IFunctionDataValue) => {
      try {
        switch (type) {
          case "sum":
            let total = 0;
            for (let areaIndex = 0; areaIndex < params.length; areaIndex++) {
              let [start, end] = params[areaIndex];
              if (start === null || end === null) {
                return "Error";
              }
              let [scindex, srindex] = start;
              let [ecindex, erindex] = end;
              if (scindex > ecindex) {
                scindex ^= ecindex;
                ecindex ^= scindex;
                scindex ^= ecindex;
              }
              if (srindex > erindex) {
                srindex ^= erindex;
                erindex ^= srindex;
                srindex ^= erindex;
              }

              for (let rowindex = srindex; rowindex <= erindex; rowindex++) {
                for (
                  let cellindex = scindex;
                  cellindex <= ecindex;
                  cellindex++
                ) {
                  let cellData = storeData[`${cellindex}:${rowindex}`];
                  if (cellData) {
                    if (cellData.type === DataType.Number) {
                      total += Number(cellData.value);
                    }
                  }
                }
              }
            }
            return total;
          default:
            return "Error";
        }
      } catch {
        return "Error";
      }
    },
    [storeData]
  );
  return (
    <GridValuesContainer>
      {new Array(SheetRowsCount).fill(null).map((value, rowIndex) => {
        let rowNumber = pageRowIndex * SheetRowsCount + rowIndex + 1;
        return (
          <GridRow key={`grid-value-row-${rowNumber}`}>
            {new Array(SheetCellsCount).fill(null).map((value, cellIndex) => {
              let cellNumber = pageCellIndex * SheetCellsCount + cellIndex + 1;
              let data = state.data[`${cellNumber}:${rowNumber}`];
              return (
                data && (
                  <GridCell
                    className={cls(
                      data.type === DataType.Function ? `function-data` : ""
                    )}
                    key={`${cellNumber}:${rowNumber}`}
                    id={`value-cell-${cellNumber}-${rowNumber}`}
                    style={{
                      left: `${cellIndex * CellWidth}px`
                    }}
                  >
                    {data.type === DataType.Function
                      ? getFunctionValue(data.value as IFunctionDataValue)
                      : data.value}
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
  width: ${CellWidth - 1}px;
  height: ${CellHeight}px;
  line-height: ${CellHeight}px;
  padding: 0 2px 0 1px;
  box-sizing: border-box;
  font-size: 12px;
  overflow: hidden;
  &.function-data {
    background: #c7d6ce;
  }
`;
