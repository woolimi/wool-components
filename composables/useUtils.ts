// fix: floating-point precision
const safeRound = (num: number) => Number(num.toFixed(2));

const multiplyDecimals = (num1: number, num2: number) =>
  safeRound(safeRound(num1) * safeRound(num2));

const divideDecimals = (num1: number, num2: number) => safeRound(safeRound(num1) / safeRound(num2));

const getSize = (value: number | string): string => {
  return typeof value === 'number' ? `${value}px` : value;
};

/** Get the distance of the element from the top/left of the page */
const getOffset = (elem: HTMLDivElement) => {
  const doc = document.documentElement as HTMLElement;
  const body = document.body as HTMLElement;
  const rect = elem.getBoundingClientRect();
  const offset = {
    y: rect.top + (window.pageYOffset || doc.scrollTop) - (doc.clientTop || body.clientTop || 0),
    x:
      rect.left + (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || body.clientLeft || 0),
  };
  return offset;
};

/** Get the position of the mouse/finger in the element */
const getMousePos = (e: MouseEvent | TouchEvent, elem: HTMLDivElement) => {
  const event = 'targetTouches' in e ? e.targetTouches[0] : e;
  const offset = getOffset(elem);
  return {
    x: event.pageX - offset.x,
    y: event.pageY - offset.y,
  };
};

/** Calibrate the number within 0-100 ramge */
const calibratePos = (pos: number) => {
  if (pos < 0) return 0;
  if (pos > 100) return 100;
  return pos;
};

export const useUtils = () => ({
  getSize,
  getMousePos,
  calibratePos,
  divideDecimals,
  multiplyDecimals,
});
