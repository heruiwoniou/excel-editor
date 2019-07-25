import React, { FunctionComponent } from "react";
import pluginSortAsc from "../../assets/plugin-sort-asc.svg";
import pluginSortDesc from "../../assets/plugin-sort-desc.svg";
import {
  ToolbarCell,
  IconsContainer,
  IconsImage,
  ToolbarCellContainer,
  ToolbarCellContainerHeader,
  IPluginProps
} from "../Component/Toolbar";
import { PLUGIN_TYPE } from "../Plugin";
import { IState, IAction } from "../../store";

const getDisable = ({ isInputMode }: IPluginProps) => {
  return isInputMode;
};

const DisposeHandler = (
  state: IState,
  {
    payload: {
      selection: [startRowIndex, startCellIndex, endRowIndex, endCellIndex],
      extra: { desc }
    }
  }: IAction
) => {
  let d = {
    ...state.data
  };

  let arr: number[][] = [];
  let colStart = startCellIndex + 1;
  let colEnd = endCellIndex + 1;
  let rowStart = startRowIndex + 1;
  let rowEnd = endRowIndex + 1;

  // sort
  for (let col = colStart; col <= colEnd; col++) {
    let colarr = [];
    for (let row = rowStart; row <= rowEnd; row++) {
      let value = d[`${col}:${row}`];
      value && colarr.push(isNaN(Number(value)) ? value : Number(value));
    }
    colarr.sort();
    if (desc) {
      colarr.reverse();
    }
    arr.push(colarr);
  }

  // save
  for (let col = colStart; col <= colEnd; col++) {
    for (let row = rowStart; row <= rowEnd; row++) {
      let value = arr[col - colStart][row - rowStart];
      if (value) {
        d[`${col}:${row}`] = value;
      } else {
        delete d[`${col}:${row}`];
      }
    }
  }

  return {
    ...state,
    data: d
  };
};

const Component: FunctionComponent<IPluginProps> = props => {
  const isDisable = getDisable(props);
  return (
    <ToolbarCellContainer>
      <ToolbarCellContainerHeader>列</ToolbarCellContainerHeader>
      <ToolbarCell
        disable={isDisable}
        onClick={props.action(PLUGIN_TYPE.COL_SORT, { desc: false })}
      >
        <IconsContainer size={[16, 16]}>
          <IconsImage src={pluginSortAsc} />
        </IconsContainer>
        升序排序
      </ToolbarCell>
      <ToolbarCell
        disable={isDisable}
        onClick={props.action(PLUGIN_TYPE.COL_SORT, { desc: true })}
      >
        <IconsContainer size={[16, 16]}>
          <IconsImage src={pluginSortDesc} />
        </IconsContainer>
        降序排序
      </ToolbarCell>
    </ToolbarCellContainer>
  );
};

export default {
  Component,
  DisposeHandler
};
