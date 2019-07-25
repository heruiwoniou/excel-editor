import React, { FunctionComponent } from "react";

import pluginFunction from "../../assets/plugin-function.svg";
import {
  ToolbarCell,
  IconsContainer,
  IconsImage,
  IPluginProps
} from "../Component/Toolbar";
import { IState, IAction } from "../../store";
import { PLUGIN_TYPE } from ".";
import Modal from "../Component/Modal";
import useStore from "../../store";

const getDisable = ({ isInputMode }: IPluginProps) => {
  return isInputMode;
};

const state = {
  functionstate: {
    openDialog: false
  }
};

export type pluginaction = "FUNCTION_DEFAULT_ACTION";

const action = {
  FUNCTION_DEFAULT_ACTION: "FUNCTION_DEFAULT_ACTION"
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
  switch (pluginAction) {
    case action.FUNCTION_DEFAULT_ACTION:
      return { ...state, functionstate: { openDialog: true } };
  }
  return state;
};

const Component: FunctionComponent<IPluginProps> = props => {
  const isDisable = getDisable(props);
  const [state] = useStore();
  return (
    <>
      <ToolbarCell
        disable={isDisable}
        onClick={props.action(
          PLUGIN_TYPE.FUNCTION,
          action.FUNCTION_DEFAULT_ACTION
        )}
      >
        <IconsContainer size={[32, 32]}>
          <IconsImage src={pluginFunction} />
        </IconsContainer>
        插入函数
      </ToolbarCell>
      {state.functionstate.openDialog && (
        <Modal>
          <p>123</p>
        </Modal>
      )}
    </>
  );
};

export default {
  Component,
  reducer,
  state,
  action
};
