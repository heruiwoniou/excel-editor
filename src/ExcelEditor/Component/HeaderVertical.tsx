import React, { FunctionComponent } from "react";
import styled from "styled-components";
import {
  HeaderVerticalSize,
  PageVerticalSize,
  DirectionType,
  SheetRowsCount
} from "../Constants";
import { defaultScrollWidth } from "../../common/utils";
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
                <HeaderPager
                  key={`perload-${pageIndex}`}
                  data-key={`perload-${pageIndex}`}
                >
                  {new Array(SheetRowsCount).fill(null).map((value, index) => {
                    let keyIndex =
                      pageVerticalIndex * SheetRowsCount + index + 1;
                    return (
                      <HeaderCell
                        key={`vertical-header-cell-${keyIndex}`}
                        className={`vertical-header-cell-${keyIndex}`}
                        type={DirectionType.Virtual}
                        value={`${keyIndex}`}
                      />
                    );
                  })}
                </HeaderPager>
              )
            );
          })}
          <HeaderPager
            key={`current-${pageVerticalIndex}`}
            data-key={`current-${pageVerticalIndex}`}
          >
            {new Array(SheetRowsCount).fill(null).map((value, index) => {
              let keyIndex = pageVerticalIndex * SheetRowsCount + index + 1;
              return (
                <HeaderCell
                  key={`vertical-header-cell-${keyIndex}`}
                  className={`vertical-header-cell-${keyIndex}`}
                  type={DirectionType.Virtual}
                  value={`${keyIndex}`}
                />
              );
            })}
          </HeaderPager>
          {new Array(rearLoadVerticalCount).fill(null).map((value, index) => {
            let count = index + 1;
            let pageIndex = pageVerticalIndex + count;
            return (
              <HeaderPager
                key={`rearload-${pageIndex}`}
                data-key={`rearload-${pageIndex}`}
              >
                {new Array(SheetRowsCount).fill(null).map((value, index) => {
                  let keyIndex = pageIndex * SheetRowsCount + index + 1;
                  return (
                    <HeaderCell
                      key={`vertical-header-cell-${keyIndex}`}
                      className={`vertical-header-cell-${keyIndex}`}
                      type={DirectionType.Virtual}
                      value={`${keyIndex}`}
                    />
                  );
                })}
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
  width: ${HeaderVerticalSize}px;
  height: calc(100% - ${defaultScrollWidth - 1}px);
  overflow: hidden;
`;

const HeaderPager: any = styled.div`
  height: ${PageVerticalSize}px;
  width: ${HeaderVerticalSize}px;
  border-right: solid 1px #bbb;
  box-sizing: border-box;
`;
