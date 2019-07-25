import React, { FunctionComponent } from "react";

import pluginFunction from "../../assets/plugin-function.svg";
import {
  ToolbarCell,
  IconsContainer,
  IconsImage,
  IPluginProps
} from "../Component/Toolbar";
import { IState, IAction } from "../../store";

const getDisable = ({ isInputMode }: IPluginProps) => {
  return isInputMode;
};

const DisposeHandler = (state: IState, action: IAction) => {
  return state;
};

const Component: FunctionComponent<IPluginProps> = props => {
  const isDisable = getDisable(props);
  return (
    <ToolbarCell disable={isDisable}>
      <IconsContainer size={[32, 32]}>
        <IconsImage src={pluginFunction} />
      </IconsContainer>
      插入函数
    </ToolbarCell>
  );
};

export default {
  Component,
  DisposeHandler
};
