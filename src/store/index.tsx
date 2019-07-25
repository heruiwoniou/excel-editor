import React, {
  useReducer,
  useContext,
  FunctionComponent,
  Dispatch,
  PropsWithChildren
} from "react";

import Plugins, { PLUGIN_TYPE } from "../ExcelEditor/Plugin";

export enum ActionType {
  Update = "update",
  Delete = "delete"
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

export interface IState {
  data: { [key: string]: IData };
  settings: {
    plugins: string[];
  };
}

export interface IAction {
  type: ActionType | PLUGIN_TYPE;
  payload: { [key: string]: any };
}

const initialState: IState = {
  data: {},
  settings: {
    plugins: [PLUGIN_TYPE.FUNCTION, PLUGIN_TYPE.COL_SORT, PLUGIN_TYPE.ROW_SORT]
  }
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
    case PLUGIN_TYPE.COL_SORT:
      return Plugins[PLUGIN_TYPE.COL_SORT].DisposeHandler(state, action);
    case PLUGIN_TYPE.ROW_SORT:
      return Plugins[PLUGIN_TYPE.ROW_SORT].DisposeHandler(state, action);
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
