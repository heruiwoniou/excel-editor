import React, { FunctionComponent, useCallback } from "react";
import styled, { css } from "styled-components";
import cls from "classnames";
import { ToolBarCellWidth, ToolBarHeight } from "../Constants";
import Plugins, { PLUGIN_TYPE, PLUGIN_ACTION } from "../Plugin";
import useStore, { ActionType } from "../Store";

export interface IToolbarProps {
  isInputMode: boolean;
  selection?: [number, number, number, number];
}

export interface IPluginProps extends IToolbarProps {
  action: (
    pluginType: PLUGIN_TYPE,
    pluginAction: PLUGIN_ACTION,
    extra?: { [key: string]: any }
  ) => (e: MouseEvent) => void;
}

const Toolbar: FunctionComponent<IToolbarProps> = ({
  isInputMode,
  selection
}) => {
  const [
    {
      settings: { plugins }
    },
    dispatch
  ] = useStore();

  const action = useCallback(
    (pluginType, pluginAction, extra) => (e: MouseEvent) => {
      dispatch({
        type: ActionType.PluginAction,
        payload: {
          pluginType,
          pluginAction,
          extra,
          selection
        }
      });
    },
    [dispatch, selection]
  );

  return (
    <ToolbarContainer>
      {plugins.map(type => {
        const { Component } = Plugins[type as PLUGIN_TYPE];
        return (
          <React.Fragment key={`fragment-${type}`}>
            <ToolbarSplitLine key={`line-${type}`} />
            <Component
              action={action}
              isInputMode={isInputMode}
              selection={selection}
              key={`button-${type}`}
            />
          </React.Fragment>
        );
      })}
      <ToolbarSplitLine key={`last-line`} />
    </ToolbarContainer>
  );
};

export default Toolbar;

const ToolbarContainer: any = styled.div`
  height: ${ToolBarHeight}px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 1px ${ToolBarCellWidth}px);
  grid-column-gap: 2px;
  padding: 2px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
`;

const ToolbarSplitLine: any = styled.div`
  background: white;
  height: ${ToolBarHeight - 4}px;
  background: #ccc;
`;

export const ToolbarCellContainerHeader: any = styled.div`
  height: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

export const ToolbarCell: any = styled.div.attrs(
  ({ disable }: { disable: boolean }) => ({
    className: cls(disable ? "disable" : "")
  })
)`
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid transparent;
  &:hover {
    background: #efefef;
    border: 1px solid #ccc;
  }

  &.disable {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: white;
      border: 1px solid transparent;
    }
  }
`;

export const ToolbarCellContainer: any = styled.div`
  display: grid;
  grid-template-rows: 20px auto;
  grid-row-gap: 2px;
  ${ToolbarCell} {
    height: auto;
    flex-direction: row;
  }
`;

export const IconsContainer: any = styled.div<{ size: number[] }>`
  overflow: hidden;
  position: relative;
  margin: 5px;
  ${({ size: [width, height] }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;
export const IconsImage: any = styled.img.attrs(({ src }) => ({
  src: src
}))`
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
`;
