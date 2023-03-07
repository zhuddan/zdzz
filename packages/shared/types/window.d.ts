interface Window {
  webkitRequestAnimationFrame: Fn<FrameRequestCallback, number>;
  mozRequestAnimationFrame: Fn<FrameRequestCallback, number>;
  process: any;
}

declare type TargetContext = '_self' | '_blank';

declare interface VEvent extends Event {
  target: HTMLInputElement;
}

declare type IntervalHandle = ReturnType<typeof setInterval>;

declare type TimeoutHandle = ReturnType<typeof setTimeout>;