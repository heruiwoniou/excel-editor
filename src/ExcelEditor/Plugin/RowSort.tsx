import React, { FunctionComponent } from "react";
import _ from "lodash";
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
import { IState, IAction, IData } from "../Store";

const state = {};

export type pluginaction = "ROW_SORT_DEFAULT_ACTION" | "ROW_SORT_DEFAULT_ACTION_DESC"

const actions = {
  ROW_SORT_DEFAULT_ACTION: "ROW_SORT_DEFAULT_ACTION",
  ROW_SORT_DEFAULT_ACTION_DESC: "ROW_SORT_DEFAULT_ACTION_DESC"
};

const reducer = (
  state: IState,
  {
    payload: {
      pluginAction,
      selection: [startRowIndex, startCellIndex, endRowIndex, endCellIndex]
    }
  }: IAction
) => {
  let d = {
    ...state.data
  };

  let arr: Array<Array<IData>> = [];
  let colStart = startCellIndex + 1;
  let colEnd = endCellIndex + 1;
  let rowStart = startRowIndex + 1;
  let rowEnd = endRowIndex + 1;

  // sort
  for (let row = rowStart; row <= rowEnd; row++) {
    let rowarr = [];
    for (let col = colStart; col <= colEnd; col++) {
      let value = d[`${col}:${row}`];
      value && rowarr.push(value);
    }
    rowarr = _.sortBy(rowarr, ['value']);
    if (pluginAction === actions.ROW_SORT_DEFAULT_ACTION_DESC) {
      rowarr.reverse();
    }
    arr.push(rowarr);
  }

  // save
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let col = colStart; col <= colEnd; col++) {
      let value = arr[row - rowStart][col - colStart];
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

const getDisable = ({ isInputMode, selection }: IPluginProps) => {
  return isInputMode || selection![0] === -1;
};

const Component: FunctionComponent<IPluginProps> = props => {
  const isDisable = getDisable(props);
  return (
    <ToolbarCellContainer>
      <ToolbarCellContainerHeader>行</ToolbarCellContainerHeader>
      <ToolbarCell
        disable={isDisable}
        onClick={props.action(PLUGIN_TYPE.ROW_SORT, actions.ROW_SORT_DEFAULT_ACTION)}
      >
        <IconsContainer size={[16, 16]}>
          <IconsImage src={pluginSortAsc} />
        </IconsContainer>
        升序排序
      </ToolbarCell>
      <ToolbarCell
        disable={isDisable}
        onClick={props.action(PLUGIN_TYPE.ROW_SORT, actions.ROW_SORT_DEFAULT_ACTION_DESC)}
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
  state,
  reducer,
  actions
};
