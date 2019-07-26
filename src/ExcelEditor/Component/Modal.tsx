import React, { FunctionComponent, useEffect, useCallback } from "react";
import ReactDom from "react-dom";
import styled, { css } from "styled-components";
import close from "../../assets/close.svg";

interface IModalProps {
  width?: number;
  height?: number;
  title: string;
}

interface IModalActions {
  onClose?: () => void;
  onSure?: () => void;
}

const Portal: React.FC = ({ children }) => {
  const mountNode = document.createElement("div");
  useEffect(() => {
    document.body.appendChild(mountNode);
    return () => {
      document.body.removeChild(mountNode);
    };
  });

  return ReactDom.createPortal(children, mountNode);
};

const Modal: FunctionComponent<
  React.PropsWithChildren<
    React.ReactElement | React.ReactNode | HTMLElement | Element
  > &
    IModalProps &
    IModalActions
> = React.memo(
  ({
    children,
    width = 800,
    height = 600,
    title,
    onClose = () => {},
    onSure = () => {}
  }) => {
    const onCloseHanlder = useCallback(() => {
      onClose && onClose();
    }, [onClose]);
    const onSureHanlder = useCallback(() => {
      onSure && onSure();
    }, [onSure]);
    return (
      <Portal>
        <ModalBackGround>
          <ModalPosition>
            <ModalBox width={width} height={height}>
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <CloseButton onClick={onCloseHanlder} />
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <ModalSureButton onClick={onSureHanlder}>确认</ModalSureButton>
                <ModalCloseButton onClick={onCloseHanlder}>
                  取消
                </ModalCloseButton>
              </ModalFooter>
            </ModalBox>
          </ModalPosition>
        </ModalBackGround>
      </Portal>
    );
  }
);

export default Modal;

const ModalBackGround: any = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
`;

const ModalPosition: any = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox: any = styled.div<IModalProps>`
  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
  background: white;
  border: 1px solid #217346;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2px #217346;
`;
const CloseButton: any = styled.img.attrs({
  src: close
})`
  height: 16px;
  width: 16px;
  cursor: pointer;
`;
const ModalTitle: any = styled.div`
  flex: 1;
  color: white;
`;
const ModalHeader: any = styled.div`
  height: 30px;
  padding: 7px;
  box-sizing: border-box;
  border-bottom: 1px solid #217346;
  background: #217346;
  display: flex;
`;

const ModalFooter: any = styled.div`
  height: 40px;
  background: #c7d6ce;
  text-align: right;
  padding: 10px;
  box-sizing: border-box;
  button {
    margin-left: 10px;
  }
`;

const ModalBody: any = styled.div`
  flex: 1;
  overflow: auto;
`;

const ModalCloseButton: any = styled.button`
  height: 20px;
`;
const ModalSureButton: any = styled.button`
  height: 20px;
`;
