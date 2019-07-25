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
import { IState, IAction, IData } from "../../store";

const getDisable = ({ isInputMode }: IPluginProps) => {
  return isInputMode;
};

const state = {};

export type pluginaction = "COL_SORT_DEFAULT_ACTION" | "COL_SORT_DEFAULT_ACTION_DESC"

const action = {
  COL_SORT_DEFAULT_ACTION: "COL_SORT_DEFAULT_ACTION",
  COL_SORT_DEFAULT_ACTION_DESC: "COL_SORT_DEFAULT_ACTION_DESC"
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
  for (let col = colStart; col <= colEnd; col++) {
    let colarr = [];
    for (let row = rowStart; row <= rowEnd; row++) {
      let value = d[`${col}:${row}`];
      value && colarr.push(value);
    }
    colarr = _.sortBy(colarr, ["value"]);
    if (pluginAction === action.COL_SORT_DEFAULT_ACTION_DESC) {
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
        onClick={props.action(
          PLUGIN_TYPE.COL_SORT,
          action.COL_SORT_DEFAULT_ACTION
        )}
      >
        <IconsContainer size={[16, 16]}>
          <IconsImage src={pluginSortAsc} />
        </IconsContainer>
        升序排序
      </ToolbarCell>
      <ToolbarCell
        disable={isDisable}
        onClick={props.action(
          PLUGIN_TYPE.COL_SORT,
          action.COL_SORT_DEFAULT_ACTION_DESC
        )}
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
  action
};
