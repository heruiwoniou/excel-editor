export const HeaderVerticalSize: number = 40;
export const HeaderHorizontalSize: number = 20;
export const CellWidth: number = 80;
export const CellHeight: number = 20;
export const SheetRowsCount: number = 50;
export const SheetCellsCount: number = 20;
export const PageHorizontalSize: number = CellWidth * SheetCellsCount;
export const PageVerticalSize: number = CellHeight * SheetRowsCount;
export const PerLoadCountDefault: number = 1;
export const RearLoadCountDefault: number = 2;
export const Colors: string[] = ["green", "blue", "red", "yellow"];
export enum DirectionType {
  Virtual,
  Horizontal
}
