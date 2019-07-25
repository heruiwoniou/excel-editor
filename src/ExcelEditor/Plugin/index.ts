import { default as PluginFunction } from "./Function";
import { default as PluginColSort } from "./ColSort";
import { default as PluginRowSort } from "./RowSort";

export enum PLUGIN_TYPE {
  FUNCTION = "function",
  COL_SORT = "colsort",
  ROW_SORT = "rowsort"
}

export default {
  [PLUGIN_TYPE.FUNCTION]: PluginFunction,
  [PLUGIN_TYPE.COL_SORT]: PluginColSort,
  [PLUGIN_TYPE.ROW_SORT]: PluginRowSort
};
