import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { PlaceHolderType } from "./constants";

interface IPlaceHolder {
  size: number;
  type: PlaceHolderType;
}

const PlaceHolder: FunctionComponent<IPlaceHolder> = ({ size, type}) => {
  return <StyledPlaceHolder style={{
    width: (type === PlaceHolderType.Virtual ? 1 : size) + 'px',
    height: (type === PlaceHolderType.Virtual ? size : 1) + 'px'
  }}/>;
};

export default PlaceHolder;

const StyledPlaceHolder: any = styled.div``;
