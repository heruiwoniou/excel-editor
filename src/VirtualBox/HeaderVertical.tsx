import React, { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  HeaderVerticalSize,
  PageVerticalSize,
  DirectionType,
  SheetRowsCount
} from "./constants";
import { defaultScrollWidth } from "../common/utils";
import PlaceHolder from "./PlaceHolder";
import HeaderCell from "./HeaderCell";

interface IHeaderVerticalProps {
  headerRef: React.RefObject<HTMLDivElement>;
  pageVerticalIndex: number;
  perLoadVerticalCount: number;
  rearLoadVerticalCount: number;
}
const HeaderVertical: FunctionComponent<IHeaderVerticalProps> = ({
  headerRef,
  pageVerticalIndex,
  perLoadVerticalCount,
  rearLoadVerticalCount
}) => {
  return (
    <HeaderVerticalContainer>
      <HeaderContainer ref={headerRef}>
        <PlaceHolder
          type={DirectionType.Virtual}
          size={
            pageVerticalIndex - perLoadVerticalCount > 0
              ? (pageVerticalIndex - perLoadVerticalCount) * PageVerticalSize
              : 0
          }
        />
        <div>
          {new Array(perLoadVerticalCount).fill(null).map((value, index) => {
            let count = perLoadVerticalCount - index;
            let pageIndex = pageVerticalIndex - count;
            return (
              pageIndex >= 0 && (
                <HeaderPager key={`perload-${pageIndex}`}>
                  {new Array(SheetRowsCount).fill(null).map((value, index) => (
                    <HeaderCell
                      type={DirectionType.Virtual}
                      value={`${pageIndex * SheetRowsCount + index + 1}`}
                    />
                  ))}
                </HeaderPager>
              )
            );
          })}
          <HeaderPager key={`current-${pageVerticalIndex}`}>
            {new Array(SheetRowsCount).fill(null).map((value, index) => (
              <HeaderCell
                type={DirectionType.Virtual}
                value={`${pageVerticalIndex * SheetRowsCount + index + 1}`}
              />
            ))}
          </HeaderPager>
          {new Array(rearLoadVerticalCount).fill(null).map((value, index) => {
            let count = index + 1;
            let pageIndex = pageVerticalIndex + count;
            return (
              <HeaderPager key={`rearload-${pageIndex}`}>
                {new Array(SheetRowsCount).fill(null).map((value, index) => (
                  <HeaderCell
                    type={DirectionType.Virtual}
                    value={`${pageIndex * SheetRowsCount + index + 1}`}
                  />
                ))}
              </HeaderPager>
            );
          })}
        </div>
      </HeaderContainer>
    </HeaderVerticalContainer>
  );
};

export default HeaderVertical;

const HeaderVerticalContainer: any = styled.div`
  background: #edebe9;
`;

const HeaderContainer: any = styled.div`
  margin-top: -1px;
  margin-left: -1px;
  width: ${HeaderVerticalSize}px;
  height: calc(100% - ${defaultScrollWidth - 1}px);
  overflow: hidden;
  border-right: 1px solid #d4d4d4;
  border-top: 1px solid #dfdfdf;
`;

const HeaderPager: any = styled.div`
  height: ${PageVerticalSize}px;
  width: ${HeaderVerticalSize}px;
`;
