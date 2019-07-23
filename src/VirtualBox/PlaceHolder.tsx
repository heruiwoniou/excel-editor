import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { DirectionType } from "./constants";

interface IPlaceHolder {
  size: number;
  type: DirectionType;
}

const PlaceHolder: FunctionComponent<IPlaceHolder> = props => {
  return <StyledPlaceHolder {...props} />;
};

export default PlaceHolder;

const StyledPlaceHolder: any = styled.div<IPlaceHolder>`
  width: ${(props: IPlaceHolder) =>
    props.type === DirectionType.Virtual ? 1 : props.size}px;
  height: ${(props: IPlaceHolder) =>
    props.type === DirectionType.Virtual ? props.size : 1}px;
`;
