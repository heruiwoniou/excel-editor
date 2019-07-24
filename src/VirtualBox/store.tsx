import React, {
  useReducer,
  useContext,
  FunctionComponent,
  Dispatch
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
  payload: { key: string; value?: string };
}

const initialState: IState = { data: {} };

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.Update:
      let d = {
        data: {
          ...state.data,
          ...{ [action.payload.key]: action.payload.value }
        }
      };
      return d;
    case ActionType.Delete:
      let original = { data: { ...state.data } };
      delete original.data[action.payload.key];
      return original;
    default:
      throw new Error();
  }
};

const DataContext = React.createContext<[IState, Dispatch<IAction>]>([
  initialState,
  () => {}
]);

interface IDataProviderProps {
  children: JSX.Element[] | JSX.Element;
}

export const DataProvider: FunctionComponent<IDataProviderProps> = ({
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
