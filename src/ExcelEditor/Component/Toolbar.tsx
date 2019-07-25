import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { ToolBarCellWidth, ToolBarHeight } from "../Constants";

enum ImageType {
  FUNCTION,
  ROW_ASCENDING,
  ROW_DESCENDING,
  COl_ASCENDING,
  COL_DESCENDING
}

const ImagesMap = {
  [ImageType.FUNCTION]: {
    size: [32, 32],
    src: [-69, -301]
  },
  [ImageType.ROW_ASCENDING]: {
    size: [16, 16],
    position: [-137, -53]
  },
  [ImageType.ROW_DESCENDING]: {
    size: [16, 16],
    position: [-137, -71]
  },
  [ImageType.COl_ASCENDING]: {
    size: [16, 16],
    position: [-137, -53]
  },
  [ImageType.COL_DESCENDING]: {
    size: [16, 16],
    position: [-137, -71]
  }
};

interface IToolbarProps {}
const Toolbar: FunctionComponent<IToolbarProps> = props => {
  return (
    <ToolbarContainer>
      <ToolbarSplitLine />
      <ToolbarCell>
        <IconsContainer size={ImagesMap[ImageType.FUNCTION].size}>
          <FuncIconsImage position={ImagesMap[ImageType.FUNCTION].position} />
        </IconsContainer>
        插入函数
      </ToolbarCell>
      <ToolbarSplitLine />
      <ToolbarCellContainer>
        <ToolbarCellContainerHeader>列</ToolbarCellContainerHeader>
        <ToolbarCell>
          <IconsContainer size={ImagesMap[ImageType.COl_ASCENDING].size}>
            <SortIconsImage
              position={ImagesMap[ImageType.COl_ASCENDING].position}
            />
          </IconsContainer>
          升序排序
        </ToolbarCell>
        <ToolbarCell>
          <IconsContainer size={ImagesMap[ImageType.COL_DESCENDING].size}>
            <SortIconsImage
              position={ImagesMap[ImageType.COL_DESCENDING].position}
            />
          </IconsContainer>
          降序排序
        </ToolbarCell>
      </ToolbarCellContainer>
      <ToolbarSplitLine />
      <ToolbarCellContainer>
        <ToolbarCellContainerHeader>行</ToolbarCellContainerHeader>
        <ToolbarCell>
          <IconsContainer size={ImagesMap[ImageType.ROW_ASCENDING].size}>
            <SortIconsImage
              position={ImagesMap[ImageType.ROW_ASCENDING].position}
            />
          </IconsContainer>
          升序排序
        </ToolbarCell>
        <ToolbarCell>
          <IconsContainer size={ImagesMap[ImageType.ROW_DESCENDING].size}>
            <SortIconsImage
              position={ImagesMap[ImageType.ROW_DESCENDING].position}
            />
          </IconsContainer>
          降序排序
        </ToolbarCell>
      </ToolbarCellContainer>
      <ToolbarSplitLine />
    </ToolbarContainer>
  );
};

export default Toolbar;

const ToolbarContainer: any = styled.div`
  height: ${ToolBarHeight}px;
  display: grid;
  grid-template-columns: repeat(auto-fill,  1px ${ToolBarCellWidth}px);
  grid-column-gap: 2px;
  padding: 2px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
`;

const ToolbarSplitLine: any = styled.div`
  background: white;
  height: ${ToolBarHeight - 4}px;
  background: #ccc;
`;

export const ToolbarCellContainerHeader: any = styled.div`
  height: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

export const ToolbarCell: any = styled.div`
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid transparent;
  &:hover {
    background: #efefef;
    border: 1px solid #ccc;
  }
`;

export const ToolbarCellContainer: any = styled.div`
  display: grid;
  grid-template-rows: 20px auto;
  grid-row-gap: 2px;
  ${ToolbarCell} {
    height: auto;
    flex-direction: row;
  }
`;

export const IconsContainer: any = styled.div<{ size: number[] }>`
  overflow: hidden;
  position: relative;
  ${({ size: [width, height] }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;
export const IconsImage: any = styled.img.attrs(({ src }) => ({
  src: src
}))`
  position: absolute;
  top: 0px;
  left: 0px;
`;
