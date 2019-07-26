import React, { useState, useRef, useCallback } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import {
  PageHorizontalSize,
  PageVerticalSize,
  PerLoadCountDefault,
  RearLoadCountDefault,
  DirectionType,
  HeaderHorizontalSize,
  ToolBarHeight
} from "./Constants";
import PlaceHolder from "./Component/PlaceHolder";
import VirtualPagerRow from "./Component/VirtualPagerRow";
import HorizontalHeader from "./Component/HeaderHorizontal";
import VerticalHeader from "./Component/HeaderVertical";
import Selection, { ISelection } from "./Component/Selection";
import Toolbar from "./Component/Toolbar";
import useStore, { ActionType, DataType, IFunctionDataValue } from "./Store";
import {
  useVirtualScrollEffect,
  useSelectionEffect,
  useModeChangeEffect,
  useResizeEffect
} from "./Effects";
import Plugins, { PLUGIN_TYPE } from "./Plugin";

const Editor: React.FC = (...rest: any) => {
  const [state, dispatch] = useStore();
  // Selection
  const [selection, setSelection] = useState<ISelection>([-1, -1, -1, -1]);
  const [isInputMode, setInputMode] = useState<boolean>(false);

  // Vertical parameters
  const verticalHeaderRef = useRef<HTMLDivElement>(null);
  const [verticalScrollCache, setVerticalScrollCache] = useState<number>(0);
  const [pageVerticalIndex, updatePageVerticalIndex] = useState<number>(0);
  const [coefficientVertical, updateCoefficientVertical] = useState<number>(1);
  const [perLoadVerticalCount, updatePerLoadVerticalCount] = useState<number>(
    PerLoadCountDefault * coefficientVertical
  );
  const [rearLoadVerticalCount, updateRearLoadVerticalCount] = useState<number>(
    RearLoadCountDefault * coefficientVertical
  );

  const updatePageVerticalDataHander = useCallback(
    (pageIndex: number, cacheX: number, cacheY: number) =>
      ReactDom.unstable_batchedUpdates(() => {
        setHorizontalScrollCache(cacheX);
        setVerticalScrollCache(cacheY);
        updatePageVerticalIndex(pageIndex);
      }),
    []
  );
  const updateLoadVerticalCount = useCallback((n: number) => {
    updateCoefficientVertical(n);
    updatePerLoadVerticalCount(PerLoadCountDefault * n);
    updateRearLoadVerticalCount(RearLoadCountDefault * n);
  }, []);

  // Horizontal parameters
  const horizontalHeaderRef = useRef<HTMLDivElement>(null);
  const [horizontalScrollCache, setHorizontalScrollCache] = useState<number>(0);
  const [pageHorizontalIndex, updatePageHorizontalIndex] = useState<number>(0);
  const [coefficientHorizontal, updateCoefficientHorizontal] = useState<number>(
    1
  );
  const [perLoadHorizontalCount, updatePerLoadHorizontalCount] = useState<
    number
  >(PerLoadCountDefault * coefficientHorizontal);
  const [rearLoadHorizontalCount, updateRearLoadHorizontalCount] = useState<
    number
  >(RearLoadCountDefault * coefficientHorizontal);

  const updatePageHorizontalDataHander = useCallback(
    (pageIndex: number, cacheX: number, cacheY: number) =>
      ReactDom.unstable_batchedUpdates(() => {
        setHorizontalScrollCache(cacheX);
        setVerticalScrollCache(cacheY);
        updatePageHorizontalIndex(pageIndex);
      }),
    []
  );
  const updateLoadHorizontalCount = useCallback(
    (n: number) =>
      ReactDom.unstable_batchedUpdates(() => {
        updateCoefficientHorizontal(n);
        updatePerLoadHorizontalCount(PerLoadCountDefault * n);
        updateRearLoadHorizontalCount(RearLoadCountDefault * n);
      }),
    []
  );

  const ref = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);

  const VirtualPagerRowProps = {
    pageHorizontalIndex,
    perLoadHorizontalCount,
    rearLoadHorizontalCount
  };

  const [startRowIndex, startCellIndex, endRowIndex, endCellIndex] = selection;

  const VerticalHeaderProps = {
    headerRef: verticalHeaderRef,
    pageVerticalIndex,
    perLoadVerticalCount,
    rearLoadVerticalCount,
    selectionStart: startRowIndex,
    selectionEnd: endRowIndex
  };

  const HorizontalHeaderProps = {
    headerRef: horizontalHeaderRef,
    pageHorizontalIndex,
    perLoadHorizontalCount,
    rearLoadHorizontalCount,
    selectionStart: startCellIndex,
    selectionEnd: endCellIndex
  };

  const exitInputMode = useCallback(
    (value: string, rowNumber: number, cellNumber: number) => {
      setInputMode(false);
      if (value) {
        let isNumber = !isNaN(Number(value));
        dispatch({
          type: ActionType.Update,
          payload: {
            key: `${cellNumber}:${rowNumber}`,
            value: {
              type: isNumber ? DataType.Number : DataType.String,
              value: isNumber ? Number(value) : value
            }
          }
        });
      } else {
        dispatch({
          type: ActionType.Delete,
          payload: {
            keys: [`${cellNumber}:${rowNumber}`]
          }
        });
      }
    },
    [dispatch]
  );

  const enableInputMode = useCallback(() => {
    let cellNumber = startCellIndex + 1;
    let rowNumber = startRowIndex + 1;
    let data = state.data[`${cellNumber}:${rowNumber}`];
    if (data && data.type === DataType.Function) {
      dispatch({
        type: ActionType.PluginAction,
        payload: {
          pluginType: PLUGIN_TYPE.FUNCTION,
          pluginAction:
            Plugins[PLUGIN_TYPE.FUNCTION].actions.FUNCTION_DEFAULT_ACTION,
          selection: [startRowIndex, startCellIndex, endRowIndex, endCellIndex],
          initialValues: (data.value as IFunctionDataValue).original
        }
      });
    } else {
      setInputMode(true);
    }
  }, [
    setInputMode,
    dispatch,
    state.data,
    startRowIndex,
    startCellIndex,
    endRowIndex,
    endCellIndex
  ]);

  const deleteSelection = useCallback(() => {
    let keys = [];
    for (let row = startRowIndex; row <= endRowIndex; row++) {
      for (let cell = startCellIndex; cell <= endCellIndex; cell++) {
        keys.push(`${cell + 1}:${row + 1}`);
      }
    }
    keys.length &&
      dispatch({
        type: ActionType.Delete,
        payload: {
          keys
        }
      });
  }, [startRowIndex, endRowIndex, startCellIndex, endCellIndex, dispatch]);

  useVirtualScrollEffect(
    ref,
    verticalHeaderRef,
    horizontalHeaderRef,
    verticalScrollCache,
    horizontalScrollCache,
    pageHorizontalIndex,
    pageVerticalIndex,
    updatePageHorizontalDataHander,
    updatePageVerticalDataHander
  );

  useSelectionEffect(ref, selectionRef, setSelection, deleteSelection);

  useModeChangeEffect(ref, enableInputMode);

  useResizeEffect(ref, updateLoadHorizontalCount, updateLoadVerticalCount);

  return (
    <>
      <Toolbar isInputMode={isInputMode} selection={selection} />
      <TableContainer>
        <HorizontalHeader {...HorizontalHeaderProps} />
        <ContentContainer>
          <VerticalHeader {...VerticalHeaderProps} />
          <VirtualContainer ref={ref} {...rest}>
            <PlaceHolder
              type={DirectionType.Virtual}
              size={
                pageVerticalIndex - perLoadVerticalCount > 0
                  ? (pageVerticalIndex - perLoadVerticalCount) *
                    PageVerticalSize
                  : 0
              }
            />
            <div
              style={{
                width:
                  (pageHorizontalIndex + rearLoadHorizontalCount + 1) *
                  PageHorizontalSize
              }}
            >
              {new Array(perLoadVerticalCount)
                .fill(null)
                .map((value, index) => {
                  let count = perLoadVerticalCount - index;
                  return (
                    pageVerticalIndex - count >= 0 && (
                      <VirtualPagerRow
                        key={`perload-${pageVerticalIndex - count}`}
                        data-key={`perload-${pageVerticalIndex - count}`}
                        pageVerticalIndex={pageVerticalIndex - count}
                        {...VirtualPagerRowProps}
                      />
                    )
                  );
                })}
              <VirtualPagerRow
                key={`current-${pageVerticalIndex}`}
                data-key={`current-${pageVerticalIndex}`}
                pageVerticalIndex={pageVerticalIndex}
                {...VirtualPagerRowProps}
              />
              {new Array(rearLoadVerticalCount)
                .fill(null)
                .map((value, index) => {
                  let count = index + 1;
                  return (
                    <VirtualPagerRow
                      key={`rearload-${pageVerticalIndex + count}`}
                      data-key={`rearload-${pageVerticalIndex + count}`}
                      pageVerticalIndex={pageVerticalIndex + count}
                      {...VirtualPagerRowProps}
                    />
                  );
                })}
            </div>
            <Selection
              selectionRef={selectionRef}
              exitInputMode={exitInputMode}
              isInputMode={isInputMode}
              startRowIndex={startRowIndex}
              endRowIndex={endRowIndex}
              startCellIndex={startCellIndex}
              endCellIndex={endCellIndex}
            />
          </VirtualContainer>
        </ContentContainer>
      </TableContainer>
    </>
  );
};
const TableContainer: any = styled.div`
  height: calc(100vh - ${ToolBarHeight}px);
  width: 100vw;
`;

const VirtualContainer: any = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  position: relative;
`;

const ContentContainer: any = styled.div`
  width: 100%;
  height: calc(100% - ${HeaderHorizontalSize}px);
  display: flex;
`;

export default Editor;
