import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef
} from "react";
import styled, { css } from "styled-components";
import { CellWidth, CellHeight } from "./constants";
import { trim } from "../common/utils";
import useStore from "../store";

interface ISelectionProps {
  startRowIndex: number;
  endRowIndex: number;
  startCellIndex: number;
  endCellIndex: number;
}

interface ISelectionRefProps {
  selectionRef: React.RefObject<HTMLDivElement>;
  isInputMode: boolean;
  exitInputMode: (value: string, rowIndex: number, cellIndex: number) => void;
}

export const calcStyle = ({
  startRowIndex,
  endRowIndex,
  startCellIndex,
  endCellIndex
}: ISelectionProps) => ({
  display: startRowIndex === -1 ? "none" : "block",
  top: startRowIndex * CellHeight,
  left: startCellIndex * CellWidth,
  width: (Math.abs(endCellIndex - startCellIndex) + 1) * CellWidth,
  height: (Math.abs(endRowIndex - startRowIndex) + 1) * CellHeight
});

const Selection: FunctionComponent<ISelectionProps & ISelectionRefProps> = ({
  selectionRef,
  isInputMode,
  exitInputMode,
  startRowIndex,
  endRowIndex,
  startCellIndex,
  endCellIndex
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [
    {
      data: { [`${startCellIndex + 1}:${startRowIndex + 1}`]: inputValue = "" }
    }
  ] = useStore();

  const [{ data }] = useStore();

  const style = calcStyle({
    startRowIndex,
    endRowIndex,
    startCellIndex,
    endCellIndex
  });

  const handleBlur = useCallback(
    (e: FocusEvent) => {
      let input = ref.current;
      if (input && trim(input.value)) {
        exitInputMode(trim(input.value), startRowIndex + 1, startCellIndex + 1);
      }
    },
    [isInputMode]
  );

  useEffect(() => {
    if (isInputMode && ref.current) {
      ref.current.focus();
    }
  }, [isInputMode]);

  return (
    <>
      <SelectionContainer ref={selectionRef} style={style}>
        <SelectionBorder>
          <SelectionInnerBorder />
        </SelectionBorder>
        <SelectionInputArea>
          {isInputMode && (
            <StyledInput
              className="edit-mode-input"
              ref={ref}
              defaultValue={inputValue}
              onBlur={handleBlur}
            />
          )}
        </SelectionInputArea>
        <SelectionAreaTop />
        <SelectionAreaBottom />
      </SelectionContainer>
    </>
  );
};

export default Selection;

const SelectionBorder: any = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -1px;
  bottom: -1px;
  border: 2px solid #217346;
`;

const SelectionInnerBorder: any = styled.div`
  border: 1px solid #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const commonStyle = css`
  position: absolute;
  right: 0;
  background: #141414;
  opacity: 0.24;
`;

const SelectionInputArea: any = styled.div`
  height: ${CellHeight}px;
  width: ${CellWidth}px;
  position: absolute;
  left: 0;
  top: 0;
`;
const StyledInput: any = styled.input.attrs(props => ({
  type: "text"
}))`
  border: 0px;
  background: white;
  height: calc(100% - 1px);
  width: calc(100% - 1px);
  margin: 0;
  line-height: 20px;
  padding: 0 2px;
  outline: none;
  box-sizing: border-box;
  vertical-align: top;
`;
const SelectionAreaTop: any = styled.div`
  ${commonStyle}
  top: 0;
  left: ${CellWidth - 1}px;
  height: ${CellHeight - 1}px;
`;
const SelectionAreaBottom: any = styled.div`
  ${commonStyle}
  top: ${CellHeight - 1}px;
  left: 0;
  bottom: 0;
`;

const SelectionContainer: any = styled.div`
  position: absolute;
`;
