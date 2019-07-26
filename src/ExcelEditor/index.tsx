import React from "react";
import Editor from "./Editor";
import { DataProvider } from "./Store";

const ExcelEditor: React.FC = props => (
  <DataProvider>
    <Editor />
  </DataProvider>
);

export default ExcelEditor;
