export class ModelOption {
  libelle: string;
  value: string;
  data: any;
  constructor(lib: string, val: string, dat?:any) {
    this.libelle = lib;
    this.value = val;
    this.data = dat;
  }

  static setUniqueValue(lib: string): ModelOption {
    return new ModelOption(lib, lib, null);
  }
  static setCheckboxValue(lib: string): ModelOption {
    return new ModelOption(lib, '', null);
  }
}
