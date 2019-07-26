import React, { FunctionComponent, useCallback, useRef, useMemo } from "react";
import styled from "styled-components";
import { Formik, FormikProps, FormikValues, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import pluginFunction from "../../assets/plugin-function.svg";
import {
  ToolbarCell,
  IconsContainer,
  IconsImage,
  IPluginProps
} from "../Component/Toolbar";
import useStore, { IState, IAction, ActionType } from "../Store";
import { PLUGIN_TYPE } from ".";
import Modal from "../Component/Modal";
import { ISelection } from "../Component/Selection";

export type IStateBase = {
  functionstate?: {
    selection?: ISelection;
    openDialog?: boolean;
  };
};

const emptySelection: ISelection = [-1, -1, -1, -1];

const state = {
  functionstate: {
    openDialog: false,
    selection: emptySelection
  }
};

export type pluginaction = "FUNCTION_DEFAULT_ACTION";

const actions = {
  FUNCTION_DEFAULT_ACTION: "FUNCTION_DEFAULT_ACTION",
  FUNCTION_CLOSE_MODAL_ACTION: "FUNCTION_CLOSE_MODAL_ACTION"
};

const reducer = (state: IState, { payload }: IAction) => {
  switch (payload.pluginAction) {
    case actions.FUNCTION_DEFAULT_ACTION:
      return {
        ...state,
        settings: {
          ...state.settings,
          disablekeyboardMonitoring: true
        },
        functionstate: { openDialog: true, selection: payload.selection }
      };
    case actions.FUNCTION_CLOSE_MODAL_ACTION:
      return {
        ...state,
        settings: {
          ...state.settings,
          disablekeyboardMonitoring: false
        },
        functionstate: { openDialog: false, selection: emptySelection }
      };
  }
  return state;
};

const getDisable = ({ isInputMode, selection }: IPluginProps) => {
  return isInputMode || selection![0] === -1;
};

const schema = Yup.object().shape({
  begin: Yup.string()
    .matches(/^[A-Z]+[1-9]+[0-9]*$/, "格式错误 (A1,B2, AA1, ...)")
    .required("必填项"),
  end: Yup.string()
    .matches(/^[A-Z]+[1-9]+[0-9]*$/, "格式错误 (A1,B2, AA1, ...)")
    .required("必填项")
});

const initialValues = { type: "sum", begin: "", end: "" };

const Component: FunctionComponent<IPluginProps> = props => {
  const isDisable = getDisable(props);
  const formRef = useRef<Formik>(null);
  const [state, dispath] = useStore();

  const openDialog = state.functionstate!.openDialog;
  const onClose = useCallback(() => {
    dispath({
      type: ActionType.PluginAction,
      payload: {
        pluginType: PLUGIN_TYPE.FUNCTION,
        pluginAction: actions.FUNCTION_CLOSE_MODAL_ACTION
      }
    });
  }, [dispath]);
  const onSure = useCallback(() => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  }, []);
  const onSumbit = useCallback((values, actions) => {
    debugger;
  }, []);
  return (
    <>
      <ToolbarCell
        disable={isDisable}
        onClick={props.action(
          PLUGIN_TYPE.FUNCTION,
          actions.FUNCTION_DEFAULT_ACTION
        )}
      >
        <IconsContainer size={[32, 32]}>
          <IconsImage src={pluginFunction} />
        </IconsContainer>
        插入函数
      </ToolbarCell>
      {openDialog && (
        <Modal
          title="添加函数"
          height={300}
          width={600}
          onClose={onClose}
          onSure={onSure}
        >
          <ModalContent>
            <Formik
              ref={formRef}
              initialValues={initialValues}
              onSubmit={onSumbit}
              validationSchema={schema}
            >
              {(props: FormikProps<FormikValues>) => (
                <form onSubmit={props.handleSubmit}>
                  <h3>选择函数:</h3>
                  <Field component="select" name="type">
                    <option value="sum">SUM</option>
                  </Field>
                  <div>
                    <h4>开始:</h4>
                    <Field type="text" name="begin" placeholder="A1" />
                    <ErrorContainer>
                      <ErrorMessage name="begin" />
                    </ErrorContainer>
                  </div>
                  <div>
                    <h4>结束:</h4>
                    <Field type="text" name="end" placeholder="B5" />
                    <ErrorContainer>
                      <ErrorMessage name="end" />
                    </ErrorContainer>
                  </div>
                </form>
              )}
            </Formik>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const ModalContent: any = styled.div`
  padding: 1px 20px;
  overflow-y: auto;
`;

const ErrorContainer: any = styled.span`
  color: red;
  margin-left: 10px;
`;

export default {
  Component,
  reducer,
  state,
  actions
};
