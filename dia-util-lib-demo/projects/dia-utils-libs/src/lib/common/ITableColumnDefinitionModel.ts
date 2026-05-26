export interface ITableColumnDefinitionModel {
  columnDef?: string;
  forbiddenScreens?: any;
  header?: string;
  sort?: boolean;
  date?: boolean;
  time?: boolean;
  tooltip?: string;
  cell?: (row: any) => any;
  type?: string;
  isNumeric?: boolean;
  onclick?: (row: any) => any;
  requestable?: IRequestable;
  hide?: boolean;
  specificSort?: (a: any, b: any, direction: any) => number;
  checkbox?: (row: any) => any;
  isDynamicSearch?: boolean;
  class?: string;
  classEqualsRowValue?: boolean;
  custom?: any;
}

export interface IRequestable {
  controlName?: string;
  classNames?: string[];
  possibleValues?: string[];
  placeholder?: string;
  modelName?: string;
  isNumeric?: boolean;
  isDateRange?: boolean;
  isDate?: boolean;
  isPerimetre?: boolean;
  isMonoSelect?: boolean;
  isMultiSelect?: boolean;
  isInput?: boolean;
  format?: any;
  maxLength?: any;
}
