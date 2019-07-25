import React from "react";

import pluginFunction from "../../assets/plugin-function.svg";
import { ToolbarCell, IconsContainer, IconsImage } from "../Component/Toolbar";

export default {
  button: (
    <ToolbarCell>
      <IconsContainer size={[16, 16]}>
        <IconsImage src={pluginFunction} />
      </IconsContainer>
      插入函数
    </ToolbarCell>
  )
};
