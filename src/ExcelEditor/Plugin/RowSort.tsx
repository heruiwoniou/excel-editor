import React from "react";

import pluginSortAsc from "../../assets/plugin-sort-asc.svg";
import pluginSortDesc from "../../assets/plugin-sort-desc.svg";
import {
  ToolbarCell,
  IconsContainer,
  IconsImage,
  ToolbarCellContainer,
  ToolbarCellContainerHeader
} from "../Component/Toolbar";

export default {
  button: (
    <ToolbarCellContainer>
      <ToolbarCellContainerHeader>行</ToolbarCellContainerHeader>
      <ToolbarCell>
        <IconsContainer size={[16, 16]}>
          <IconsImage src={pluginSortAsc} />
        </IconsContainer>
        升序排序
      </ToolbarCell>
      <ToolbarCell>
        <IconsContainer size={[16, 16]}>
          <IconsImage src={pluginSortDesc} />
        </IconsContainer>
        降序排序
      </ToolbarCell>
    </ToolbarCellContainer>
  )
};
