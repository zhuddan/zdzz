import type * as components from './src';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ExcelRender: typeof components.ExcelRender;
    Icon: typeof components.Icon;
    SvgIcon: typeof components.SvgIcon;
    PDFRender: typeof components.PDFRender;
  }
}
export {};
