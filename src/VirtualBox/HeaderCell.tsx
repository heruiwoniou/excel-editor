import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import {
  DirectionType,
  CellHeight,
  CellWidth,
  HeaderHorizontalSize
} from "./constants";

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
    background: #d3f0e0;
    &:before {
      background: #cfcfcf;
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
            top: 10%;
            right: 0;
            height: 80%;
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
