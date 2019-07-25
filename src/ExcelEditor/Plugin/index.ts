import {
  default as PluginFunction,
  pluginaction as FunctionAction
} from "./Function";
import {
  default as PluginColSort,
  pluginaction as ColSortAction
} from "./ColSort";
import {
  default as PluginRowSort,
  pluginaction as RowSortAction
} from "./RowSort";

export enum PLUGIN_TYPE {
  FUNCTION = "function",
  COL_SORT = "colsort",
  ROW_SORT = "rowsort"
}

export type PLUGIN_ACTION =
  | FunctionAction
  | ColSortAction
  | RowSortAction
  | string;

export default {
  [PLUGIN_TYPE.FUNCTION]: PluginFunction,
  [PLUGIN_TYPE.COL_SORT]: PluginColSort,
  [PLUGIN_TYPE.ROW_SORT]: PluginRowSort
};
