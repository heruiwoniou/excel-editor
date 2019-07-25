import React, {
  useReducer,
  useContext,
  FunctionComponent,
  Dispatch,
  PropsWithChildren
} from "react";

export enum ActionType {
  Update = "update",
  Delete = "delete"
}

type IState = {
  data: { [key: string]: string | undefined };
};
interface IAction {
  type: ActionType;
  payload: { [key: string]: string | string[] };
}

const initialState: IState = { data: {} };

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.Update:
      let key = action.payload.key as string;
      let value = action.payload.value as string;
      let d = {
        data: {
          ...state.data,
          ...{ [key]: value }
        }
      };
      return d;
    case ActionType.Delete:
      let newData = { data: { ...state.data } };
      let keys = action.payload.keys as string[];
      keys.forEach(key => {
        if(newData.data[key]) {
          delete newData.data[key]
        }
      });
      return newData;
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
