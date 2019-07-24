import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { DirectionType } from "./constants";

interface IPlaceHolder {
  size: number;
  type: DirectionType;
}

const PlaceHolder: FunctionComponent<IPlaceHolder> = ({
  type,
  size,
  ...rest
}) => {
  return <StyledPlaceHolder {...rest} style={{
    width: type === DirectionType.Virtual ? 1 : size,
    height: type === DirectionType.Virtual ? size : 1
  }}/>;
};

export default PlaceHolder;

const StyledPlaceHolder: any = styled.div<IPlaceHolder>``;
