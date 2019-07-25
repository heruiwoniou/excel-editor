import React, { FunctionComponent, useEffect } from "react";
import ReactDom from "react-dom";
import styled, { css } from "styled-components";
import close from "../../assets/close.svg";

interface IModalProps {
  width?: number;
  height?: number;
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
> = ({
  children,
  width = 300,
  height = 400,
  onClose = () => {},
  onSure = () => {}
}) => {
  return (
    <Portal>
      <ModalBackGround>
        <ModalPosition>
          <ModalBox width={width} height={height}>
            <ModalHeader>
              <CloseButton />
            </ModalHeader>
            {children}
          </ModalBox>
        </ModalPosition>
      </ModalBackGround>
    </Portal>
  );
};

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
`;
const CloseButton: any = styled.img.attrs({
  src: close
})`
  height: 16px;
  width: 16px;
  cursor: pointer;
`;
const ModalHeader: any = styled.div`
  height: 20px;
  padding: 2px;
  text-align: right;
  box-sizing: border-box;
  border-bottom: 1px solid #217346;
`;
