export enum InputType {
  BUTTON = 'button',
  CHECKBOX = 'checkbox',
  COLOR = 'color',
  DATE = 'date',
  EMAIL = 'email',
  FILE = 'file',
  HIDDEN = 'hidden',
  IMAGE = 'image',
  MONTH = 'month',
  NUMBER = 'number',
  PASSWORD = 'password',
  RADIO = 'radio',
  RANGE = 'range',
  RESET = 'reset',
  SEARCH = 'search',
  SUBMIT = 'submit',
  TEL = 'tel',
  TEXT = 'text',
  TIME = 'time',
  URL = 'url',
  WEEK = 'week',
}

export interface IOption {
  text: string;
  value: string | number;
}

// Tooltip
export type Position = 'top' | 'right' | 'bottom' | 'left';
export type TooltipDisplay = 'never' | 'always' | 'hover';

//Slider
export enum SliderState {
  DRAG = 'drag',
  FOCUS = 'focus',
}
export interface SliderStep {
  value: number;
  label?: string;
}

export interface SliderStepMeta extends SliderStep {
  pos: number;
  active: boolean;
}
export type FormatterFunc = (val: number) => string;
