type inputType =
  | "input"
  | "select"
  | "date"
  | "timePicker"
  | "checkBox"
  | "radio";

type selectOptions = {
  label: string;
  value: string;
};

export interface IitemOptions {
  type: inputType;
  label?: string;
  placeholder?: string;
  "show-password"?: boolean;
  options?: Array<selectOptions>;
  "range-placeholder"?: string;
  "start-placeholder"?: string;
  "end-placeholder"?: string;
  "allow-control"?: boolean;
  filed: string;
}

export interface Istyle {
  [props: string]: string;
}

export interface ItableOption {
  prop: string;
  label: string;
  width?: string | number;
  "min-width"?: string | number;
  "max-width"?: string | number;
  slotName?: string;
}
