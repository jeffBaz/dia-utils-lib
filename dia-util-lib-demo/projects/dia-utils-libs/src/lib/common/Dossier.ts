import { IFormatInput } from "./IFormatInput";
import { ModelOption } from "./model-option"; 
import { IFormGroupConfig } from "./IFormGroupConfig";
import { IAdvancedCustom } from "./IAdvancedCustom";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";

export class Dossier {
    static service?: any;
    static amountFormatter?: IFormatInput;
    static prefix?:string = '';
    linkParam?: number;
    type?: string;
    className?: string;
    onclick?: (_: any) => {};
    onchange?: (_: any) => {};
    title?: string;
    icon?: string;
    iconAction?: (...args: any[]) => {};
    list?: Dossier[];
    custom?: boolean;
    model?: any;
    field?: any;
    data?: any;
    value?: string | number;
    isNumber?: boolean;
    isDecimal?: boolean|undefined;
    isDate?: boolean;
    minDate?: Date;
    maxDate?: Date;
    noLine?: boolean;
    minrows?: number;
    isRadio?: boolean;
    possibleValues?: ModelOption[];
    hide?: boolean;
    suffix?: string;
    tooltip?: string;
    nbColumns?: number;
    maxLength?: number;
    minLength?: number;
    disableVisualHelp?: boolean;
    disabled?: boolean;
    required?: boolean|undefined;
    formGroupConfig?: IFormGroupConfig;
    customFormat?: IFormatInput;
    advancedCustoms?: IAdvancedCustom[];
    selectValues?: any[];
    placeholder?: string;
    getErrorMsg?: (_: Dossier) => {};
    // fix JIRA 1060
    sizeColumn?: number;
    indexColumn?: number;
    countDown?: boolean;
    modifiable?: boolean;
    isTextarea?: boolean;
    customClass?: string;
    fill?: boolean;
    constructor(title:string, list:Dossier[], value:string|number) {
        this.title = title;
        this.list = list;
        this.value = value;
    }
    static isDefined(val: any): boolean {
        return val !== null && val !== undefined;
    }
    static getEmptyDossier() {
        return new Dossier('####', [],  null as any);
    }
    static setByModel(title:string, model:any, field:string, custom?:any) {
        return Dossier.set(title, model[field], custom, model, field)
    }
    static set(title:string, value:any, custom?:any, model?:any, field?:string) {
        if (custom && custom.formGroupConfig) {
            if (custom.formGroupConfig.validators && custom.formGroupConfig.validators.filter((_:any) => _ === Validators.required)) {
                custom.required = true;
            }
            this.formBuild(value, custom.formGroupConfig)
        }
        if (value && typeof value !== 'string') {
            value = value['libelle'] ? value['libelle'] : value;
            if ((value).montant) {
                value = (value).montant;
                if ((value).devise) {
                    custom =
                        custom && typeof custom !== 'string'
                            ? () => (custom.suffix = (value).devise)
                            : custom;
                }
            }
            value =
                value && custom && custom.isDate && typeof value !== 'number'
                    ? (<Date>value).getTime()
                    : value;
            value =
                value && typeof value === 'number' && (!custom || !custom.isDate)
                    ? this.amountFormatter?.transform(value)
                    : value;
            // si aucun match trouvé on afiche une valeur vide
            value =
                value && typeof value !== 'string' && typeof value !== 'number'
                    ? ''
                    : value;
        }
        if (custom && typeof custom !== 'string') {
            const toReturn = {
                title: title, value: value, model: model,
                field: field
            };
            Object.keys(custom).map((field:string, index:number) => {
                (toReturn as any)[field] = custom[field];
            });
            return toReturn;
        } else if (custom) {
            return {
                title: title,
                value: value,
                model: model,
                field: field,
                suffix: this.service.instant(custom)
                    ? this.service.instant(this.prefix + custom)
                    : custom
            };
        } else {
            return {
                title: title,
                value: value,
                model: model,
                field: field
            };
        }
    }
    static build(title:string, list:Dossier[], multi?:Dossier[], custom?:any) {
        const toReturn = {
            value: null,
            title: title,
            list: multi
                ? multi
                : [
                    {
                        value: null,
                        title: null,
                        list: list
                    }
                ]
        };
        if (custom) {
            Object.keys(custom).map((field, index) => {
                (toReturn as any)[field] = custom[field];
            });
        }
        return toReturn;
    }
    static formBuild(value:any, config: IFormGroupConfig) {
        config.form.addControl(config.formName, new FormControl(value, config.validators, config.asyncValidators));
    }
    static bloc(title:string, list:Dossier[]) {
        return new Dossier(title, list, null as any);
    }
}