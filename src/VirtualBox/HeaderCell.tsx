import React, { FunctionComponent } from "react";
import styled from "styled-components";
import {
  DirectionType,
  CellHeight,
  CellWidth,
  HeaderHorizontalSize
} from "./constants";

interface IHeaderCellProps {
  type: DirectionType;
  value: string;
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
  &:after {
    content: "";
    position: absolute;
    background: #dfdfdf;
  }
  ${(props: IStyledHeaderCellProps) =>
    props.type === DirectionType.Virtual
      ? {
          "&:after": {
            left: "0px",
            bottom: "0px",
            width: "80%",
            marginLeft: "10%",
            height: "1px"
          }
        }
      : {
          width: `${CellWidth}px`,
          "&:after": {
            top: "10%",
            right: "0px",
            height: "80%",
            width: "1px"
          }
        }}
`;
