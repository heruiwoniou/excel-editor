import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface IHeaderHorizontalProps {
	pageHorizontalIndex: number,
  perLoadHorizontalCount: number,
  rearLoadHorizontalCount: number,
}
const HeaderHorizontal: FunctionComponent<IHeaderHorizontalProps> = ({
	pageHorizontalIndex,
  perLoadHorizontalCount,
  rearLoadHorizontalCount,
}) => {
	return <div />;
}

export default HeaderHorizontal;