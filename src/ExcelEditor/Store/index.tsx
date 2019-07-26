import React, {
  useReducer,
  useContext,
  FunctionComponent,
  Dispatch,
  PropsWithChildren
} from "react";

import Plugins, { PLUGIN_TYPE, PLUGIN_ACTION } from "../Plugin";

export enum ActionType {
  Update = "update",
  Delete = "delete",
  PluginAction = "pluginAction"
}

export enum DataType {
  Number,
  String,
  Function
}

export interface IData {
  type: DataType;
  value: string;
}

export type IState = {
  data: { [key: string]: IData };
  settings: {
    plugins: string[];
  };
  [key: string]: any;
};

export interface IAction {
  type: ActionType;
  payload: {
    pluginType?: PLUGIN_TYPE;
    pluginAction?: PLUGIN_ACTION;
    [key: string]: any;
  };
}

let pluginState = {};

Object.keys(Plugins).forEach(type => {
  pluginState = { ...pluginState, ...Plugins[type as PLUGIN_TYPE].state };
});

const initialState: IState = {
  data: {},
  settings: {
    plugins: [PLUGIN_TYPE.FUNCTION, PLUGIN_TYPE.COL_SORT, PLUGIN_TYPE.ROW_SORT]
  },
  ...pluginState
};

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  let newData: IState;
  switch (action.type) {
    case ActionType.Update:
      let key = action.payload.key as string;
      let value = action.payload.value as IData;
      return {
        ...state,
        data: {
          ...state.data,
          ...{ [key]: value }
        }
      };
    case ActionType.Delete:
      newData = { ...state, data: { ...state.data } };
      let keys = action.payload.keys as string[];
      keys.forEach(key => {
        if (newData.data[key]) {
          delete newData.data[key];
        }
      });
      return newData;
    case ActionType.PluginAction:
      return Plugins[action.payload.pluginType as PLUGIN_TYPE].reducer(
        state,
        action
      );
    default:
      throw new Error();
  }
};

const DataContext = React.createContext<[IState, Dispatch<IAction>]>([
  initialState,
  () => {}
]);

export const DataProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children
}) => {
  let pluginState = {};

  const contextValue = useReducer<React.Reducer<IState, IAction>>(
    reducer,
    initialState
  );
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

const useStore = () => {
  const contextValue = useContext(DataContext);
  return contextValue;
};

export default useStore;
