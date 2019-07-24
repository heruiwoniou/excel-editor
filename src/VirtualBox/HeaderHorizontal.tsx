import React, { FunctionComponent } from "react";
import styled from "styled-components";
import {
  PageHorizontalSize,
  DirectionType,
  HeaderVerticalSize,
  HeaderHorizontalSize,
  SheetCellsCount
} from "./constants";
import { defaultScrollWidth } from "../common/utils";
import PlaceHolder from "./PlaceHolder";
import HeaderCell from "./HeaderCell";

interface IHeaderHorizontalProps {
  headerRef: React.RefObject<HTMLDivElement>;
  pageHorizontalIndex: number;
  perLoadHorizontalCount: number;
  rearLoadHorizontalCount: number;
}
const HeaderHorizontal: FunctionComponent<IHeaderHorizontalProps> = ({
  headerRef,
  pageHorizontalIndex,
  perLoadHorizontalCount,
  rearLoadHorizontalCount
}) => {
  return (
    <HeaderHorizontalContainer>
      <HeaderContainer ref={headerRef}>
        <div
          style={{
            width:
              (pageHorizontalIndex + rearLoadHorizontalCount + 1) *
              PageHorizontalSize
          }}
        >
          <StyledPlaceHolder
            type={DirectionType.Horizontal}
            size={
              pageHorizontalIndex - perLoadHorizontalCount > 0
                ? (pageHorizontalIndex - perLoadHorizontalCount) *
                  PageHorizontalSize
                : 0
            }
          />
          <CellsContainer>
            {new Array(perLoadHorizontalCount)
              .fill(null)
              .map((value, index) => {
                let count = perLoadHorizontalCount - index;
                let pageIndex = pageHorizontalIndex - count;
                return (
                  pageHorizontalIndex - count >= 0 && (
                    <HeaderPager
                      key={`perload-${pageIndex}`}
                      data-key={`perload-${pageIndex}`}
                    >
                      {new Array(SheetCellsCount)
                        .fill(null)
                        .map((value, index) => {
                          let keyIndex =
                            pageIndex * SheetCellsCount + index + 1;
                          return (
                            <HeaderCell
                              key={`horizontal-header-cell-${keyIndex}`}
                              type={DirectionType.Horizontal}
                              value={`${keyIndex}`}
                            />
                          );
                        })}
                    </HeaderPager>
                  )
                );
              })}
            <HeaderPager
              key={`current-${pageHorizontalIndex}`}
              data-key={`current-${pageHorizontalIndex}`}
            >
              {new Array(SheetCellsCount).fill(null).map((value, index) => {
                let keyIndex =
                  pageHorizontalIndex * SheetCellsCount + index + 1;
                return (
                  <HeaderCell
                    key={`horizontal-header-cell-${keyIndex}`}
                    type={DirectionType.Horizontal}
                    value={`${keyIndex}`}
                  />
                );
              })}
            </HeaderPager>
            {new Array(rearLoadHorizontalCount)
              .fill(null)
              .map((value, index) => {
                let count = index + 1;
                let pageIndex = pageHorizontalIndex + count;
                return (
                  <HeaderPager
                    key={`rearload-${pageIndex}`}
                    data-key={`rearload-${pageIndex}`}
                  >
                    {new Array(SheetCellsCount)
                      .fill(null)
                      .map((value, index) => {
                        let keyIndex = pageIndex * SheetCellsCount + index + 1;
                        return (
                          <HeaderCell
                            key={`horizontal-header-cell-${keyIndex}`}
                            type={DirectionType.Horizontal}
                            value={`${keyIndex}`}
                          />
                        );
                      })}
                  </HeaderPager>
                );
              })}
          </CellsContainer>
        </div>
      </HeaderContainer>
    </HeaderHorizontalContainer>
  );
};

export default HeaderHorizontal;

const StyledPlaceHolder: any = styled(PlaceHolder)`
  float: left;
  height: ${HeaderHorizontalSize}px;
`;

const HeaderHorizontalContainer: any = styled.div`
  width: 100%;
  background: #edebe9;
`;

const HeaderContainer: any = styled.div`
  width: calc(100% - ${HeaderVerticalSize + defaultScrollWidth}px);
  margin-left: ${HeaderVerticalSize}px;
  overflow: hidden;
`;

const CellsContainer: any = styled.div`
  overflow: hidden;
  float: left;
`;

const HeaderPager: any = styled.div`
  height: ${HeaderHorizontalSize}px;
  width: ${PageHorizontalSize}px;
  float: left;
  display: flex;
`;
