import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import {
  DirectionType,
  CellHeight,
  CellWidth,
  HeaderHorizontalSize
} from "../Constants";

interface IHeaderCellProps {
  type: DirectionType;
  value: string;
  className?: string;
}

const HeaderCell: FunctionComponent<IHeaderCellProps> = ({
  value,
  ...rest
}) => {
  return <StyledHeaderCell {...rest}>{value}</StyledHeaderCell>;
};

export default HeaderCell;

interface IStyledHeaderCellProps {
  type: DirectionType;
}
const StyledHeaderCell: any = styled.div<IStyledHeaderCellProps>`
  position: relative;
  font-size: 12px;
  text-align: center;
  height: ${(props: IStyledHeaderCellProps) =>
    props.type === DirectionType.Virtual ? CellHeight : HeaderHorizontalSize}px;
  line-height: ${(props: IStyledHeaderCellProps) =>
    props.type === DirectionType.Virtual ? CellHeight : HeaderHorizontalSize}px;
  &:before {
    content: "";
    position: absolute;
    background: #dfdfdf;
  }
  &:after {
    position: absolute;
    background: #217346;
  }

  &.selection {
    color: #217346;
    font-weight: bold;
    background: #dad8d6;
    &:before {
      background: #bfbfbf;
    }
    &:after {
      content: "";
    }
  }
  ${(props: IStyledHeaderCellProps) =>
    props.type === DirectionType.Virtual
      ? css`
          &:before {
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
          }
          &.selection:after {
            right: -1px;
            top: -2px;
            bottom: -1px;
            width: 2px;
          }
        `
      : css`
          width: ${CellWidth}px;
          &:before {
            top: 0;
            right: 0;
            height: 100%;
            width: 1px;
          }
          &.selection:after {
            bottom: 0px;;
            left: -2px;
            right: -1px;
            height: 2px;
          }
        `}
`;
