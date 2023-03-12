import type * as components from './es';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ExcelRender: typeof components.ExcelRender;
    Icon: typeof components.Icon;
    SvgIcon: typeof components.SvgIcon;
    PDFRender: typeof components.PDFRender;
  }
}
export {};
