import * as i0 from '@angular/core';
import { NgModule, EventEmitter, forwardRef, Input, Output, ViewChild, Optional, Host, SkipSelf, Component, ViewEncapsulation, HostListener, Directive, ChangeDetectionStrategy, ElementRef, ViewChildren } from '@angular/core';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators, FormControl, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import * as i2 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i3 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i5$2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i2$1 from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as i5$1 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i1$1 from '@angular/material/core';
import { MAT_DATE_FORMATS, MatOptionModule } from '@angular/material/core';
import * as i4 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i4$1 from '@angular/cdk/text-field';
import * as i7 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';

class DiaUtilsLibsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: DiaUtilsLibsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.2.4", ngImport: i0, type: DiaUtilsLibsModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            MatDatepickerModule,
            MatTooltipModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: DiaUtilsLibsModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            MatDatepickerModule,
            MatTooltipModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: DiaUtilsLibsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatIconModule,
                        MatDatepickerModule,
                        MatTooltipModule
                    ],
                    exports: []
                }]
        }] });

class Dossier {
    static service;
    static amountFormatter;
    static prefix = '';
    linkParam;
    type;
    className;
    onclick;
    onchange;
    title;
    icon;
    iconAction;
    list;
    custom;
    model;
    field;
    data;
    value;
    isNumber;
    isDecimal;
    isDate;
    minDate;
    maxDate;
    noLine;
    minrows;
    isRadio;
    possibleValues;
    hide;
    suffix;
    tooltip;
    nbColumns;
    maxLength;
    minLength;
    disableVisualHelp;
    disabled;
    required;
    formGroupConfig;
    customFormat;
    advancedCustoms;
    selectValues;
    placeholder;
    checkboxValues;
    getErrorMsg;
    // fix JIRA 1060
    sizeColumn;
    indexColumn;
    countDown;
    modifiable;
    isTextarea;
    customClass;
    fill;
    isCheckbox;
    constructor(title, list, value) {
        this.title = title;
        this.list = list;
        this.value = value;
    }
    static isDefined(val) {
        return val !== null && val !== undefined;
    }
    static getEmptyDossier() {
        return new Dossier('####', [], null);
    }
    static setByModel(title, model, field, custom) {
        return Dossier.set(title, model[field], custom, model, field);
    }
    static set(title, value, custom, model, field) {
        if (custom && custom.formGroupConfig) {
            if (custom.formGroupConfig.validators && custom.formGroupConfig.validators.filter((_) => _ === Validators.required)) {
                custom.required = true;
            }
            this.formBuild(value, custom.formGroupConfig);
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
                    ? value.getTime()
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
            Object.keys(custom).map((field, index) => {
                toReturn[field] = custom[field];
            });
            return toReturn;
        }
        else if (custom) {
            return {
                title: title,
                value: value,
                model: model,
                field: field,
                suffix: this.service.instant(custom)
                    ? this.service.instant(this.prefix + custom)
                    : custom
            };
        }
        else {
            return {
                title: title,
                value: value,
                model: model,
                field: field
            };
        }
    }
    static build(title, list, multi, custom) {
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
                toReturn[field] = custom[field];
            });
        }
        return toReturn;
    }
    static formBuild(value, config) {
        config.form.addControl(config.formName, new FormControl(value, config.validators, config.asyncValidators));
    }
    static bloc(title, list) {
        return new Dossier(title, list, null);
    }
}

class ModelOption {
    libelle;
    value;
    data;
    constructor(lib, val, dat) {
        this.libelle = lib;
        this.value = val;
        this.data = dat;
    }
    static setUniqueValue(lib) {
        return new ModelOption(lib, lib, null);
    }
    static setCheckboxValue(lib) {
        return new ModelOption(lib, '', null);
    }
}

class Inputs {
    el;
    renderer;
    controlContainer;
    formatInput;
    input;
    computeWidth;
    displayAsLabel = false;
    label = '';
    required = false;
    format = '';
    placeholder = '';
    hidden = '';
    description = '';
    disabled = false;
    isDatePicker = false;
    readonlyInput = false;
    readonly = false;
    type = '';
    min = 0;
    max = 0;
    minDate = 0;
    maxDate = 0;
    maxLength;
    maxLengthFormat;
    minLength;
    unit = '';
    name = '';
    cancellable = false;
    searching = false;
    value = '';
    customFormat;
    icon;
    errorMsg;
    isError = false;
    valueChange = new EventEmitter();
    cancelValue = new EventEmitter();
    formattedValue = '';
    defaultControl = false;
    matDatepicker;
    dateChange = new EventEmitter();
    visualHelpDisabled = false;
    isDateControl = false;
    currentControl;
    formControl = new FormControl();
    iconWasClicked = new EventEmitter();
    wasDblClicked = new EventEmitter();
    iconAction;
    tooltipText = '';
    onChange = (_) => { };
    onTouched = (_) => { };
    constructor(el, renderer, controlContainer) {
        this.el = el;
        this.renderer = renderer;
        this.controlContainer = controlContainer;
    }
    ngOnInit() {
        if (this.formatInput && this.formatInput.nativeElement.readonly !== this.readonlyInput) {
            this.formatInput.nativeElement.readonly = this.readonlyInput;
        }
        if (this.input && this.input.nativeElement.readonly !== this.readonlyInput) {
            this.input.nativeElement.readonly = this.readonlyInput;
        }
        if (this.defaultControl) {
            this.formControl = new FormControl(this.value);
            if (this.input) {
                this.input.nativeElement.formControl = this.formControl;
            }
            if (this.formatInput) {
                this.formatInput.nativeElement.formControl = this.formControl;
            }
        }
        if (this.controlContainer && (this.format || this.customFormat)) {
            const form = this.controlContainer.control;
            const lbl = this.el.nativeElement.getAttribute('formControlName');
            if (form) {
                const control = form.controls[lbl];
            }
        }
    }
    f_dateChange() {
        this.dateChange.emit();
    }
    gets(obs) {
        if (obs) {
            return obs;
        }
        else {
            return {};
        }
    }
    ngAfterViewChecked() {
        if (this.value && (this.format || this.customFormat)) {
            if (!((this.formattedValue + '').endsWith('.'))) {
                this.formattedValue = this.transform(this.value);
            }
        }
        if (this.controlContainer && this.el) {
            let fname = this.el.nativeElement.getAttribute('formControlName');
            fname = fname ? fname : this.el.nativeElement.getAttribute('ng-reflect-name');
            fname = fname ? fname : (this.input ? this.input.nativeElement.name : undefined);
            const fgroupDirective = this.gets(this.controlContainer);
            if (fgroupDirective && fgroupDirective.form) {
                this.currentControl = fgroupDirective.form.controls[fname];
                if (this.currentControl) {
                    if (this.currentControl.validator) {
                        const validator = this.currentControl.validator({});
                        if (validator && validator['required']) {
                            this.required = true;
                        }
                    }
                }
            }
        }
        if (!this.visualHelpDisabled && this.textOverflow()) {
            this.tooltipText = this.value + '';
        }
        else {
            this.tooltipText = '';
        }
    }
    textOverflow() {
        const currentWitdh = this.formatInput
            ? this.formatInput.nativeElement.clientWidth
            : this.input?.nativeElement.clientWidth;
        return this.computeWidth && this.computeWidth.nativeElement.clientWidth > (currentWitdh || 0) + 5;
    }
    ngOnChanges(changes) {
        if (this.label === 'Montant') {
            //console.log(changes);
        }
        if ((this.format || this.customFormat) &&
            changes['value'] &&
            changes['value'].currentValue !== this.parse(this.formattedValue)) {
            this.formattedValue = this.transform(changes['value'].currentValue);
            if (this.formatInput) {
                this.formatInput.nativeElement.value = this.formattedValue;
            }
        }
    }
    change(newValue) {
        this.writeValue(newValue);
        this.valueChange.emit(newValue);
        this.onChange(this.value);
        if ((this.format || this.customFormat) && this.formatInput) {
            this.formatInput.nativeElement.value = this.formattedValue;
        }
    }
    changeFormat(newValue) {
        this.formattedValue = this.transform(newValue);
        const offset = this.formattedValue.split(' ').length - 1;
        if (offset && offset > 0 && this.maxLength) {
            this.maxLengthFormat = this.maxLength + offset;
        }
        const unformattedValue = this.parse(this.formattedValue);
        this.change(unformattedValue);
    }
    cancel(data) {
        this.formattedValue = '';
        this.value = '';
        this.cancelValue.emit(data);
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    transform(val) {
        let valStr = '';
        let arr;
        if (this.format) {
            switch (this.format) {
                case 'siren':
                    valStr = val + '';
                    valStr = this.parse(valStr) + '';
                    arr = valStr.split('');
                    valStr = '';
                    arr.map((c) => {
                        valStr += c;
                        if (valStr.replace(/ /g, '').length % 3 === 0 &&
                            arr.length > valStr.replace(/ /g, '').length) {
                            valStr += ' ';
                        }
                    });
                    break;
                case 'amount':
                    let decPart = '';
                    if (this.min && val < this.min) {
                        val = this.min + '';
                    }
                    if (this.max && val > this.max) {
                        val = this.max + '';
                    }
                    valStr = val + '';
                    valStr = this.parse(valStr);
                    if (valStr === '') {
                        return '';
                    }
                    if (valStr.indexOf('.')) {
                        decPart = valStr.split('.')[1];
                        valStr = valStr.split('.')[0];
                    }
                    if (this.maxLength && valStr.length > this.maxLength) {
                        valStr = valStr.substring(0, this.maxLength);
                    }
                    arr = valStr.split('');
                    valStr = '';
                    arr.reverse().map((c) => {
                        valStr += c;
                        if (valStr.replace(/ /g, '').length % 3 === 0 &&
                            arr.length > valStr.replace(/ /g, '').length) {
                            valStr += ' ';
                        }
                    });
                    valStr = valStr.split('').reverse().join('');
                    if (decPart && decPart !== '') {
                        valStr += '.' + decPart;
                    }
                    break;
            }
        }
        else {
            valStr = this.customFormat ? this.customFormat.transform(val) : val;
        }
        return valStr;
    }
    parse(val) {
        let valStr = '';
        if (this.format) {
            switch (this.format) {
                case 'siren':
                    valStr = val + '';
                    valStr = valStr.replace(/ /g, '');
                    if (this.maxLength && valStr.length > this.maxLength) {
                        valStr = valStr.substring(0, this.maxLength);
                    }
                    break;
                case 'amount':
                    valStr = val + '';
                    if (valStr.substring(valStr.length - 1, 1) === '.') {
                        valStr = valStr.replace('.', '');
                    }
                    valStr = valStr.replace(/ /g, '');
                    if (valStr === '') {
                        return '';
                    }
                    let valNum = Number(valStr);
                    if (this.min && valNum < this.min) {
                        valNum = this.min;
                    }
                    if (this.max && valNum > this.max) {
                        valNum = this.max;
                    }
                    valStr = valNum + '';
                    if (this.maxLength && valStr.length > this.maxLength) {
                        valStr = valStr.substring(0, this.maxLength);
                    }
                    break;
            }
        }
        else {
            valStr = this.customFormat ? this.customFormat.parse(val) : val;
        }
        return valStr;
    }
    iconClicked(e) {
        this.iconWasClicked.emit(true);
        if (this.iconAction) {
            this.iconAction();
        }
    }
    dblClicked(e) {
        this.wasDblClicked.emit(true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Inputs, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.ControlContainer, host: true, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: Inputs, isStandalone: true, selector: "dia-input", inputs: { displayAsLabel: "displayAsLabel", label: "label", required: "required", format: "format", placeholder: "placeholder", hidden: "hidden", description: "description", disabled: "disabled", isDatePicker: "isDatePicker", readonlyInput: "readonlyInput", readonly: "readonly", type: "type", min: "min", max: "max", minDate: "minDate", maxDate: "maxDate", maxLength: "maxLength", minLength: "minLength", unit: "unit", name: "name", cancellable: "cancellable", searching: "searching", value: "value", customFormat: "customFormat", icon: "icon", errorMsg: "errorMsg", isError: "isError", defaultControl: "defaultControl", matDatepicker: "matDatepicker", visualHelpDisabled: "visualHelpDisabled", isDateControl: "isDateControl", formControl: "formControl", iconAction: "iconAction" }, outputs: { valueChange: "valueChange", cancelValue: "cancelValue", dateChange: "dateChange", iconWasClicked: "iconWasClicked", wasDblClicked: "wasDblClicked" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                multi: true,
                useExisting: forwardRef(() => Inputs)
            }
        ], viewQueries: [{ propertyName: "formatInput", first: true, predicate: ["formatInput"], descendants: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true }, { propertyName: "computeWidth", first: true, predicate: ["computeWidth"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<!--div *ngIf=\"label\" [innerHTML]=\"label\" [ngClass]=\"['formlabel']\"></div-->\n<div class=\"zone-description\" [ngClass]=\"{inputAsLabel:displayAsLabel}\" [matTooltip]=\"tooltipText\">\n  <mat-form-field appearance=\"outline\" [ngClass]=\"{hidden: hidden,  datePickerInput:isDateControl}\" >\n    <mat-label>{{ placeholder ? placeholder : label ? label : '                  ' }}</mat-label>\n\n    <input\n      matInput\n      #formatInput\n      name=\"formatInput\"\n      *ngIf=\"format || customFormat\"\n      [attr.hidden]=\"hidden\"\n      [ngModel]=\"formattedValue\"\n      (keyup)=\"changeFormat($event.target)\"\n      (blur)=\"onTouched($event)\"\n      [attr.disabled]=\"disabled ? '' : null\"\n      [attr.type]=\"type\"\n      [attr.min]=\"min\"\n      [attr.max]=\"max\"\n      [required]=\"required||false\"\n      [readonly]=\"readonly||false\"\n      autocomplete=\"off\"\n    />\n\n    <input\n      matInput\n      *ngIf=\"!defaultControl && !isDateControl\"\n      #input\n      [attr.hidden]=\"hidden || format || customFormat\"\n      [attr.name]=\"name ? name : 'input'\"\n      [ngModel]=\"value\"\n      (ngModelChange)=\"change($event)\"\n      (blur)=\"onTouched($event)\"\n      [attr.disabled]=\"disabled ? '' : null\"\n      [attr.type]=\"type\"\n      [attr.min]=\"min\"\n      [attr.max]=\"max\"\n      [required]=\"required||false\"\n      [readonly]=\"readonly||false\"\n      autocomplete=\"off\"\n    />\n    <input\n      matInput\n      *ngIf=\"defaultControl && !isDateControl\"\n      #input\n      [attr.hidden]=\"hidden || format || customFormat\"\n      [ngModel]=\"value\"\n      (ngModelChange)=\"change($event)\"\n      (blur)=\"onTouched($event)\"\n      [attr.disabled]=\"disabled ? '' : null\"\n      [attr.type]=\"type\"\n      [attr.name]=\"name ? name : 'input'\"\n      [attr.min]=\"min\"\n      [attr.max]=\"max\"\n      [formControl]=\"formControl\"\n      [required]=\"required||false\"\n      autocomplete=\"off\"\n    />\n\n  <input\n    matInput\n    *ngIf=\"isDateControl\"\n    #input\n    [attr.hidden]=\"hidden || format || customFormat\"\n    [attr.name]=\"name ? name : 'input'\"\n    [ngModel]=\"value\"\n    (ngModelChange)=\"change($event)\"\n    (blur)=\"onTouched($event)\"\n    [attr.disabled]=\"disabled ? '' : null\"\n    [attr.type]=\"type\"\n    [min]=\"minDate\"\n    [max]=\"maxDate\"\n    [required]=\"required||false\"\n    [readonly]=\"readonly||false\"\n    autocomplete=\"off\"\n    (dateChange)=\"f_dateChange()\"\n  />\n    <mat-icon class=\"clickable\" *ngIf=\"cancellable && value\" (click)=\"cancel($event)\" matSuffix\n      >highlight_off</mat-icon>\n    <mat-icon *ngIf=\"searching && !value\" matSuffix>search</mat-icon>\n    <mat-icon *ngIf=\"icon\" matSuffix (click)=\"iconClicked($event)\" (dblclick)=\"dblClicked($event)\">{{ icon }}</mat-icon>\n    <span matSuffix *ngIf=\"unit\" class=\"input-unit\" align=\"end\">{{\n      unit\n    }}</span>\n    <div\n      *ngIf=\"description\"\n      class=\"description\"\n      [innerHTML]=\"description\"\n    ></div>\n    <ng-content></ng-content>\n  </mat-form-field>\n</div>\n<div id=\"hidden\" #computeWidth>\n    {{value}}\n  </div>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i2.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatTooltipModule }, { kind: "directive", type: i5$1.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Inputs, decorators: [{
            type: Component,
            args: [{ selector: 'dia-input', standalone: true, imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule, MatTooltipModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(() => Inputs)
                        }
                    ], template: "<!--div *ngIf=\"label\" [innerHTML]=\"label\" [ngClass]=\"['formlabel']\"></div-->\n<div class=\"zone-description\" [ngClass]=\"{inputAsLabel:displayAsLabel}\" [matTooltip]=\"tooltipText\">\n  <mat-form-field appearance=\"outline\" [ngClass]=\"{hidden: hidden,  datePickerInput:isDateControl}\" >\n    <mat-label>{{ placeholder ? placeholder : label ? label : '                  ' }}</mat-label>\n\n    <input\n      matInput\n      #formatInput\n      name=\"formatInput\"\n      *ngIf=\"format || customFormat\"\n      [attr.hidden]=\"hidden\"\n      [ngModel]=\"formattedValue\"\n      (keyup)=\"changeFormat($event.target)\"\n      (blur)=\"onTouched($event)\"\n      [attr.disabled]=\"disabled ? '' : null\"\n      [attr.type]=\"type\"\n      [attr.min]=\"min\"\n      [attr.max]=\"max\"\n      [required]=\"required||false\"\n      [readonly]=\"readonly||false\"\n      autocomplete=\"off\"\n    />\n\n    <input\n      matInput\n      *ngIf=\"!defaultControl && !isDateControl\"\n      #input\n      [attr.hidden]=\"hidden || format || customFormat\"\n      [attr.name]=\"name ? name : 'input'\"\n      [ngModel]=\"value\"\n      (ngModelChange)=\"change($event)\"\n      (blur)=\"onTouched($event)\"\n      [attr.disabled]=\"disabled ? '' : null\"\n      [attr.type]=\"type\"\n      [attr.min]=\"min\"\n      [attr.max]=\"max\"\n      [required]=\"required||false\"\n      [readonly]=\"readonly||false\"\n      autocomplete=\"off\"\n    />\n    <input\n      matInput\n      *ngIf=\"defaultControl && !isDateControl\"\n      #input\n      [attr.hidden]=\"hidden || format || customFormat\"\n      [ngModel]=\"value\"\n      (ngModelChange)=\"change($event)\"\n      (blur)=\"onTouched($event)\"\n      [attr.disabled]=\"disabled ? '' : null\"\n      [attr.type]=\"type\"\n      [attr.name]=\"name ? name : 'input'\"\n      [attr.min]=\"min\"\n      [attr.max]=\"max\"\n      [formControl]=\"formControl\"\n      [required]=\"required||false\"\n      autocomplete=\"off\"\n    />\n\n  <input\n    matInput\n    *ngIf=\"isDateControl\"\n    #input\n    [attr.hidden]=\"hidden || format || customFormat\"\n    [attr.name]=\"name ? name : 'input'\"\n    [ngModel]=\"value\"\n    (ngModelChange)=\"change($event)\"\n    (blur)=\"onTouched($event)\"\n    [attr.disabled]=\"disabled ? '' : null\"\n    [attr.type]=\"type\"\n    [min]=\"minDate\"\n    [max]=\"maxDate\"\n    [required]=\"required||false\"\n    [readonly]=\"readonly||false\"\n    autocomplete=\"off\"\n    (dateChange)=\"f_dateChange()\"\n  />\n    <mat-icon class=\"clickable\" *ngIf=\"cancellable && value\" (click)=\"cancel($event)\" matSuffix\n      >highlight_off</mat-icon>\n    <mat-icon *ngIf=\"searching && !value\" matSuffix>search</mat-icon>\n    <mat-icon *ngIf=\"icon\" matSuffix (click)=\"iconClicked($event)\" (dblclick)=\"dblClicked($event)\">{{ icon }}</mat-icon>\n    <span matSuffix *ngIf=\"unit\" class=\"input-unit\" align=\"end\">{{\n      unit\n    }}</span>\n    <div\n      *ngIf=\"description\"\n      class=\"description\"\n      [innerHTML]=\"description\"\n    ></div>\n    <ng-content></ng-content>\n  </mat-form-field>\n</div>\n<div id=\"hidden\" #computeWidth>\n    {{value}}\n  </div>\n" }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.ControlContainer, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }, {
                    type: SkipSelf
                }] }], propDecorators: { formatInput: [{
                type: ViewChild,
                args: ['formatInput', { static: false }]
            }], input: [{
                type: ViewChild,
                args: ['input', { static: false }]
            }], computeWidth: [{
                type: ViewChild,
                args: ['computeWidth', { static: false }]
            }], displayAsLabel: [{
                type: Input
            }], label: [{
                type: Input
            }], required: [{
                type: Input
            }], format: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], hidden: [{
                type: Input
            }], description: [{
                type: Input
            }], disabled: [{
                type: Input
            }], isDatePicker: [{
                type: Input
            }], readonlyInput: [{
                type: Input
            }], readonly: [{
                type: Input
            }], type: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], minLength: [{
                type: Input
            }], unit: [{
                type: Input
            }], name: [{
                type: Input
            }], cancellable: [{
                type: Input
            }], searching: [{
                type: Input
            }], value: [{
                type: Input
            }], customFormat: [{
                type: Input
            }], icon: [{
                type: Input
            }], errorMsg: [{
                type: Input
            }], isError: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], cancelValue: [{
                type: Output
            }], defaultControl: [{
                type: Input
            }], matDatepicker: [{
                type: Input
            }], dateChange: [{
                type: Output
            }], visualHelpDisabled: [{
                type: Input
            }], isDateControl: [{
                type: Input
            }], formControl: [{
                type: Input
            }], iconWasClicked: [{
                type: Output
            }], wasDblClicked: [{
                type: Output
            }], iconAction: [{
                type: Input
            }] } });

class InputDatePicker {
    dateAdapter;
    label = '';
    customDatePicker = false;
    placeholder = 'Date';
    minDate;
    maxDate;
    dateChange = new EventEmitter();
    popupVisible = false;
    formControlDate = new FormControl();
    // Warning localDate via l'input date est la vraie valeur prise en compte pour la date
    localDate;
    disabledf = false;
    onChanged = (_) => { };
    onTouched = (_) => { };
    //value n'est pas la valeur utilisé par le composant
    value;
    valueChange = new EventEmitter();
    required = false;
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
        dateAdapter.setLocale('fr');
    }
    ngOnInit() {
        if (this.required) {
            this.formControlDate.setValidators(Validators.required);
        }
    }
    ngOnChanges(changes) {
        // Fix JIRA 848
        if (changes['value'] && changes['value'].currentValue === undefined) {
            this.formControlDate.reset();
        }
        if (changes['value'] && changes['value'].currentValue) {
            this.formControlDate.reset();
        }
    }
    writeValue(obj) {
        this.value = obj;
        this.date = this.value; // ? this.value.getTime() : this.value;
    }
    registerOnChange(fn) {
        this.onChanged = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    set date(date) {
        if (date !== null && date !== undefined) {
            this.localDate = new Date(date);
        }
        else {
            delete this.localDate;
        }
        this.formControlDate = new FormControl(this.localDate);
    }
    get date() {
        return this.localDate;
    }
    set disabled(disabled) {
        this.disabledf = disabled;
        if (this.disabledf) {
            this.formControlDate.disable();
        }
        else {
            this.formControlDate.enable();
        }
    }
    get disabled() {
        return this.disabledf;
    }
    // détection de changement et renvoi automatique de la nouvelle valeur.
    onChange() {
        if (this.formControlDate.value === null) {
            delete this.localDate;
        }
        else {
            this.localDate = new Date(this.formControlDate.value);
        }
        this.writeValue(this.localDate);
        this.dateChange.emit(this.localDate);
        this.onChanged(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: InputDatePicker, deps: [{ token: i1$1.DateAdapter }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: InputDatePicker, isStandalone: true, selector: "dia-input-date-picker", inputs: { label: "label", customDatePicker: "customDatePicker", placeholder: "placeholder", minDate: "minDate", maxDate: "maxDate", value: "value", required: "required", date: "date", disabled: "disabled" }, outputs: { dateChange: "dateChange", valueChange: "valueChange" }, providers: [
            /*{
              provide: DateAdapter,
              useClass: MomentDateAdapter,
              deps: [MAT_DATE_LOCALE]
            },*/
            { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS },
            {
                provide: NG_VALUE_ACCESSOR,
                multi: true,
                useExisting: forwardRef(() => InputDatePicker),
            }
        ], usesOnChanges: true, ngImport: i0, template: "<div class=\"container\" (click)=\"onTouched()\">\n    <!-- mat-form-field appearance=\"outline\" (click)=\"picker.open()\"-->\n    <div (click)=\"picker.open()\">\n      <!-- <mat-label\n        *ngIf=\"label\"\n        [innerHTML]=\"label\"\n        [ngClass]=\"['formlabel']\"\n      ></mat-label> -->\n      <dia-input\n        [isDateControl]=\"true\"\n        [required]=\"required\"\n        [matDatepicker]=\"picker\"\n        [minDate]=\"minDate?.getTime()||0\"\n        [maxDate]=\"maxDate?.getTime()||0\"\n        [placeholder]=\"placeholder\"\n        [formControl]=\"formControlDate\"\n        (dateChange)=\"onChange()\"\n        [icon]=\"'calendar_today'\"\n        [visualHelpDisabled]=\"true\"\n      >\n      </dia-input>\n     <!--  <mat-icon matSuffix>calendar_today</mat-icon> -->\n      <mat-datepicker\n        #picker\n        (closed)=\"popupVisible = false\"\n        (opened)=\"popupVisible = true\"\n      ></mat-datepicker>\n    <!--/mat-form-field-->\n    </div>\n  </div>\n  ", styles: ["mat-datepicker-content{margin-top:16px}:host{display:flex;align-items:center}input:focus{-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}:not([error=false])[error] .button{border-color:red}.button{background-color:#eee;border:solid 1px #e6e6e6;height:56px;line-height:56px;padding:0 1px 0 8px;color:rgba(#939598,.8);font-size:16px;box-sizing:border-box;cursor:pointer}.button.active{color:#162d46}.button.on-focus{box-shadow:0 5px 10px #0d476533;border:solid 1px gold}.button .flex-1{flex:1}.button>input{border:none;width:11.22rem;padding:0;color:#000}.button>input:focus{box-shadow:none}.button>i{margin-left:8px}.mat-calendar-body-selected{background-color:gold}\n"], dependencies: [{ kind: "component", type: Inputs, selector: "dia-input", inputs: ["displayAsLabel", "label", "required", "format", "placeholder", "hidden", "description", "disabled", "isDatePicker", "readonlyInput", "readonly", "type", "min", "max", "minDate", "maxDate", "maxLength", "minLength", "unit", "name", "cancellable", "searching", "value", "customFormat", "icon", "errorMsg", "isError", "defaultControl", "matDatepicker", "visualHelpDisabled", "isDateControl", "formControl", "iconAction"], outputs: ["valueChange", "cancelValue", "dateChange", "iconWasClicked", "wasDblClicked"] }, { kind: "ngmodule", type: MatDatepickerModule }, { kind: "component", type: i2$1.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "ngmodule", type: MatInputModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: CommonModule }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: InputDatePicker, decorators: [{
            type: Component,
            args: [{ selector: 'dia-input-date-picker', imports: [Inputs, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule], providers: [
                        /*{
                          provide: DateAdapter,
                          useClass: MomentDateAdapter,
                          deps: [MAT_DATE_LOCALE]
                        },*/
                        { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(() => InputDatePicker),
                        }
                    ], encapsulation: ViewEncapsulation.None, template: "<div class=\"container\" (click)=\"onTouched()\">\n    <!-- mat-form-field appearance=\"outline\" (click)=\"picker.open()\"-->\n    <div (click)=\"picker.open()\">\n      <!-- <mat-label\n        *ngIf=\"label\"\n        [innerHTML]=\"label\"\n        [ngClass]=\"['formlabel']\"\n      ></mat-label> -->\n      <dia-input\n        [isDateControl]=\"true\"\n        [required]=\"required\"\n        [matDatepicker]=\"picker\"\n        [minDate]=\"minDate?.getTime()||0\"\n        [maxDate]=\"maxDate?.getTime()||0\"\n        [placeholder]=\"placeholder\"\n        [formControl]=\"formControlDate\"\n        (dateChange)=\"onChange()\"\n        [icon]=\"'calendar_today'\"\n        [visualHelpDisabled]=\"true\"\n      >\n      </dia-input>\n     <!--  <mat-icon matSuffix>calendar_today</mat-icon> -->\n      <mat-datepicker\n        #picker\n        (closed)=\"popupVisible = false\"\n        (opened)=\"popupVisible = true\"\n      ></mat-datepicker>\n    <!--/mat-form-field-->\n    </div>\n  </div>\n  ", styles: ["mat-datepicker-content{margin-top:16px}:host{display:flex;align-items:center}input:focus{-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}:not([error=false])[error] .button{border-color:red}.button{background-color:#eee;border:solid 1px #e6e6e6;height:56px;line-height:56px;padding:0 1px 0 8px;color:rgba(#939598,.8);font-size:16px;box-sizing:border-box;cursor:pointer}.button.active{color:#162d46}.button.on-focus{box-shadow:0 5px 10px #0d476533;border:solid 1px gold}.button .flex-1{flex:1}.button>input{border:none;width:11.22rem;padding:0;color:#000}.button>input:focus{box-shadow:none}.button>i{margin-left:8px}.mat-calendar-body-selected{background-color:gold}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.DateAdapter }], propDecorators: { label: [{
                type: Input
            }], customDatePicker: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], dateChange: [{
                type: Output
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], required: [{
                type: Input
            }], date: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

class IsNumericDirective {
    el;
    renderer;
    regExIsNum = new RegExp('^[0-9]d{0,2}$');
    regExIsNumber = new RegExp('^[0-9]*$');
    regExIsAlphabet = new RegExp('[A-Za-z]');
    component;
    nextValue = '';
    isDecimal = false;
    disable = false;
    isControl = false;
    appIsNumeric = '';
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    onkeyup($e) {
        if (!this.disable) {
            if (!this.regExIsNum.test($e.key) && !this.isControl) {
                //console.log($e.key);
                if (($e.key.length === 1 ||
                    $e.key === 'Multiply' ||
                    $e.key === 'Subtract' ||
                    $e.key === 'Add' ||
                    $e.key === 'Divide') &&
                    !($e.key === '.' && this.isDecimal)) {
                    $e.preventDefault();
                }
            }
            if ($e.key !== 'Control' && this.isControl) {
                this.isControl = false;
            }
            if ($e.key === 'Control') {
                this.isControl = true;
                // this.nextValue = document.execCommand('Paste');
            }
        }
    }
    blockPaste(e) {
        const val = e.clipboardData.getData('Text').split(' ').join('');
        if (!this.disable && e.clipboardData && !this.regExIsNumber.test(val)) {
            e.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: IsNumericDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.2.4", type: IsNumericDirective, isStandalone: true, selector: "[appIsNumeric]", inputs: { isDecimal: "isDecimal", disable: "disable", appIsNumeric: "appIsNumeric" }, host: { listeners: { "keydown": "onkeyup($event)", "paste": "blockPaste($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: IsNumericDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appIsNumeric]'
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i0.Renderer2 }], propDecorators: { isDecimal: [{
                type: Input
            }], disable: [{
                type: Input
            }], appIsNumeric: [{
                type: Input
            }], onkeyup: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], blockPaste: [{
                type: HostListener,
                args: ['paste', ['$event']]
            }] } });

class ClickedOutsideDirective {
    el;
    looseCheck = false;
    trackEphemeraElement = false;
    hasleftFor = 0;
    hasLeft = new EventEmitter();
    clickedOutside = new EventEmitter();
    blur = new EventEmitter();
    lastElement;
    componentList = [];
    compList = [];
    compListChange = new EventEmitter();
    mouseIsOver = false;
    mouseleavedAlready = false;
    overSuspended = false;
    debug = false;
    index = 0;
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        this.componentList.push(this.el);
    }
    onclick(targetElement) {
        if (!this.contains(targetElement) && (this.isInDocument(targetElement) || this.looseCheck)) {
            this.clickedOutside.emit({ target: targetElement, src: this.el.nativeElement });
            if ((this.lastElement && this.contains(this.lastElement)) || (this.trackEphemeraElement && this.lastElement && this.lastElement.usedTobePartOf)) {
                this.blur.emit({ target: targetElement, src: this.el.nativeElement, last: this.lastElement });
            }
        }
        this.lastElement = targetElement;
    }
    isInDocument(targetElement) {
        return targetElement === document.body ? false : document.body.contains(targetElement);
    }
    contains(el) {
        let contains = false;
        this.componentList.forEach(it => {
            if (it.nativeElement.contains(el))
                contains = true;
        });
        this.compList.forEach(it => {
            if (it.nativeElement.contains(el))
                contains = true;
        });
        if (this.trackEphemeraElement && contains) {
            el.usedTobePartOf = true;
        }
        if (this.debug) {
            console.log(el.className + ': fait' + (contains ? '' : 'pas') + 'parti');
        }
        return contains;
    }
    onmouseover(el) {
        this.mouseIsOver = true;
    }
    onmouseleave(el) {
        if (this.hasleftFor) {
            if (this.mouseleavedAlready && !this.mouseIsOver && !this.overSuspended) {
                this.hasLeft.emit(el);
            }
            else if (!this.mouseleavedAlready) {
                setTimeout(() => {
                    this.onmouseleave();
                }, this.hasleftFor);
                this.mouseleavedAlready = true;
                this.mouseIsOver = false;
                return;
            }
        }
        this.mouseleavedAlready = false;
        this.mouseIsOver = false;
    }
    suspendOverDetection() {
        this.mouseIsOver = true;
        this.overSuspended = true;
    }
    resumeOverDetection() {
        this.overSuspended = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ClickedOutsideDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.2.4", type: ClickedOutsideDirective, isStandalone: true, selector: "[appClickedOutside]", inputs: { looseCheck: "looseCheck", trackEphemeraElement: "trackEphemeraElement", hasleftFor: "hasleftFor", compList: "compList", debug: "debug" }, outputs: { hasLeft: "hasLeft", clickedOutside: "clickedOutside", blur: "blur", compListChange: "compListChange" }, host: { listeners: { "document:click": "onclick($event.target)", "mousemove": "onmouseover($event.target)", "mouseleave": "onmouseleave($event.target)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ClickedOutsideDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appClickedOutside]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { looseCheck: [{
                type: Input
            }], trackEphemeraElement: [{
                type: Input
            }], hasleftFor: [{
                type: Input
            }], hasLeft: [{
                type: Output
            }], clickedOutside: [{
                type: Output
            }], blur: [{
                type: Output
            }], compList: [{
                type: Input
            }], compListChange: [{
                type: Output
            }], debug: [{
                type: Input
            }], onclick: [{
                type: HostListener,
                args: ['document:click', ['$event.target']]
            }], onmouseover: [{
                type: HostListener,
                args: ['mousemove', ['$event.target']]
            }], onmouseleave: [{
                type: HostListener,
                args: ['mouseleave', ['$event.target']]
            }] } });

class Select {
    controlContainer;
    el;
    value = null;
    required = false;
    defaultValue = true;
    fixPlaceholder = false;
    values = [];
    forced = [];
    list = [];
    placeholder = '';
    disablePlaceHolder = true;
    label = '';
    description = '';
    multiple = false;
    defaultSort = true;
    selectedValue = '';
    disabled = false;
    direction = '';
    preset = null;
    tooltip = false;
    tooltipValue = '';
    autoClosedAfter = 0;
    valueChange = new EventEmitter();
    valuesChange = new EventEmitter();
    beenForced = new EventEmitter();
    formField;
    select;
    floatLabel = 'auto';
    currentControl = undefined;
    isBeingForced = false;
    onChange = (_) => { };
    onTouched = (_) => { };
    translate = null;
    isAppleBrowser = false;
    constructor(controlContainer, el) {
        this.controlContainer = controlContainer;
        this.el = el;
    }
    ngAfterViewInit() {
        this.isAppleBrowser = this.isAppleBrowsers();
    }
    ngOnInit() { }
    isAppleBrowsers() {
        if (typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            return true;
        }
        else {
            return false;
        }
    }
    gets(obs) {
        if (obs) {
            return obs;
        }
        else {
            return {};
        }
    }
    ngAfterViewChecked() {
        if (this.controlContainer && this.el) {
            const fname = this.el.nativeElement.getAttribute('formControlName');
            const fgroupDirective = this.gets(this.controlContainer);
            if (fgroupDirective && fgroupDirective.form) {
                this.currentControl = fgroupDirective.form.controls[fname];
                if (this.currentControl) {
                    if (this.currentControl.validator) {
                        const validator = this.currentControl.validator({});
                        if (validator && validator['required']) {
                            this.required = true;
                        }
                    }
                }
            }
        }
    }
    ngOnChanges(changes) {
        if (changes['fixPlaceholder'] && changes['fixPlaceholder'].currentValue) {
            this.floatLabel = this.fixPlaceholder ? 'always' : 'auto';
        }
        if (changes['list'] && changes['list'].currentValue) {
            if (this.list) {
                if (this.list.length > 0) {
                    this.list.map(value => {
                        if (value.libelle) {
                            value.libelle = this.translate ? this.translate.instant(value.libelle) : value.libelle;
                        }
                    });
                    if (this.defaultSort) {
                        this.list = this.list.sort((a, b) => a.libelle < b.libelle ? -1 : a.libelle > b.libelle ? 1 : 0);
                    }
                }
            }
            if (this.list) {
                if (this.list.length > 0 &&
                    this.preset &&
                    (!this.value || !this.getListValue(this.value))) {
                    this.onUpdateValue(this.getPresetValue());
                    this.onTouched(true);
                }
            }
        }
        if (changes['value'] && this.getListValue(changes['value'].currentValue)) {
            this.value = this.getListValue(changes['value'].currentValue);
        }
        if (changes['forced']) {
            this.isBeingForced = true;
            this.resetMultiple();
            if (this.forced) {
                this.values = this.forced.map(it => this.getListValue(it)).filter((it) => !!it);
            }
            else {
                this.values = [];
            }
            this.valuesChange.emit(this.values);
            this.beenForced.emit(this.values);
            this.onUpdateValue(this.values);
            this.isBeingForced = false;
        }
        if (changes['forced'] && !changes['forced'].currentValue) {
            // Optionally reset selection
        }
    }
    resetMultiple() {
        if (this.select && this.select.options) {
            this.select.options.forEach(it => {
                it.deselect();
            });
        }
    }
    getListValue(val) {
        return this.isValInList(val, this.list);
    }
    isAlreadySelected(val) {
        return this.isValInList(val, this.values);
    }
    isValInList(val, list) {
        if (!val || !list) {
            return null;
        }
        const res = list.find(it => (!val.value && !it.value && val === it) || (val.value && it.value && val.value === it.value) || (val.value && it.value && val.libelle === it.libelle));
        return res ? res : null;
    }
    getPresetValue() {
        if (!this.list)
            return null;
        const res = this.list.find(it => this.preset === it.value || this.preset === it.libelle);
        return res ? res : this.list[0];
    }
    onUpdateValue(item) {
        this.value = item;
        if (this.tooltip && this.value && this.value.libelle) {
            this.tooltipValue = this.value.libelle;
        }
        this.onChange(item);
        this.valueChange.emit(item);
    }
    getPlaceHolder() {
        if (this.disablePlaceHolder &&
            this.value !== null &&
            this.value !== undefined &&
            !this.multiple) {
            return '';
        }
        else {
            return this.placeholder;
        }
    }
    writeValue(value) {
        if (!value) {
            this.resetMultiple();
        }
        if (this.multiple && value) {
            this.values = this.values ? this.values : [];
            if (!this.isAlreadySelected(value)) {
                this.values.push(value);
            }
            this.valuesChange.emit(this.values);
            this.onUpdateValue(this.values);
        }
        if (this.value && !this.multiple) {
            this.value = value;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    itemSelected(e, item) {
        if (e.source.selected) {
            this.writeValue(item);
        }
        else {
            if (this.values) {
                this.values = this.values.filter(it => it.libelle !== item.libelle);
            }
            this.valuesChange.emit(this.values);
            this.onUpdateValue(item);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Select, deps: [{ token: i1.ControlContainer, host: true, optional: true, skipSelf: true }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: Select, isStandalone: true, selector: "dia-select", inputs: { value: "value", required: "required", defaultValue: "defaultValue", fixPlaceholder: "fixPlaceholder", values: "values", forced: "forced", list: "list", placeholder: "placeholder", disablePlaceHolder: "disablePlaceHolder", label: "label", description: "description", multiple: "multiple", defaultSort: "defaultSort", selectedValue: "selectedValue", disabled: "disabled", direction: "direction", preset: "preset", tooltip: "tooltip", autoClosedAfter: "autoClosedAfter", translate: "translate" }, outputs: { valueChange: "valueChange", valuesChange: "valuesChange", beenForced: "beenForced" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                multi: true,
                useExisting: forwardRef(() => Select)
            }
        ], viewQueries: [{ propertyName: "formField", first: true, predicate: ["formField"], descendants: true, static: true }, { propertyName: "select", first: true, predicate: ["select"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"zone-select\" appClickedOutside [hasleftFor]=\"autoClosedAfter\" (hasLeft)=\"select?.close()\" [matTooltip]=\"tooltipValue\">\n  <div class=\"zone-description\">\n    <mat-form-field #formField appearance=\"outline\" [floatLabel]=\"floatLabel\">\n      <mat-label *ngIf=\"label\" [ngClass]=\"['formlabel']\">{{label}}</mat-label>\n      <mat-label class=\"my-class-name\" *ngIf=\"fixPlaceholder\">{{getPlaceHolder()}}</mat-label>\n      <mat-select *ngIf=\"multiple\" #select (blur)=\"onTouched($event)\" [disabled]=\"disabled\" [placeholder]=\"getPlaceHolder()||''\" [multiple]=\"multiple\" [value]=\"value\" (valueChange)=\"onUpdateValue($event)\" [required]=\"required\" cdkTextareaAutosize>\n        <mat-option *ngFor=\"let topping of list\" [value]=\"topping\" (onSelectionChange)=\"itemSelected($event, topping)\">{{topping?.libelle ? topping?.libelle: topping}}</mat-option>\n      </mat-select>\n      <mat-select *ngIf=\"!multiple\" #select (blur)=\"onTouched($event)\" [disabled]=\"disabled\" [placeholder]=\"getPlaceHolder()||''\" [(value)]=\"value\" (valueChange)=\"onUpdateValue($event)\" [required]=\"required\" cdkTextareaAutosize>\n        <mat-option *ngIf=\"defaultValue\" class=\"defaultValue\"></mat-option>\n        <mat-option *ngFor=\"let topping of list\" [value]=\"topping\" >{{topping?.libelle ? topping?.libelle: topping}}</mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div *ngIf=\"description\" class=\"description\" [innerHTML]=\"description\"></div>\n  </div>\n</div>\n", styles: ["mat-form-field{width:100%}.mat-mdc-option.mdc-list-item{background-color:#fff}.mat-mdc-option.mdc-list-item:hover{background-color:gray}.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-multiple){background-color:gray}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i4.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "component", type: i4.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }, { kind: "ngmodule", type: MatOptionModule }, { kind: "ngmodule", type: MatTooltipModule }, { kind: "directive", type: i5$1.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "directive", type: ClickedOutsideDirective, selector: "[appClickedOutside]", inputs: ["looseCheck", "trackEphemeraElement", "hasleftFor", "compList", "debug"], outputs: ["hasLeft", "clickedOutside", "blur", "compListChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Select, decorators: [{
            type: Component,
            args: [{ selector: 'dia-select', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatFormFieldModule,
                        MatSelectModule,
                        MatOptionModule,
                        MatTooltipModule,
                        ClickedOutsideDirective
                    ], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(() => Select)
                        }
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.Emulated, template: "<div class=\"zone-select\" appClickedOutside [hasleftFor]=\"autoClosedAfter\" (hasLeft)=\"select?.close()\" [matTooltip]=\"tooltipValue\">\n  <div class=\"zone-description\">\n    <mat-form-field #formField appearance=\"outline\" [floatLabel]=\"floatLabel\">\n      <mat-label *ngIf=\"label\" [ngClass]=\"['formlabel']\">{{label}}</mat-label>\n      <mat-label class=\"my-class-name\" *ngIf=\"fixPlaceholder\">{{getPlaceHolder()}}</mat-label>\n      <mat-select *ngIf=\"multiple\" #select (blur)=\"onTouched($event)\" [disabled]=\"disabled\" [placeholder]=\"getPlaceHolder()||''\" [multiple]=\"multiple\" [value]=\"value\" (valueChange)=\"onUpdateValue($event)\" [required]=\"required\" cdkTextareaAutosize>\n        <mat-option *ngFor=\"let topping of list\" [value]=\"topping\" (onSelectionChange)=\"itemSelected($event, topping)\">{{topping?.libelle ? topping?.libelle: topping}}</mat-option>\n      </mat-select>\n      <mat-select *ngIf=\"!multiple\" #select (blur)=\"onTouched($event)\" [disabled]=\"disabled\" [placeholder]=\"getPlaceHolder()||''\" [(value)]=\"value\" (valueChange)=\"onUpdateValue($event)\" [required]=\"required\" cdkTextareaAutosize>\n        <mat-option *ngIf=\"defaultValue\" class=\"defaultValue\"></mat-option>\n        <mat-option *ngFor=\"let topping of list\" [value]=\"topping\" >{{topping?.libelle ? topping?.libelle: topping}}</mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div *ngIf=\"description\" class=\"description\" [innerHTML]=\"description\"></div>\n  </div>\n</div>\n", styles: ["mat-form-field{width:100%}.mat-mdc-option.mdc-list-item{background-color:#fff}.mat-mdc-option.mdc-list-item:hover{background-color:gray}.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-multiple){background-color:gray}\n"] }]
        }], ctorParameters: () => [{ type: i1.ControlContainer, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }, {
                    type: SkipSelf
                }] }, { type: i0.ElementRef }], propDecorators: { value: [{
                type: Input
            }], required: [{
                type: Input
            }], defaultValue: [{
                type: Input
            }], fixPlaceholder: [{
                type: Input
            }], values: [{
                type: Input
            }], forced: [{
                type: Input
            }], list: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disablePlaceHolder: [{
                type: Input
            }], label: [{
                type: Input
            }], description: [{
                type: Input
            }], multiple: [{
                type: Input
            }], defaultSort: [{
                type: Input
            }], selectedValue: [{
                type: Input
            }], disabled: [{
                type: Input
            }], direction: [{
                type: Input
            }], preset: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], autoClosedAfter: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], valuesChange: [{
                type: Output
            }], beenForced: [{
                type: Output
            }], formField: [{
                type: ViewChild,
                args: ['formField', { static: true }]
            }], select: [{
                type: ViewChild,
                args: ['select', { static: false }]
            }], translate: [{
                type: Input
            }] } });

class Textarea {
    el;
    controlContainer;
    input;
    label = '';
    unit;
    placeholder;
    description;
    value;
    readonly;
    innerHTML;
    isTextArea = true;
    valueChange = new EventEmitter();
    maxLength;
    minrows;
    required;
    name;
    disabled;
    defaultControl;
    customFormat;
    formControlName = '';
    formGroup;
    iconAction;
    icon = '';
    dblClick;
    countDown;
    currentControl;
    count = 0;
    formControl = new FormControl();
    onChange = (...args) => { };
    onTouched = (...args) => { };
    constructor(el, controlContainer) {
        this.el = el;
        this.controlContainer = controlContainer;
    }
    ngAfterViewChecked() {
        if (this.controlContainer && this.el) {
            let fname = this.el.nativeElement.getAttribute('formControlName');
            fname = fname ? fname : this.el.nativeElement.getAttribute('ng-reflect-name');
            fname = fname ? fname : this.input.nativeElement.name;
            const fgroupDirective = this.controlContainer;
            if (fgroupDirective && fgroupDirective['form']) {
                this.currentControl = fgroupDirective['form'].controls[fname];
                if (this.currentControl) {
                    if (this.currentControl.validator) {
                        const validator = this.currentControl.validator({});
                        if (validator && validator['required']) {
                            this.required = true;
                        }
                    }
                }
            }
        }
    }
    ngOnInit() {
        if (this.defaultControl) {
            this.formControl = new FormControl(this.value);
            if (this.input) {
                this.input.nativeElement.formControl = this.formControl;
            }
        }
        if (this.controlContainer) {
            const form = this.controlContainer.control;
            const lbl = this.el.nativeElement.getAttribute('formControlName');
            if (form) {
                const control = form.controls[lbl ? lbl : this.formControlName];
            }
            /*control.valueChanges.subscribe(_=>{
              //this.value = _;
            });*/
        }
    }
    ngOnChanges(changes) {
        if (changes['value'] && changes['value'].currentValue) {
            this.count = this.value?.length || 0;
        }
    }
    change(newValue) {
        this.writeValue(newValue);
        // this.value = newValue;
        this.valueChange.emit(newValue);
    }
    changeTextAreaValue() {
        this.valueChange.emit(this.value);
    }
    writeValue(val) {
        this.value = val;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /* setDisabledState?(isDisabled: boolean): void {
       throw new Error("Method not implemented.");
     }*/
    iconClicked(item) {
        return this.iconAction ? this.iconAction(item) : null;
    }
    dblClicked(item) {
        return this.dblClick ? this.dblClick(item) : null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Textarea, deps: [{ token: i0.ElementRef }, { token: i1.ControlContainer, host: true, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: Textarea, isStandalone: true, selector: "dia-textarea", inputs: { label: "label", unit: "unit", placeholder: "placeholder", description: "description", value: "value", readonly: "readonly", innerHTML: "innerHTML", isTextArea: "isTextArea", maxLength: "maxLength", minrows: "minrows", required: "required", name: "name", disabled: "disabled", defaultControl: "defaultControl", customFormat: "customFormat", formControlName: "formControlName", formGroup: "formGroup", iconAction: "iconAction", icon: "icon", dblClick: "dblClick", countDown: "countDown" }, outputs: { valueChange: "valueChange" }, viewQueries: [{ propertyName: "input", first: true, predicate: ["textarea"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"zone-description\">\n    <!--div contenteditable=\"true\" #div [attr.placeholder]=\"placeholder\" [name]=\"label\" [ngModel]=\"value\" (ngModelChange)=\"change(div.innerText)\" ngDefaultControl>\n\t\t<ng-content></ng-content>\n  </div-->\n    <div *ngIf=\"!isTextArea && readonly\" contenteditable=\"false\" #div [attr.placeholder]=\"placeholder\" [name]=\"label\"\n        [innerHTML]=\"innerHTML\" [ngModel]=\"value\" (ngModelChange)=\"change(div.innerText)\" ngDefaultControl>\n        <mat-label *ngIf=\"label\">{{label}}</mat-label>\n        <ng-content></ng-content>\n    </div>\n    <div *ngIf=\"!isTextArea && !readonly\" contenteditable=\"true\" #div [attr.placeholder]=\"placeholder\" [name]=\"label\"\n        [innerHTML]=\"innerHTML\" [ngModel]=\"value\" (ngModelChange)=\"change(div.innerText)\" ngDefaultControl>\n        <mat-label *ngIf=\"label\">{{label}}</mat-label>\n        <ng-content></ng-content>\n    </div>\n    <div *ngIf=\"isTextArea && formGroup\" [formGroup]=\"formGroup\">\n        <mat-form-field *ngIf=\"isTextArea\" appearance=\"outline\">\n            <mat-label *ngIf=\"label\">{{label}}</mat-label>\n            <textarea matInput #textarea *ngIf=\"isTextArea\" [readonly]=\"readonly\" [attr.rows]=\"minrows\"\n                [attr.name]=\"name ? name : 'textarea'\" [attr.disabled]=\"disabled ? '' : null\"\n                [attr.maxLength]=\"maxLength\" [formControlName]=\"formControlName\" contenteditable=\"contenteditable\"\n                matInput [ngModel]=\"value\" (ngModelChange)=\"change($event)\" [name]=\"label\" [placeholder]=\"placeholder||''\"\n                (blur)=\"onTouched($event)\" cdkTextareaAutosize></textarea>\n        </mat-form-field>\n    </div>\n    <mat-form-field *ngIf=\"isTextArea && !formGroup\" appearance=\"outline\">\n        <mat-label *ngIf=\"label\">{{label}}</mat-label>\n        <textarea matInput #textarea *ngIf=\"isTextArea\" [readonly]=\"readonly\" [attr.rows]=\"minrows\"\n            [attr.name]=\"name ? name : 'textarea'\" [attr.disabled]=\"disabled ? '' : null\" [attr.maxLength]=\"maxLength\"\n            (blur)=\"onTouched($event)\" contenteditable=\"contenteditable\" matInput [ngModel]=\"value\"\n            (ngModelChange)=\"change($event)\" [name]=\"label\" [placeholder]=\"placeholder||''\" cdkTextareaAutosize></textarea>\n        <div class=\"countdown\" *ngIf=\"countDown\">{{count + '/' + maxLength}}</div>\n    </mat-form-field>\n    <div *ngIf=\"description\" class=\"description\" [innerHTML]=\"description\"></div>\n    <mat-icon *ngIf=\"icon\" matSuffix (click)=\"iconClicked($event)\" (dblclick)=\"dblClicked($event)\">{{ icon }}</mat-icon>\n    <span matSuffix *ngIf=\"unit\" class=\"input-unit\" align=\"end\">{{\n        unit\n        }}</span>\n</div>", styles: [":host{display:flex;align-items:center}:host textarea[contenteditable]{height:100px;width:224px;overflow:hidden;caret-color:gray}:host div[contenteditable]{padding:13px;width:224px;min-height:56px}:host [contenteditable=true]:empty:before{content:attr(placeholder);display:block;color:#939598}:host[label][label-on-left] label{margin-top:8px}\n"], dependencies: [{ kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i2.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "directive", type: i4$1.CdkTextareaAutosize, selector: "textarea[cdkTextareaAutosize]", inputs: ["cdkAutosizeMinRows", "cdkAutosizeMaxRows", "cdkTextareaAutosize", "placeholder"], exportAs: ["cdkTextareaAutosize"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i5$2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Textarea, decorators: [{
            type: Component,
            args: [{ selector: 'dia-textarea', imports: [MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, FormsModule, ReactiveFormsModule], template: "<div class=\"zone-description\">\n    <!--div contenteditable=\"true\" #div [attr.placeholder]=\"placeholder\" [name]=\"label\" [ngModel]=\"value\" (ngModelChange)=\"change(div.innerText)\" ngDefaultControl>\n\t\t<ng-content></ng-content>\n  </div-->\n    <div *ngIf=\"!isTextArea && readonly\" contenteditable=\"false\" #div [attr.placeholder]=\"placeholder\" [name]=\"label\"\n        [innerHTML]=\"innerHTML\" [ngModel]=\"value\" (ngModelChange)=\"change(div.innerText)\" ngDefaultControl>\n        <mat-label *ngIf=\"label\">{{label}}</mat-label>\n        <ng-content></ng-content>\n    </div>\n    <div *ngIf=\"!isTextArea && !readonly\" contenteditable=\"true\" #div [attr.placeholder]=\"placeholder\" [name]=\"label\"\n        [innerHTML]=\"innerHTML\" [ngModel]=\"value\" (ngModelChange)=\"change(div.innerText)\" ngDefaultControl>\n        <mat-label *ngIf=\"label\">{{label}}</mat-label>\n        <ng-content></ng-content>\n    </div>\n    <div *ngIf=\"isTextArea && formGroup\" [formGroup]=\"formGroup\">\n        <mat-form-field *ngIf=\"isTextArea\" appearance=\"outline\">\n            <mat-label *ngIf=\"label\">{{label}}</mat-label>\n            <textarea matInput #textarea *ngIf=\"isTextArea\" [readonly]=\"readonly\" [attr.rows]=\"minrows\"\n                [attr.name]=\"name ? name : 'textarea'\" [attr.disabled]=\"disabled ? '' : null\"\n                [attr.maxLength]=\"maxLength\" [formControlName]=\"formControlName\" contenteditable=\"contenteditable\"\n                matInput [ngModel]=\"value\" (ngModelChange)=\"change($event)\" [name]=\"label\" [placeholder]=\"placeholder||''\"\n                (blur)=\"onTouched($event)\" cdkTextareaAutosize></textarea>\n        </mat-form-field>\n    </div>\n    <mat-form-field *ngIf=\"isTextArea && !formGroup\" appearance=\"outline\">\n        <mat-label *ngIf=\"label\">{{label}}</mat-label>\n        <textarea matInput #textarea *ngIf=\"isTextArea\" [readonly]=\"readonly\" [attr.rows]=\"minrows\"\n            [attr.name]=\"name ? name : 'textarea'\" [attr.disabled]=\"disabled ? '' : null\" [attr.maxLength]=\"maxLength\"\n            (blur)=\"onTouched($event)\" contenteditable=\"contenteditable\" matInput [ngModel]=\"value\"\n            (ngModelChange)=\"change($event)\" [name]=\"label\" [placeholder]=\"placeholder||''\" cdkTextareaAutosize></textarea>\n        <div class=\"countdown\" *ngIf=\"countDown\">{{count + '/' + maxLength}}</div>\n    </mat-form-field>\n    <div *ngIf=\"description\" class=\"description\" [innerHTML]=\"description\"></div>\n    <mat-icon *ngIf=\"icon\" matSuffix (click)=\"iconClicked($event)\" (dblclick)=\"dblClicked($event)\">{{ icon }}</mat-icon>\n    <span matSuffix *ngIf=\"unit\" class=\"input-unit\" align=\"end\">{{\n        unit\n        }}</span>\n</div>", styles: [":host{display:flex;align-items:center}:host textarea[contenteditable]{height:100px;width:224px;overflow:hidden;caret-color:gray}:host div[contenteditable]{padding:13px;width:224px;min-height:56px}:host [contenteditable=true]:empty:before{content:attr(placeholder);display:block;color:#939598}:host[label][label-on-left] label{margin-top:8px}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.ControlContainer, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }, {
                    type: SkipSelf
                }] }], propDecorators: { input: [{
                type: ViewChild,
                args: ['textarea', { static: false }]
            }], label: [{
                type: Input
            }], unit: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], description: [{
                type: Input
            }], value: [{
                type: Input
            }], readonly: [{
                type: Input
            }], innerHTML: [{
                type: Input
            }], isTextArea: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], maxLength: [{
                type: Input
            }], minrows: [{
                type: Input
            }], required: [{
                type: Input
            }], name: [{
                type: Input
            }], disabled: [{
                type: Input
            }], defaultControl: [{
                type: Input
            }], customFormat: [{
                type: Input
            }], formControlName: [{
                type: Input
            }], formGroup: [{
                type: Input
            }], iconAction: [{
                type: Input
            }], icon: [{
                type: Input
            }], dblClick: [{
                type: Input
            }], countDown: [{
                type: Input
            }] } });

class DossierBloc {
    amountFormat;
    disabled = false;
    modifiable = false;
    translateSuffix = '';
    nbColumns = 2;
    items = [];
    ratifiable;
    minrows = 2;
    transServ;
    debug = false;
    emptyfn = () => { };
    constructor() {
        //this.transServ = new Translate();
    }
    ngOnChanges(changes) {
        if (changes['items'] && changes['items'].currentValue) {
            if (this.items) {
                //this.transServ.get(this.translateSuffix + 'SIREN').subscribe((t:any) => {
                this.items.forEach(it => {
                    //it = this.translator(it);
                    let sum_sizeColumn = 0;
                    if (this.nbColumns && this.nbColumns > 0 && it.list) {
                        it.list = it.list.filter(entity => entity.hide !== true);
                        // fix JIRA 1060
                        it.list.map(res => {
                            if (res.sizeColumn && res.sizeColumn > 1) {
                                sum_sizeColumn = sum_sizeColumn + res.sizeColumn - 1;
                            }
                        });
                        while ((it.list.length + sum_sizeColumn) % this.nbColumns !== 0) {
                            it.list.push(Dossier.getEmptyDossier());
                        }
                        // fix JIRA 1060
                        let index_column = 0;
                        it.list.map(res => {
                            if (res.sizeColumn && res.sizeColumn > 1) {
                                index_column = index_column + 1 + res.sizeColumn - 1;
                            }
                            else {
                                index_column = index_column + 1;
                            }
                            res.indexColumn = index_column;
                        });
                    }
                    if (it.list) {
                        it.list.forEach(item => (item = this.translator(item)));
                    }
                });
                //});
            }
        }
    }
    translateTitle(it) {
        if (it &&
            Dossier.isDefined(this.getIntName(it)) &&
            this.translateSuffix && this.transServ &&
            this.transServ.instant(this.getIntName(it)) &&
            this.getIntName(it) !==
                this.transServ.instant(this.getIntName(it))) {
            return this.transServ.instant(this.getIntName(it));
        }
        return it;
    }
    translator(it) {
        if (it.title &&
            Dossier.isDefined(this.getIntName(it.title)) &&
            this.translateSuffix && this.transServ &&
            this.transServ.instant(this.getIntName(it.title)) &&
            this.getIntName(it.title) !==
                this.transServ.instant(this.getIntName(it.title))) {
            it.title = this.transServ.instant(this.getIntName(it.title));
        }
        return it;
    }
    mapTimestampToDate(timestamp) {
        if (timestamp) {
            const dateObject = new Date(+timestamp);
            return ((dateObject.getDate() < 10
                ? '0' + dateObject.getDate()
                : dateObject.getDate()) +
                '/' +
                (dateObject.getMonth() + 1 < 10
                    ? '0' + (dateObject.getMonth() + 1)
                    : dateObject.getMonth() + 1) +
                '/' +
                (dateObject.getFullYear() + '').slice(-2));
        }
        return null;
    }
    ngOnInit() { }
    getIntName(str) {
        return (this.translateSuffix +
            str
                .split(' ')
                .filter(s => s.length > 2)
                .join()
                //    .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9]+/g, '')
                .toUpperCase());
    }
    onclick(item) {
        if (item.onclick) {
            item.onclick(item);
        }
    }
    handleChange(e, item) {
        if (item.model && item.field) {
            item.model[item.field] = e;
        }
        if (item.onchange) {
            item.onchange(e);
        }
    }
    handleValue(item) {
        if (item) {
            if (item.model && item.field && item.model[item.field]) {
                return item.model[item.field];
            }
            else {
                return item.value;
            }
        }
    }
    handleSelectValue(item) {
        if (!item || !item.value)
            return null;
        // If item.value is already a ModelOption, return it
        if (typeof item.value === 'object' && item.value !== null && 'libelle' in item.value && 'value' in item.value) {
            return item.value;
        }
        // Convert string/number to ModelOption
        const valueStr = String(item.value);
        return new ModelOption(valueStr, valueStr);
    }
    handleFormattedValue(item) {
        if (!item || !item.value)
            return '';
        if (item.suffix) {
            return this.amountFormat?.transform(item.value).concat(' ' + item.suffix);
        }
        else if (item.isNumber) {
            return this.amountFormat?.transform(item.value);
        }
        else if (item.isDate) {
            return this.mapTimestampToDate(+item.value) || '';
        }
        else {
            return String(item.value);
        }
    }
    handleDateValue(item) {
        if (!item || !item.value)
            return undefined;
        if (typeof item.value === 'number') {
            return new Date(item.value);
        }
        else if (typeof item.value === 'string') {
            const parsed = new Date(item.value);
            return isNaN(parsed.getTime()) ? undefined : parsed;
        }
        return undefined;
    }
    fgroup() {
        return new FormGroup({});
    }
    handleIndeterminate(item, v) {
        return false;
    }
    handleCheckedChange(checked, item) {
        /* if (item.possibleValues){
             item.checkboxValues = item.possibleValues.filter(v=>v.value).map(v=>v.libelle);
             item.model[item.field] = item.possibleValues.filter(v=>v.value).map(v=>v.libelle);
         }else */
        item.value = checked;
        if (item.model && item.field) {
            item.model[item.field] = checked;
        }
        if (item.onchange) {
            item.onchange(checked);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: DossierBloc, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: DossierBloc, isStandalone: true, selector: "dia-dossier", inputs: { disabled: "disabled", modifiable: "modifiable", translateSuffix: "translateSuffix", nbColumns: "nbColumns", items: "items", ratifiable: "ratifiable", minrows: "minrows", transServ: "transServ", debug: "debug" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                multi: true,
                useExisting: forwardRef(() => DossierBloc)
            }
        ], usesOnChanges: true, ngImport: i0, template: "<div class=\"dossierBloc container\">\n    <!--div-- class=\"forMobileScroll\"></!--div-->\n    <div class=\"content-detail\" *ngFor=\"let bloc of items; let last = last; \">\n        <div class=\"innerContent\">\n            <div class=\"templateTable\" *ngIf=\"bloc.custom && !bloc.hide\">\n                <p class=\"title\">{{bloc.title}}</p>\n                <div *ngIf=\"!bloc.custom else custom\"></div>\n            </div>\n            <div class=\"templateField \" *ngIf=\"!bloc.custom\">\n                <p class=\"title\">{{bloc.title}} </p>\n                <div class=\"fieldContainer {{bloc?.className}}\">\n                    <ng-container *ngFor=\"let item of bloc.list; let i = index\">\n                        @if (debug) {\n                        {{item|json }}\n\n                        }\n                        <!-- JIRA 924 - JIRA 1060 -->\n                        <div class=\"content col{{ item.sizeColumn }} {{item.className}}\"\n                            [ngClass]=\"{isRatifView: ratifiable}\" [matTooltip]=\"item.tooltip\"\n                            [matTooltipPosition]=\"'left'\">\n                            <mat-form-field (click)=\"onclick(item)\" *ngIf=\"!item.hide && !modifiable\"\n                                class=\"example-full-width\"\n                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick}\">\n                                <!--mat-label *ngIf=\"item.tooltip\" >{{item.title}}</mat-label-->\n                                <textarea *ngIf=\"item.value\" disabled=\"disabled\" matInput [placeholder]=\"item.title||''\"\n                                    [ngModel]=\"handleFormattedValue(item)\" cdkTextareaAutosize></textarea>\n                                <textarea *ngIf=\"!item.value\" disabled=\"disabled\" matInput\n                                    [placeholder]=\"item.title||''\" [ngModel]=\"'--'\" cdkTextareaAutosize></textarea>\n                            </mat-form-field>\n                            <div *ngIf=\"!item.hide\">\n                                <div class=\"modifiable\"\n                                    *ngIf=\"modifiable && !item.isDate && !item.custom && !item.isRadio && !item.isCheckbox &&  !item.selectValues && !item.advancedCustoms && !item.isTextarea\"\n                                    (click)=\"onclick(item)\">\n                                    <dia-input *ngIf=\"!item.formGroupConfig\" [icon]=\"item.icon\" appIsNumeric\n                                        [disable]=\"!item.isNumber\" [isDecimal]=\"item.isDecimal\"\n                                        [iconAction]=\"item.iconAction\" (valueChange)=\"handleChange($event, item)\"\n                                        [visualHelpDisabled]=\"item.disableVisualHelp\" [maxLength]=\"item.maxLength\"\n                                        [minLength]=\"item.minLength\" [required]=\"item.required\"\n                                        [customFormat]=\"item.customFormat\" [readonly]=\"item.disabled\"\n                                        [placeholder]=\"item.title\" [value]=\"handleValue(item)\"\n                                        (valueChange)=\"handleChange($event, item)\"\n                                        [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"\n                                        [type]=\"item.type\"></dia-input>\n                                    <div class=\"modifiable\" *ngIf=\"item.formGroupConfig\">\n                                        <form [formGroup]=\"item.formGroupConfig.form\">\n                                            <!--{{item.formGroupConfig.form.con trols[item.formGroupConfig.formName].errors|json}}-->\n                                            <dia-input [readonly]=\"item.disabled\" appIsNumeric\n                                                [disable]=\"!item.isNumber\" [isDecimal]=\"item.isDecimal\"\n                                                [icon]=\"item.icon\" [iconAction]=\"item.iconAction\"\n                                                (valueChange)=\"handleChange($event, item)\"\n                                                [visualHelpDisabled]=\"item.disableVisualHelp\"\n                                                [customFormat]=\"item.customFormat\" [maxLength]=\"item.maxLength\"\n                                                [minLength]=\"item.minLength\" [placeholder]=\"item.title\"\n                                                [name]=\"item?.formGroupConfig?.formName\"\n                                                formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                [value]=\"handleValue(item)\" (valueChange)=\"handleChange($event, item)\"\n                                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"\n                                                [type]=\"item.type\"></dia-input>\n                                            <mat-error *ngIf=\"item.getErrorMsg\">\n                                                {{ item.getErrorMsg(item)}}\n                                            </mat-error>\n                                        </form>\n                                    </div>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"(modifiable || item.modifiable) && item.isTextarea\"\n                                    (click)=\"onclick(item)\">\n                                    <dia-textarea *ngIf=\"!item.formGroupConfig\" [icon]=\"item?.icon||''\"\n                                        [countDown]=\"item.countDown\" appIsNumeric [disabled]=\"!item.isNumber\"\n                                        [iconAction]=\"item.iconAction|| emptyfn\"\n                                        (valueChange)=\"handleChange($event, item)\" [maxLength]=\"item.maxLength\"\n                                        [required]=\"item.required\" [customFormat]=\"item.customFormat\"\n                                        [readonly]=\"item.disabled\"\n                                        [placeholder]=\"item.placeholder? item.placeholder: item.title\"\n                                        [value]=\"handleValue(item)\" (valueChange)=\"handleChange($event, item)\"\n                                        [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled, fill:item.fill}\"\n                                        class=\"{{item.customClass}}\" [minrows]=\"minrows\"></dia-textarea>\n                                    <div class=\"modifiable\" *ngIf=\"item.formGroupConfig\">\n                                        <form [formGroup]=\"item.formGroupConfig.form\">\n                                            <!--{{item.formGroupConfig.form.con trols[item.formGroupConfig.formName].errors|json}}-->\n                                            <dia-textarea [readonly]=\"item.disabled\"  [countDown]=\"item.countDown\"\n                                                [icon]=\"item.icon||''\" [iconAction]=\"item.iconAction|| emptyfn\"\n                                                [customFormat]=\"item.customFormat\" [maxLength]=\"item.maxLength\"\n                                                [placeholder]=\"item.placeholder? item.placeholder: item.title\"\n                                                [name]=\"item?.formGroupConfig?.formName\"\n                                                formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                [value]=\"handleValue(item)\" (valueChange)=\"handleChange($event, item)\"\n                                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled, fill:item.fill}\"\n                                                class=\"{{item.customClass}}\" [minrows]=\"minrows\"></dia-textarea>\n                                            <mat-error *ngIf=\"item.getErrorMsg\">\n                                                {{ item.getErrorMsg(item)}}\n                                            </mat-error>\n                                        </form>\n                                    </div>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"modifiable && item.isDate\" (click)=\"onclick(item)\">\n                                    <dia-input-date-picker *ngIf=\"!item.formGroupConfig\"\n                                        [required]=\"item.required||false\" [placeholder]=\"item.title||''\"\n                                        [date]=\"handleDateValue(item)\" (dateChange)=\"handleChange($event, item)\"\n                                        [minDate]=\"item.minDate\" [maxDate]=\"item.maxDate\"\n                                        [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"></dia-input-date-picker>\n                                    <div class=\"modifiable\" *ngIf=\"item.formGroupConfig\">\n                                        <form [formGroup]=\"item.formGroupConfig.form\">\n                                            <dia-input-date-picker [label]=\"item.title||''\"\n                                                [required]=\"item.required||false\" [minDate]=\"item.minDate\"\n                                                [maxDate]=\"item.maxDate\"\n                                                formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                [date]=\"handleDateValue(item)\" (dateChange)=\"handleChange($event, item)\"\n                                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"></dia-input-date-picker>\n                                        </form>\n                                    </div>\n                                    <mat-error *ngIf=\"item.getErrorMsg\">\n                                        {{ item.getErrorMsg(item)}}\n                                    </mat-error>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"modifiable && item.selectValues\" (click)=\"onclick(item)\">\n                                    <dia-select *ngIf=\"!item.formGroupConfig\" [required]=\"item.required||false\"\n                                        [placeholder]=\"item.title\" [list]=\"item.selectValues\"\n                                        [value]=\"handleSelectValue(item)\" (valueChange)=\"handleChange($event, item)\"\n                                        [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"></dia-select>\n                                    <div class=\"modifiable\" *ngIf=\"item.formGroupConfig\">\n                                        <form [formGroup]=\"item.formGroupConfig.form\">\n                                            <dia-select [label]=\"item.title\" [required]=\"item.required||false\"\n                                                (valueChange)=\"handleChange($event, item)\" [list]=\"item.selectValues\"\n                                                [value]=\"handleSelectValue(item)\"\n                                                formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"></dia-select>\n                                        </form>\n                                    </div>\n                                    <mat-error *ngIf=\"item.getErrorMsg\">\n                                        {{ item.getErrorMsg(item)}}\n                                    </mat-error>\n                                </div>\n                                <div class=\"modifiable radio Margin1em\"\n                                    *ngIf=\"modifiable && item.isRadio && item.formGroupConfig?.form\"\n                                    (click)=\"onclick(item)\">\n                                    <form [formGroup]=\"item.formGroupConfig?.form||fgroup()\" class=\"radioBlock\">\n                                        <div class=\"radioLbl\">\n                                            <mat-label>{{item.title}}</mat-label><mat-label *ngIf=\"item.required\">*\n                                            </mat-label>:\n                                        </div>\n                                        <div\n                                            class=\"radioChoices {{item.disabled?'radioBoxDisabled':'radioBoxEnabled'}}\">\n                                            <div class=\"choice\" *ngFor=\"let v of item.possibleValues; let i = index\">\n                                                <input type=\"radio\"\n                                                    class=\" inputRadio {{item.disabled?'radioDisabled':'radioLbl'}}\"\n                                                    [value]=\"v.value\" [name]=\"item?.formGroupConfig?.formName || ''\"\n                                                    formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                    value=\"v.libelle\" [disabled]=\"item.disabled||false\" />\n                                                <mat-label\n                                                    class=\"ecD-form-label-radio {{item.disabled?'radioDisabled':'radioLbl'}}\">{{v.libelle}}</mat-label>\n                                            </div>\n                                        </div>\n                                    </form>\n                                    <mat-error *ngIf=\"item.getErrorMsg\">\n                                        {{ item.getErrorMsg(item)}}\n                                    </mat-error>\n                                </div>\n                                <div class=\"modifiable checkbox Margin1em\"\n                                    *ngIf=\"modifiable && item.isCheckbox && item.formGroupConfig?.form\"\n                                    (click)=\"onclick(item)\">\n                                    <form [formGroup]=\"item.formGroupConfig?.form||fgroup()\" class=\"checkBoxBlock\">\n                                        <div\n                                            class=\"checkBoxChoices {{item.disabled?'checkBoxBoxDisabled':'checkBoxBoxEnabled'}}\">\n                                                <mat-checkbox class=\"inputCheckbox\" [checked]=\"item.value\"\n                                                    [indeterminate]=\"handleIndeterminate(item)\"\n                                                    (change)=\"handleCheckedChange($event.checked, item)\"\n                                                    formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                    [disabled]=\"item.disabled||false\">\n                                                    {{item.title}}\n                                                </mat-checkbox>\n                                                \n                                        </div>\n                                    </form>\n                                    <mat-error *ngIf=\"item.getErrorMsg\">\n                                        {{ item.getErrorMsg(item)}}\n                                    </mat-error>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"modifiable && item.custom\" (click)=\"onclick(item)\">\n                                    <div *ngIf=\"!item.custom else custom\"></div>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"item.advancedCustoms\" (click)=\"onclick(item)\">\n                                    <ng-container #advancedCustom *ngFor=\"let custom of item.advancedCustoms\">\n                                        <div class=\"containerAdvanced\"><!-- (click)=\"advancedClicked(custom)\" -->\n                                            <ng-container\n                                                *ngTemplateOutlet=\"custom.template; context: {$implicit: custom.context}\"></ng-container>\n                                        </div>\n                                    </ng-container>\n                                </div>\n                            </div>\n                        </div>\n                        <!-- JIRA 1060 -->\n                        <div class=\"returnLine\"\n                            *ngIf=\"nbColumns && item.indexColumn && item.indexColumn % nbColumns === 0\"></div>\n                    </ng-container>\n                </div>\n                <p *ngIf=\"!last && !bloc?.noLine\" class=\"content-detail-line\"></p>\n            </div>\n        </div>\n    </div>\n</div>\n<ng-template #custom> <ng-content></ng-content> </ng-template>", styles: [".mat-form-field{width:auto}.radioBlock{display:flex;flex-direction:column}.radioLbl{font-size:12px;margin:10px 1em;color:gray}.radioLbl mat-label{font-size:12px}.radioChoices{display:flex}.radioChoices .choice{display:flex;align-items:center;margin-right:1em}.radioMateriel{position:relative;top:-13px}.radioMargin1em{margin:1em}.radioDisabled,.radioBoxDisabled{cursor:not-allowed}@media only screen and (max-width: 800px){.container{position:relative}.container .forMobileScroll{position:absolute;width:100%;height:100%;z-index:1}.container .linkField{z-index:2}}.container{position:relative;display:flex;justify-content:space-around;flex-direction:column;flex-wrap:wrap;border-radius:25px;padding:1rem}.container .content-detail .title{font-weight:700}.container .content-detail .content-detail-line{width:100%;margin:auto;height:1px}.container :ng-deep .fill{width:100%}.container :ng-deep .fill mat-form-field{width:100%}.container :ng-deep .fill textarea{width:100%}.returnLine{width:100%}.fieldContainer{display:flex;flex-direction:row;justify-content:space-around;flex-wrap:wrap;flex:auto}.fieldContainer .content{touch-action:auto!important;-webkit-user-select:auto!important;user-select:auto!important;-webkit-user-drag:auto!important;flex:1 0 auto}.fieldContainer .col4{flex-grow:4}.fieldContainer .col4 mat-form-field{width:720px}.fieldContainer .col3{flex-grow:3}.fieldContainer .col3 mat-form-field{width:540px}.fieldContainer .col2{flex-grow:2}.fieldContainer .col2 mat-form-field{width:360px}@media only screen and (max-width: 1200px){.fieldContainer .isRatifView.col4 mat-form-field{width:540px}}@media only screen and (max-width: 1000px){.fieldContainer .col4 mat-form-field{width:540px}.fieldContainer .isRatifView.col4 mat-form-field{width:360px}}@media only screen and (max-width: 800px){:is(.fieldContainer .col3,.fieldContainer .col4) mat-form-field{width:360px}:is(.fieldContainer .isRatifView.col3,.fieldContainer .ratifSize.col4) mat-form-field{width:auto}}@media only screen and (max-width: 600px){:is(.fieldContainer .col2,.fieldContainer .col3,.fieldContainer .col4) mat-form-field{width:auto}}textarea{overflow:hidden!important}.emptyField{visibility:hidden}.linkField,.linkField textarea{cursor:pointer;text-decoration:underline}:is() .table-container{background-color:transparent}:is() .table-container .table-content .mat-table tr.mat-header-row th.mat-header-cell .mat-sort-header-container .mat-sort-header-arrow{display:none;position:absolute}@media print{.container{border:solid 1px gray}}\n"], dependencies: [{ kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i2.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "directive", type: i4$1.CdkTextareaAutosize, selector: "textarea[cdkTextareaAutosize]", inputs: ["cdkAutosizeMinRows", "cdkAutosizeMaxRows", "cdkTextareaAutosize", "placeholder"], exportAs: ["cdkTextareaAutosize"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: MatTooltipModule }, { kind: "directive", type: i5$1.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "component", type: Inputs, selector: "dia-input", inputs: ["displayAsLabel", "label", "required", "format", "placeholder", "hidden", "description", "disabled", "isDatePicker", "readonlyInput", "readonly", "type", "min", "max", "minDate", "maxDate", "maxLength", "minLength", "unit", "name", "cancellable", "searching", "value", "customFormat", "icon", "errorMsg", "isError", "defaultControl", "matDatepicker", "visualHelpDisabled", "isDateControl", "formControl", "iconAction"], outputs: ["valueChange", "cancelValue", "dateChange", "iconWasClicked", "wasDblClicked"] }, { kind: "component", type: Select, selector: "dia-select", inputs: ["value", "required", "defaultValue", "fixPlaceholder", "values", "forced", "list", "placeholder", "disablePlaceHolder", "label", "description", "multiple", "defaultSort", "selectedValue", "disabled", "direction", "preset", "tooltip", "autoClosedAfter", "translate"], outputs: ["valueChange", "valuesChange", "beenForced"] }, { kind: "directive", type: IsNumericDirective, selector: "[appIsNumeric]", inputs: ["isDecimal", "disable", "appIsNumeric"] }, { kind: "component", type: Textarea, selector: "dia-textarea", inputs: ["label", "unit", "placeholder", "description", "value", "readonly", "innerHTML", "isTextArea", "maxLength", "minrows", "required", "name", "disabled", "defaultControl", "customFormat", "formControlName", "formGroup", "iconAction", "icon", "dblClick", "countDown"], outputs: ["valueChange"] }, { kind: "component", type: InputDatePicker, selector: "dia-input-date-picker", inputs: ["label", "customDatePicker", "placeholder", "minDate", "maxDate", "value", "required", "date", "disabled"], outputs: ["dateChange", "valueChange"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i7.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "pipe", type: i5.JsonPipe, name: "json" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: DossierBloc, decorators: [{
            type: Component,
            args: [{ selector: 'dia-dossier', standalone: true, imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule, MatTooltipModule, Inputs, Select, IsNumericDirective, Textarea, InputDatePicker, MatCheckboxModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(() => DossierBloc)
                        }
                    ], template: "<div class=\"dossierBloc container\">\n    <!--div-- class=\"forMobileScroll\"></!--div-->\n    <div class=\"content-detail\" *ngFor=\"let bloc of items; let last = last; \">\n        <div class=\"innerContent\">\n            <div class=\"templateTable\" *ngIf=\"bloc.custom && !bloc.hide\">\n                <p class=\"title\">{{bloc.title}}</p>\n                <div *ngIf=\"!bloc.custom else custom\"></div>\n            </div>\n            <div class=\"templateField \" *ngIf=\"!bloc.custom\">\n                <p class=\"title\">{{bloc.title}} </p>\n                <div class=\"fieldContainer {{bloc?.className}}\">\n                    <ng-container *ngFor=\"let item of bloc.list; let i = index\">\n                        @if (debug) {\n                        {{item|json }}\n\n                        }\n                        <!-- JIRA 924 - JIRA 1060 -->\n                        <div class=\"content col{{ item.sizeColumn }} {{item.className}}\"\n                            [ngClass]=\"{isRatifView: ratifiable}\" [matTooltip]=\"item.tooltip\"\n                            [matTooltipPosition]=\"'left'\">\n                            <mat-form-field (click)=\"onclick(item)\" *ngIf=\"!item.hide && !modifiable\"\n                                class=\"example-full-width\"\n                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick}\">\n                                <!--mat-label *ngIf=\"item.tooltip\" >{{item.title}}</mat-label-->\n                                <textarea *ngIf=\"item.value\" disabled=\"disabled\" matInput [placeholder]=\"item.title||''\"\n                                    [ngModel]=\"handleFormattedValue(item)\" cdkTextareaAutosize></textarea>\n                                <textarea *ngIf=\"!item.value\" disabled=\"disabled\" matInput\n                                    [placeholder]=\"item.title||''\" [ngModel]=\"'--'\" cdkTextareaAutosize></textarea>\n                            </mat-form-field>\n                            <div *ngIf=\"!item.hide\">\n                                <div class=\"modifiable\"\n                                    *ngIf=\"modifiable && !item.isDate && !item.custom && !item.isRadio && !item.isCheckbox &&  !item.selectValues && !item.advancedCustoms && !item.isTextarea\"\n                                    (click)=\"onclick(item)\">\n                                    <dia-input *ngIf=\"!item.formGroupConfig\" [icon]=\"item.icon\" appIsNumeric\n                                        [disable]=\"!item.isNumber\" [isDecimal]=\"item.isDecimal\"\n                                        [iconAction]=\"item.iconAction\" (valueChange)=\"handleChange($event, item)\"\n                                        [visualHelpDisabled]=\"item.disableVisualHelp\" [maxLength]=\"item.maxLength\"\n                                        [minLength]=\"item.minLength\" [required]=\"item.required\"\n                                        [customFormat]=\"item.customFormat\" [readonly]=\"item.disabled\"\n                                        [placeholder]=\"item.title\" [value]=\"handleValue(item)\"\n                                        (valueChange)=\"handleChange($event, item)\"\n                                        [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"\n                                        [type]=\"item.type\"></dia-input>\n                                    <div class=\"modifiable\" *ngIf=\"item.formGroupConfig\">\n                                        <form [formGroup]=\"item.formGroupConfig.form\">\n                                            <!--{{item.formGroupConfig.form.con trols[item.formGroupConfig.formName].errors|json}}-->\n                                            <dia-input [readonly]=\"item.disabled\" appIsNumeric\n                                                [disable]=\"!item.isNumber\" [isDecimal]=\"item.isDecimal\"\n                                                [icon]=\"item.icon\" [iconAction]=\"item.iconAction\"\n                                                (valueChange)=\"handleChange($event, item)\"\n                                                [visualHelpDisabled]=\"item.disableVisualHelp\"\n                                                [customFormat]=\"item.customFormat\" [maxLength]=\"item.maxLength\"\n                                                [minLength]=\"item.minLength\" [placeholder]=\"item.title\"\n                                                [name]=\"item?.formGroupConfig?.formName\"\n                                                formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                [value]=\"handleValue(item)\" (valueChange)=\"handleChange($event, item)\"\n                                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"\n                                                [type]=\"item.type\"></dia-input>\n                                            <mat-error *ngIf=\"item.getErrorMsg\">\n                                                {{ item.getErrorMsg(item)}}\n                                            </mat-error>\n                                        </form>\n                                    </div>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"(modifiable || item.modifiable) && item.isTextarea\"\n                                    (click)=\"onclick(item)\">\n                                    <dia-textarea *ngIf=\"!item.formGroupConfig\" [icon]=\"item?.icon||''\"\n                                        [countDown]=\"item.countDown\" appIsNumeric [disabled]=\"!item.isNumber\"\n                                        [iconAction]=\"item.iconAction|| emptyfn\"\n                                        (valueChange)=\"handleChange($event, item)\" [maxLength]=\"item.maxLength\"\n                                        [required]=\"item.required\" [customFormat]=\"item.customFormat\"\n                                        [readonly]=\"item.disabled\"\n                                        [placeholder]=\"item.placeholder? item.placeholder: item.title\"\n                                        [value]=\"handleValue(item)\" (valueChange)=\"handleChange($event, item)\"\n                                        [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled, fill:item.fill}\"\n                                        class=\"{{item.customClass}}\" [minrows]=\"minrows\"></dia-textarea>\n                                    <div class=\"modifiable\" *ngIf=\"item.formGroupConfig\">\n                                        <form [formGroup]=\"item.formGroupConfig.form\">\n                                            <!--{{item.formGroupConfig.form.con trols[item.formGroupConfig.formName].errors|json}}-->\n                                            <dia-textarea [readonly]=\"item.disabled\"  [countDown]=\"item.countDown\"\n                                                [icon]=\"item.icon||''\" [iconAction]=\"item.iconAction|| emptyfn\"\n                                                [customFormat]=\"item.customFormat\" [maxLength]=\"item.maxLength\"\n                                                [placeholder]=\"item.placeholder? item.placeholder: item.title\"\n                                                [name]=\"item?.formGroupConfig?.formName\"\n                                                formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                [value]=\"handleValue(item)\" (valueChange)=\"handleChange($event, item)\"\n                                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled, fill:item.fill}\"\n                                                class=\"{{item.customClass}}\" [minrows]=\"minrows\"></dia-textarea>\n                                            <mat-error *ngIf=\"item.getErrorMsg\">\n                                                {{ item.getErrorMsg(item)}}\n                                            </mat-error>\n                                        </form>\n                                    </div>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"modifiable && item.isDate\" (click)=\"onclick(item)\">\n                                    <dia-input-date-picker *ngIf=\"!item.formGroupConfig\"\n                                        [required]=\"item.required||false\" [placeholder]=\"item.title||''\"\n                                        [date]=\"handleDateValue(item)\" (dateChange)=\"handleChange($event, item)\"\n                                        [minDate]=\"item.minDate\" [maxDate]=\"item.maxDate\"\n                                        [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"></dia-input-date-picker>\n                                    <div class=\"modifiable\" *ngIf=\"item.formGroupConfig\">\n                                        <form [formGroup]=\"item.formGroupConfig.form\">\n                                            <dia-input-date-picker [label]=\"item.title||''\"\n                                                [required]=\"item.required||false\" [minDate]=\"item.minDate\"\n                                                [maxDate]=\"item.maxDate\"\n                                                formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                [date]=\"handleDateValue(item)\" (dateChange)=\"handleChange($event, item)\"\n                                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"></dia-input-date-picker>\n                                        </form>\n                                    </div>\n                                    <mat-error *ngIf=\"item.getErrorMsg\">\n                                        {{ item.getErrorMsg(item)}}\n                                    </mat-error>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"modifiable && item.selectValues\" (click)=\"onclick(item)\">\n                                    <dia-select *ngIf=\"!item.formGroupConfig\" [required]=\"item.required||false\"\n                                        [placeholder]=\"item.title\" [list]=\"item.selectValues\"\n                                        [value]=\"handleSelectValue(item)\" (valueChange)=\"handleChange($event, item)\"\n                                        [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"></dia-select>\n                                    <div class=\"modifiable\" *ngIf=\"item.formGroupConfig\">\n                                        <form [formGroup]=\"item.formGroupConfig.form\">\n                                            <dia-select [label]=\"item.title\" [required]=\"item.required||false\"\n                                                (valueChange)=\"handleChange($event, item)\" [list]=\"item.selectValues\"\n                                                [value]=\"handleSelectValue(item)\"\n                                                formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                [ngClass]=\"{emptyField: (item.title && item.title.indexOf('####')>-1), linkField: item.linkParam||item.onclick, disabled:item.disabled}\"></dia-select>\n                                        </form>\n                                    </div>\n                                    <mat-error *ngIf=\"item.getErrorMsg\">\n                                        {{ item.getErrorMsg(item)}}\n                                    </mat-error>\n                                </div>\n                                <div class=\"modifiable radio Margin1em\"\n                                    *ngIf=\"modifiable && item.isRadio && item.formGroupConfig?.form\"\n                                    (click)=\"onclick(item)\">\n                                    <form [formGroup]=\"item.formGroupConfig?.form||fgroup()\" class=\"radioBlock\">\n                                        <div class=\"radioLbl\">\n                                            <mat-label>{{item.title}}</mat-label><mat-label *ngIf=\"item.required\">*\n                                            </mat-label>:\n                                        </div>\n                                        <div\n                                            class=\"radioChoices {{item.disabled?'radioBoxDisabled':'radioBoxEnabled'}}\">\n                                            <div class=\"choice\" *ngFor=\"let v of item.possibleValues; let i = index\">\n                                                <input type=\"radio\"\n                                                    class=\" inputRadio {{item.disabled?'radioDisabled':'radioLbl'}}\"\n                                                    [value]=\"v.value\" [name]=\"item?.formGroupConfig?.formName || ''\"\n                                                    formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                    value=\"v.libelle\" [disabled]=\"item.disabled||false\" />\n                                                <mat-label\n                                                    class=\"ecD-form-label-radio {{item.disabled?'radioDisabled':'radioLbl'}}\">{{v.libelle}}</mat-label>\n                                            </div>\n                                        </div>\n                                    </form>\n                                    <mat-error *ngIf=\"item.getErrorMsg\">\n                                        {{ item.getErrorMsg(item)}}\n                                    </mat-error>\n                                </div>\n                                <div class=\"modifiable checkbox Margin1em\"\n                                    *ngIf=\"modifiable && item.isCheckbox && item.formGroupConfig?.form\"\n                                    (click)=\"onclick(item)\">\n                                    <form [formGroup]=\"item.formGroupConfig?.form||fgroup()\" class=\"checkBoxBlock\">\n                                        <div\n                                            class=\"checkBoxChoices {{item.disabled?'checkBoxBoxDisabled':'checkBoxBoxEnabled'}}\">\n                                                <mat-checkbox class=\"inputCheckbox\" [checked]=\"item.value\"\n                                                    [indeterminate]=\"handleIndeterminate(item)\"\n                                                    (change)=\"handleCheckedChange($event.checked, item)\"\n                                                    formControlName=\"{{item?.formGroupConfig?.formName}}\"\n                                                    [disabled]=\"item.disabled||false\">\n                                                    {{item.title}}\n                                                </mat-checkbox>\n                                                \n                                        </div>\n                                    </form>\n                                    <mat-error *ngIf=\"item.getErrorMsg\">\n                                        {{ item.getErrorMsg(item)}}\n                                    </mat-error>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"modifiable && item.custom\" (click)=\"onclick(item)\">\n                                    <div *ngIf=\"!item.custom else custom\"></div>\n                                </div>\n                                <div class=\"modifiable\" *ngIf=\"item.advancedCustoms\" (click)=\"onclick(item)\">\n                                    <ng-container #advancedCustom *ngFor=\"let custom of item.advancedCustoms\">\n                                        <div class=\"containerAdvanced\"><!-- (click)=\"advancedClicked(custom)\" -->\n                                            <ng-container\n                                                *ngTemplateOutlet=\"custom.template; context: {$implicit: custom.context}\"></ng-container>\n                                        </div>\n                                    </ng-container>\n                                </div>\n                            </div>\n                        </div>\n                        <!-- JIRA 1060 -->\n                        <div class=\"returnLine\"\n                            *ngIf=\"nbColumns && item.indexColumn && item.indexColumn % nbColumns === 0\"></div>\n                    </ng-container>\n                </div>\n                <p *ngIf=\"!last && !bloc?.noLine\" class=\"content-detail-line\"></p>\n            </div>\n        </div>\n    </div>\n</div>\n<ng-template #custom> <ng-content></ng-content> </ng-template>", styles: [".mat-form-field{width:auto}.radioBlock{display:flex;flex-direction:column}.radioLbl{font-size:12px;margin:10px 1em;color:gray}.radioLbl mat-label{font-size:12px}.radioChoices{display:flex}.radioChoices .choice{display:flex;align-items:center;margin-right:1em}.radioMateriel{position:relative;top:-13px}.radioMargin1em{margin:1em}.radioDisabled,.radioBoxDisabled{cursor:not-allowed}@media only screen and (max-width: 800px){.container{position:relative}.container .forMobileScroll{position:absolute;width:100%;height:100%;z-index:1}.container .linkField{z-index:2}}.container{position:relative;display:flex;justify-content:space-around;flex-direction:column;flex-wrap:wrap;border-radius:25px;padding:1rem}.container .content-detail .title{font-weight:700}.container .content-detail .content-detail-line{width:100%;margin:auto;height:1px}.container :ng-deep .fill{width:100%}.container :ng-deep .fill mat-form-field{width:100%}.container :ng-deep .fill textarea{width:100%}.returnLine{width:100%}.fieldContainer{display:flex;flex-direction:row;justify-content:space-around;flex-wrap:wrap;flex:auto}.fieldContainer .content{touch-action:auto!important;-webkit-user-select:auto!important;user-select:auto!important;-webkit-user-drag:auto!important;flex:1 0 auto}.fieldContainer .col4{flex-grow:4}.fieldContainer .col4 mat-form-field{width:720px}.fieldContainer .col3{flex-grow:3}.fieldContainer .col3 mat-form-field{width:540px}.fieldContainer .col2{flex-grow:2}.fieldContainer .col2 mat-form-field{width:360px}@media only screen and (max-width: 1200px){.fieldContainer .isRatifView.col4 mat-form-field{width:540px}}@media only screen and (max-width: 1000px){.fieldContainer .col4 mat-form-field{width:540px}.fieldContainer .isRatifView.col4 mat-form-field{width:360px}}@media only screen and (max-width: 800px){:is(.fieldContainer .col3,.fieldContainer .col4) mat-form-field{width:360px}:is(.fieldContainer .isRatifView.col3,.fieldContainer .ratifSize.col4) mat-form-field{width:auto}}@media only screen and (max-width: 600px){:is(.fieldContainer .col2,.fieldContainer .col3,.fieldContainer .col4) mat-form-field{width:auto}}textarea{overflow:hidden!important}.emptyField{visibility:hidden}.linkField,.linkField textarea{cursor:pointer;text-decoration:underline}:is() .table-container{background-color:transparent}:is() .table-container .table-content .mat-table tr.mat-header-row th.mat-header-cell .mat-sort-header-container .mat-sort-header-arrow{display:none;position:absolute}@media print{.container{border:solid 1px gray}}\n"] }]
        }], ctorParameters: () => [], propDecorators: { disabled: [{
                type: Input
            }], modifiable: [{
                type: Input
            }], translateSuffix: [{
                type: Input
            }], nbColumns: [{
                type: Input
            }], items: [{
                type: Input
            }], ratifiable: [{
                type: Input
            }], minrows: [{
                type: Input
            }], transServ: [{
                type: Input
            }], debug: [{
                type: Input
            }] } });

class InputRangeDate {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: InputRangeDate, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: InputRangeDate, isStandalone: true, selector: "lib-input-range-date", ngImport: i0, template: "<p>input-range-date works!</p>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: InputRangeDate, decorators: [{
            type: Component,
            args: [{ selector: 'lib-input-range-date', imports: [], template: "<p>input-range-date works!</p>\n" }]
        }] });

class Scroll {
    scrolledUpDisabled = false;
    scrolledDownDisabled = false;
    scrolledLeftDisabled = false;
    scrolledRightDisabled = false;
    scrolledUp = new EventEmitter();
    scrolledDown = new EventEmitter();
    scrolledLeft = new EventEmitter();
    scrolledRight = new EventEmitter();
    scrollBuffer = 500;
    scrollBuffered = false;
    vertical = true;
    horizontal = true;
    forced = false;
    constructor() { }
    onmouseWheel(event) {
        if ((event.wheelDelta > 0 && !this.scrolledDownDisabled) || (event.wheelDelta < 0 && !this.scrolledUpDisabled)) {
            if (!this.scrollBuffered) {
                this.scrollBuffered = true;
                if (this.vertical) {
                    this.scrolled(event.wheelDelta > 0, event.wheelDelta);
                }
                if (this.horizontal) {
                    this.scrolledH(event.wheelDelta > 0, event.wheelDelta);
                }
                setTimeout(() => this.scrollBuffered = false, this.scrollBuffer);
            }
        }
    }
    onmouseoverup(event) {
        if (this.scrolledUpDisabled) {
            this.scrolled(event.wheelDelta > 0, event.wheelDelta);
        }
    }
    onmouseoverdown(event) {
        if (this.scrolledDownDisabled) {
            this.scrolled(event.wheelDelta > 0, event.wheelDelta);
        }
    }
    ngOnInit() {
    }
    scrolled(up, wheel) {
        if (up) {
            this.scrolledUp.emit(Math.abs(wheel));
        }
        else {
            this.scrolledDown.emit(Math.abs(wheel));
        }
    }
    scrolledH(up, wheel) {
        if (up) {
            this.scrolledLeft.emit(Math.abs(wheel));
        }
        else {
            this.scrolledRight.emit(Math.abs(wheel));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Scroll, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: Scroll, isStandalone: true, selector: "dia-scroll", inputs: { scrolledUpDisabled: "scrolledUpDisabled", scrolledDownDisabled: "scrolledDownDisabled", scrolledLeftDisabled: "scrolledLeftDisabled", scrolledRightDisabled: "scrolledRightDisabled", scrollBuffer: "scrollBuffer", vertical: "vertical", horizontal: "horizontal", forced: "forced" }, outputs: { scrolledUp: "scrolledUp", scrolledDown: "scrolledDown", scrolledLeft: "scrolledLeft", scrolledRight: "scrolledRight" }, host: { listeners: { "mousewheel": "onmouseWheel($event)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                multi: true,
                useExisting: forwardRef(() => Scroll)
            }
        ], ngImport: i0, template: "<div class=\"container up\" *ngIf=\"vertical && !scrolledUpDisabled\" [ngClass]=\"{containerForced: forced, upForced: forced}\" (click)=\"scrolled(true)\" >\n  <mat-icon >keyboard_arrow_up</mat-icon>\n</div>\n\n<div class=\"container down\" *ngIf=\"vertical && !scrolledDownDisabled\" [ngClass]=\"{containerForced: forced, downForced: forced}\" (click)=\"scrolled(false)\">\n  <mat-icon >keyboard_arrow_down</mat-icon>\n</div>\n\n<div class=\"container left\" *ngIf=\"horizontal && !scrolledLeftDisabled\" [ngClass]=\"{containerForced: forced, leftForced: forced}\" (click)=\"scrolledH(true)\" >\n    <mat-icon >keyboard_arrow_left</mat-icon>\n  </div>\n\n  <div class=\"container right\" *ngIf=\"horizontal  && !scrolledRightDisabled\" [ngClass]=\"{containerForced: forced, rightForced: forced}\" (click)=\"scrolledH(false)\">\n    <mat-icon >keyboard_arrow_right</mat-icon>\n  </div>\n", styles: [".container{cursor:pointer;position:absolute;left:0;width:100%;height:10%;display:flex;justify-content:center;opacity:0;transition-duration:.5s}.container mat-icon{transform:scale(2);position:relative;transition-duration:.5s}.up{align-items:flex-start;top:0}.up mat-icon{top:100px}.down{align-items:flex-end;bottom:0}.down mat-icon{bottom:100px}.container:hover{opacity:.8}.down:hover mat-icon{transform:scale(2);position:relative;bottom:20px}.up:hover mat-icon{transform:scale(2);position:relative;top:20px}.left{width:10%;height:100%;align-items:center;justify-content:flex-start;left:0;top:0}.left mat-icon{left:100px}.right{width:10%;height:100%;align-items:center;justify-content:flex-end;right:0;top:0;left:unset}.right mat-icon{right:100px}.right:hover mat-icon{transform:scale(2);position:relative;right:20px}.left:hover mat-icon{transform:scale(2);position:relative;left:20px}.containerForced{opacity:.8}.rightForced mat-icon{transform:scale(2);position:relative;right:20px}.leftForced mat-icon{transform:scale(2);position:relative;left:20px}.downForced mat-icon{transform:scale(2);position:relative;bottom:20px}.upForced mat-icon{transform:scale(2);position:relative;top:20px}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i5$2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Scroll, decorators: [{
            type: Component,
            args: [{ selector: 'dia-scroll', standalone: true, imports: [MatIconModule, CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(() => Scroll)
                        }
                    ], template: "<div class=\"container up\" *ngIf=\"vertical && !scrolledUpDisabled\" [ngClass]=\"{containerForced: forced, upForced: forced}\" (click)=\"scrolled(true)\" >\n  <mat-icon >keyboard_arrow_up</mat-icon>\n</div>\n\n<div class=\"container down\" *ngIf=\"vertical && !scrolledDownDisabled\" [ngClass]=\"{containerForced: forced, downForced: forced}\" (click)=\"scrolled(false)\">\n  <mat-icon >keyboard_arrow_down</mat-icon>\n</div>\n\n<div class=\"container left\" *ngIf=\"horizontal && !scrolledLeftDisabled\" [ngClass]=\"{containerForced: forced, leftForced: forced}\" (click)=\"scrolledH(true)\" >\n    <mat-icon >keyboard_arrow_left</mat-icon>\n  </div>\n\n  <div class=\"container right\" *ngIf=\"horizontal  && !scrolledRightDisabled\" [ngClass]=\"{containerForced: forced, rightForced: forced}\" (click)=\"scrolledH(false)\">\n    <mat-icon >keyboard_arrow_right</mat-icon>\n  </div>\n", styles: [".container{cursor:pointer;position:absolute;left:0;width:100%;height:10%;display:flex;justify-content:center;opacity:0;transition-duration:.5s}.container mat-icon{transform:scale(2);position:relative;transition-duration:.5s}.up{align-items:flex-start;top:0}.up mat-icon{top:100px}.down{align-items:flex-end;bottom:0}.down mat-icon{bottom:100px}.container:hover{opacity:.8}.down:hover mat-icon{transform:scale(2);position:relative;bottom:20px}.up:hover mat-icon{transform:scale(2);position:relative;top:20px}.left{width:10%;height:100%;align-items:center;justify-content:flex-start;left:0;top:0}.left mat-icon{left:100px}.right{width:10%;height:100%;align-items:center;justify-content:flex-end;right:0;top:0;left:unset}.right mat-icon{right:100px}.right:hover mat-icon{transform:scale(2);position:relative;right:20px}.left:hover mat-icon{transform:scale(2);position:relative;left:20px}.containerForced{opacity:.8}.rightForced mat-icon{transform:scale(2);position:relative;right:20px}.leftForced mat-icon{transform:scale(2);position:relative;left:20px}.downForced mat-icon{transform:scale(2);position:relative;bottom:20px}.upForced mat-icon{transform:scale(2);position:relative;top:20px}\n"] }]
        }], ctorParameters: () => [], propDecorators: { scrolledUpDisabled: [{
                type: Input
            }], scrolledDownDisabled: [{
                type: Input
            }], scrolledLeftDisabled: [{
                type: Input
            }], scrolledRightDisabled: [{
                type: Input
            }], scrolledUp: [{
                type: Output
            }], scrolledDown: [{
                type: Output
            }], scrolledLeft: [{
                type: Output
            }], scrolledRight: [{
                type: Output
            }], scrollBuffer: [{
                type: Input
            }], vertical: [{
                type: Input
            }], horizontal: [{
                type: Input
            }], forced: [{
                type: Input
            }], onmouseWheel: [{
                type: HostListener,
                args: ['mousewheel', ['$event']]
            }] } });

class Tiles {
    tunnelLeft = undefined;
    tunnel = new ElementRef(null);
    hoster = new ElementRef(null);
    scroller = new ElementRef(null);
    container = new ElementRef(null);
    scenariContainer = new ElementRef(null);
    tile = undefined;
    tiles = [];
    selector = false;
    autofill = false;
    emptyTpl;
    tileTemplate;
    title = '';
    maxTiles = undefined;
    wheelSpace = 120;
    hasLeft = new EventEmitter();
    selection = new EventEmitter();
    hasClicked = new EventEmitter();
    maxBound = new EventEmitter();
    minBound = new EventEmitter();
    maxLength = 0;
    autoCompute = true;
    forceActive = true;
    circularEffect = false;
    active = false;
    currentContentWidth = null;
    currentContentHeight = null;
    isMobile = false;
    tileWidth = 0;
    tileHeight = 0;
    maxTile = undefined;
    carouselIndex = undefined;
    scrollAngle = 0;
    translateX = undefined;
    translateY = undefined;
    scroll = 90;
    grabbing = false;
    pourcent = 0.8;
    minDiametre = 0;
    maxDiametre = 0;
    forcedDiametre = undefined;
    diametre = 0;
    tetas = [];
    init = false;
    ready = false;
    isCircularInitated = false;
    selectedEvent = new EventEmitter();
    selectedTile = undefined;
    currentEvent = undefined;
    isBoundMax = false;
    isBoundMin = false;
    debug = true;
    constructor() { }
    ngOnChanges(changes) {
        if (changes['tiles'] && changes['tiles'].currentValue) {
            if (this.circularEffect && this.tiles?.filter((tile) => tile.empty).length == 0) {
                this.computeSlider();
            }
            if (this.hoster && this.tiles && this.tileWidth) {
                this.hoster.nativeElement.style.width = Math.max(this.tiles.length * this.tileWidth / Math.PI * 1.3, 0) + 'px';
            }
        }
        if ((changes['forcedDiametre'] && changes['forcedDiametre'].currentValue && !changes['forcedDiametre'].isFirstChange())
            || (changes['minDiametre'] && changes['minDiametre'].currentValue && !changes['minDiametre'].isFirstChange())
            || (changes['maxDiametre'] && changes['maxDiametre'].currentValue && !changes['maxDiametre'].isFirstChange())) {
            this.computeSlider();
        }
    }
    next() {
        const activeTiles = this.tiles.filter((_) => !_.empty).length;
        const maxangle = (activeTiles - 1) * this.scrollAngle;
        const minangle = 90;
        this.scroll += this.scrollAngle;
        this.rotate();
    }
    prev() {
        const activeTiles = this.tiles.filter((_) => !_.empty).length;
        const maxangle = (activeTiles - 1) * this.scrollAngle;
        const minangle = 90;
        this.scroll -= this.scrollAngle;
        this.rotate();
    }
    ngOnInit() {
        this.isMobile = this.isMobileBrowser();
        if (this.isMobile) {
            this.active = true;
        }
        if (this.tile) {
            this.tile.changes.subscribe(_ => {
                this.tileWidth = _.nativeElement.clientWidth;
            });
        }
    }
    computeCircularTileAmount() {
        let boxW = this.tileWidth * 1.3;
        let boxH = this.tileHeight;
        let r = this.getDiametre() / 2;
        let perimetre = 2 * Math.PI * r;
        let amountTile = this.tiles.length;
        this.addEmptyTiles(Math.round(perimetre / boxW) - amountTile);
    }
    addEmptyTiles(q) {
        for (let i = this.tiles.length - 1; i < 31; i++) {
            this.tiles.push({ empty: true });
        }
        const diam = this.tiles.length * this.tileWidth / Math.PI * 1.3;
        this.hoster.nativeElement.style.width = Math.round(diam) + 'px';
    }
    isIosBrowser() {
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            return true;
        }
        else {
            return false;
        }
    }
    isMobileBrowser() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent)) {
            return true;
        }
        else {
            return false;
        }
    }
    getDiametre() {
        return this.forcedDiametre ? this.forcedDiametre : this.minDiametre > this.hoster.nativeElement.clientWidth ? this.minDiametre : this.maxDiametre < this.hoster.nativeElement.clientWidth ? this.maxDiametre : this.hoster.nativeElement.clientWidth;
    }
    getFirstTile() {
        if (!this.tile || !this.tile.first) {
            return;
        }
        this.tileWidth = this.tile.first.nativeElement.clientWidth;
        this.tileHeight = this.tile.first.nativeElement.clientHeight;
        return this.tile.first;
    }
    ngAfterViewInit() {
        this.getDiametre();
        if (this.tile) {
            this.tile.changes.subscribe(_ => {
                this.getFirstTile();
            });
            if (this.tile.first) {
                this.getFirstTile();
            }
        }
        this.computeSlider();
        if (!this.init) {
            this.rotateBox({ movementX: 0 });
            setTimeout(() => { this.computeSlider(true); this.mouseUp(null); }, 300);
            this.init = true;
        }
    }
    resetTunnel(e) {
        this.tunnelLeft = 0;
        this.tunnel.nativeElement.style.left = this.tunnelLeft + 'px';
        this.computeSlider();
    }
    getMaxTiles() {
        this.getFirstTile();
        let widthTile;
        if (this.tile && this.tile.first) {
            widthTile = this.tile.first.nativeElement.clientWidth;
            this.log('largeur tiles: ' + widthTile);
        }
        if (this.maxTiles) {
            return Math.floor(this.maxTiles);
        }
        if (widthTile) {
            return Math.floor(this.container.nativeElement.clientWidth / widthTile);
        }
        if (this.tileWidth) {
            return Math.floor(this.container.nativeElement.clientWidth / this.tileWidth);
        }
        return this.tiles.length;
    }
    computeAngle(c, i, tube, num) {
        return (360 / num * i);
    }
    computeLeft(c, i, tube, num) {
        let teta = this.computeAngle(c, i, tube, num);
        return (this.getDiametre() - this.getDiametre() * Math.cos(teta * Math.PI / 180)) / 2;
    }
    computeBottom(c, i, tube, num) {
        let teta = this.computeAngle(c, i, tube, num);
        return (this.getDiametre() - this.getDiametre() * Math.sin(teta * Math.PI / 180)) / 2;
    }
    computeSlider(init) {
        if (this.init) {
            setTimeout(() => this.ready = true, 300);
        }
        if (this.tunnel && this.tiles) {
            const overflow = this.tunnel.nativeElement.clientWidth - this.container.nativeElement.clientWidth;
            if (this.circularEffect) {
                this.tunnel.nativeElement.style.height = this.getDiametre() + 'px';
                this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
            }
            this.maxLength = overflow > 0 ? overflow / 2 : 0;
            let boxW = Math.round(this.tunnel.nativeElement.clientWidth / this.tiles.length);
            this.log('boxing: ' + boxW);
            this.currentContentWidth = boxW;
            let boxH = this.tunnel.nativeElement.clientHeight;
            if (this.scroller && this.scroller.nativeElement && this.scroller.nativeElement.children.length > 0) {
                this.scroller.nativeElement.children[0].style.height = boxH + 'px';
                this.scroller.nativeElement.children[0].style.width = boxW / 3 + 'px';
                this.scroller.nativeElement.children[1].style.height = boxH + 'px';
                this.scroller.nativeElement.children[1].style.width = boxW / 3 + 'px';
                this.scroller.nativeElement.children[0].style.top = '-' + (boxH + 32) / 2 + 'px';
                this.scroller.nativeElement.children[1].style.top = '-' + (boxH + 32) / 2 + 'px';
            }
            if (this.circularEffect) {
                this.getDiametre();
                this.translateY = 1.7 * this.getDiametre() + 'px';
                this.translateX = (this.getDiametre() * 1.2 + boxW) + 'px';
            }
            if (this.forceActive && this.tunnel.nativeElement.clientWidth > this.getDiametre()) {
                this.active = true;
            }
            else {
                this.active = false;
            }
            if (this.autofill && !this.circularEffect) {
                if (this.tiles.filter((_) => _.empty).length > 0 && this.tiles.length > this.getMaxTiles()) {
                    this.tiles = this.tiles.filter((_) => !_.empty);
                }
                let empties = [];
                if (this.tiles.length < this.getMaxTiles() - 1) {
                    while (this.tiles.length + empties.length < this.getMaxTiles()) {
                        empties.push({ empty: true });
                    }
                    let tmp = [];
                    if (empties.length % 2 !== 0) {
                        empties.pop();
                    }
                    tmp = this.tiles.map((_) => empties.splice(Math.floor(empties.length / 2), 0, _));
                    this.tiles = empties;
                }
            }
            if (this.circularEffect) {
                this.refreshCircular();
            }
        }
    }
    scrolledRight(e, tar) {
        if (this.active) {
            tar = this.getTar(tar, e);
            if (!this.tunnelLeft) {
                this.tunnelLeft = 0;
            }
            if (this.tunnelLeft < this.maxLength - Math.abs(this.getSlideDelata(e))) {
                this.tunnelLeft += Math.abs(this.getSlideDelata(e));
                tar.style.left = this.tunnelLeft + 'px';
            }
        }
        this.refreshCircular();
    }
    refreshCircular() {
        if (this.circularEffect) {
            this.getFirstTile();
            this.container.nativeElement.style.height = Math.round(this.tileHeight * 1.5) + 'px';
            let c = this.tunnel.nativeElement.children;
            this.scrollAngle = (360 / (c.length));
            let j = 0;
            let r = this.getDiametre() / 2;
            this.log('diametre:' + this.getDiametre());
            this.scenariContainer.nativeElement.style.position = "relative";
            this.scenariContainer.nativeElement.style.top = r + 'px';
            this.tetas = [];
            for (let i = 0; i < c.length; i++) {
                if (c[i].className.indexOf('scroll') == -1) {
                    const teta = this.computeAngle(c[i], i, this.tunnel, c.length);
                    c[i].style.transform = '  rotate(-' + (teta + 90) + 'deg)';
                    this.tetas.push(teta + 90);
                    c[i].style.left = ((this.computeLeft(c[i], i, this.tunnel, c.length)) - r - this.tileWidth / 2) + 'px';
                    c[i].style.bottom = ((this.computeBottom(c[i], i, this.tunnel, c.length)) - this.tileHeight / 2) + 'px';
                }
            }
            this.computeCircularTileAmount();
            if (!this.isCircularInitated) {
                this.isCircularInitated = true;
            }
        }
    }
    scrolledLeft(e, tar) {
        if (this.active) {
            tar = this.getTar(tar, e);
            if (!this.tunnelLeft) {
                this.tunnelLeft = 0;
            }
            if (this.tunnelLeft > -this.maxLength + Math.abs(this.getSlideDelata(e))) {
                this.tunnelLeft -= Math.abs(this.getSlideDelata(e));
                tar.style.left = this.tunnelLeft + 'px';
            }
        }
        this.refreshCircular();
    }
    getSlideDelata(e) {
        return e && e.deltaX ? e.deltaX : e ? e : this.autoCompute ? this.currentContentWidth : this.wheelSpace;
    }
    getTar(tar, e) {
        return this.tunnel.nativeElement;
    }
    left(e) {
        this.hasLeft.emit(e);
    }
    clicked(e, sc) {
        this.log('clicked');
        if (sc.empty) {
            this.log('clicked aborted: empty tile');
            return;
        }
        if (this.circularEffect) {
            this.scroll = this.tetas[e];
            this.selectedTile = this.tiles[e];
            this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
            this.selection.emit(this.selectedTile);
            this.log(e);
        }
        this.hasClicked.emit(e);
    }
    mouseDown(e) {
        this.grabbing = true;
    }
    panStart(e) {
        this.grabbing = true;
    }
    mouseUp(e) {
        this.grabbing = false;
        if (this.circularEffect) {
            const activeTiles = this.tiles.filter((_) => !_.empty).length;
            const maxangle = (activeTiles - 1) * this.scrollAngle;
            const minangle = 90;
            if (activeTiles === 1) {
                this.scroll = 90;
                this.selectedTile = this.tiles[0];
                this.selection.emit(this.selectedTile);
            }
            else if (this.tiles.length != activeTiles) {
                const tmp = Math.round((this.scroll) / this.scrollAngle);
                this.scroll = tmp * this.scrollAngle;
                this.scroll = this.scroll > maxangle + minangle ? maxangle + minangle : this.scroll < minangle ? minangle : this.scroll;
                if (this.scroll >= maxangle) {
                    this.boundMaxReached();
                }
                if (this.scroll <= minangle) {
                    this.boundMinReached();
                }
                let v = this.scroll;
                let last = null;
                for (let i = 0; i < this.tetas.length; i++) {
                    const cur = Math.abs(this.tetas[i] - v);
                    if (last === null || cur <= last) {
                        last = cur;
                        this.selectedTile = this.tiles[i];
                        this.selection.emit(this.selectedTile);
                    }
                }
            }
            else {
                this.log(maxangle + " > " + this.scroll + " > " + minangle);
                const multipleTour = Math.round((this.scroll - 90) / 360);
                let last = null;
                let v = multipleTour === 0 ? this.scroll : Math.round(this.scroll / multipleTour);
                for (let i = 0; i < this.tetas.length; i++) {
                    const cur = Math.abs(this.tetas[i] - v);
                    if (last === null || cur <= last) {
                        last = cur;
                        this.scroll = this.tetas[i];
                        this.selectedTile = this.tiles[i];
                        this.selection.emit(this.selectedTile);
                    }
                }
            }
            this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
            if (this.selector) {
                this.selectedEvent.emit(this.selectedTile);
            }
        }
    }
    mouseLeave(e) {
        if (this.grabbing) {
            this.grabbing = false;
            this.mouseUp(e);
        }
    }
    mouseMove(e) {
        if (this.grabbing && !this.isIosBrowser()) {
            this.rotateBox(e);
            e.stopPropagation();
        }
    }
    panMoving(e) {
        if (this.grabbing) {
            const ev = e;
            if (!e.srcEvent.movementX) {
                this.scroll += this.scrollAngle * ev.overallVelocityX * 0.1;
                this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
            }
            else {
                this.rotateBox(e.srcEvent, e);
            }
        }
    }
    panEnd(e) {
        this.grabbing = false;
        this.mouseUp(e.srcEvent);
    }
    onmouseWheel(event) {
        if (this.circularEffect) {
            this.rotateBox(event);
        }
        else {
            event.preventDefault();
            event.wheelDelta > 0 ? this.scrolledLeft(Math.abs(event.wheelDelta), event.currentTarget) : this.scrolledRight(Math.abs(event.wheelDelta), event.currentTarget);
        }
    }
    rotateBox(event, eParent) {
        this.log(event);
        if (event.movementX && this.circularEffect) {
            this.scroll += this.scrollAngle * event.movementX * 0.01;
            this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
        }
    }
    isSameEventAndTarget(e) {
        return e && this.currentEvent && this.currentEvent.type === e.type;
    }
    getDelta(e, field) {
        return e && this.currentEvent ? e[field] - this.currentEvent[field] : 0;
    }
    rotate() {
        const activeTiles = this.tiles.filter((_) => !_.empty).length;
        const maxangle = (activeTiles - 1) * this.scrollAngle;
        const minangle = 90;
        if (this.scroll > maxangle) {
            this.scroll = maxangle;
            this.boundMaxReached();
        }
        else if (this.scroll < minangle) {
            this.scroll = minangle;
            this.boundMinReached();
        }
        else {
            this.isBoundMax = false;
            this.isBoundMin = false;
        }
        this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
    }
    log(any) {
        if (this.debug) {
            console.log(any);
        }
    }
    boundMaxReached() {
        this.isBoundMax = true;
        this.maxBound.emit(true);
    }
    boundMinReached() {
        this.isBoundMin = true;
        this.minBound.emit(true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Tiles, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: Tiles, isStandalone: true, selector: "dia-tiles", inputs: { tiles: "tiles", selector: "selector", autofill: "autofill", emptyTpl: "emptyTpl", tileTemplate: "tileTemplate", title: "title", maxTiles: "maxTiles", wheelSpace: "wheelSpace", autoCompute: "autoCompute", forceActive: "forceActive", circularEffect: "circularEffect", scroll: "scroll", pourcent: "pourcent", minDiametre: "minDiametre", maxDiametre: "maxDiametre", forcedDiametre: "forcedDiametre", debug: "debug" }, outputs: { hasLeft: "hasLeft", selection: "selection", hasClicked: "hasClicked", maxBound: "maxBound", minBound: "minBound" }, host: { listeners: { "document:resize": "resetTunnel($event)" } }, viewQueries: [{ propertyName: "tunnel", first: true, predicate: ["scenariMask"], descendants: true, read: ElementRef, static: true }, { propertyName: "hoster", first: true, predicate: ["hoster"], descendants: true, read: ElementRef, static: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true, read: ElementRef, static: true }, { propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ElementRef, static: true }, { propertyName: "scenariContainer", first: true, predicate: ["scenariContainer"], descendants: true, read: ElementRef, static: true }, { propertyName: "tile", predicate: ["tile"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<div class=\"container\"\n  [ngClass]=\"{circular:circularEffect, grabbing:grabbing, grab:!grabbing, hideComponent:circularEffect && !isCircularInitated}\"\n  #container (window:resize)=\"resetTunnel()\">\n  <div id=\"choices\" class=\"choices\" (mousewheel)=\"circularEffect? null:onmouseWheel($event)\"\n    (panstart)=\"panStart($event)\" (pan)=\"panMoving($event)\" (panend)=\"panEnd($event)\" (mousemove)=\"mouseMove($event)\"\n    (mousedown)=\"mouseDown($event)\" (mouseup)=\"mouseUp($event)\" (mouseleave)=\"mouseLeave($event)\">\n    <div class=\"choicesMask\">\n      <div class=\"TileSelection\">{{title}}</div>\n      <div class=\"scenariContainer\" #scenariContainer>\n        <div class=\"visibleMask\">\n          <div class=\"scenariMask\" #scenariMask (mousewheel)=\"circularEffect? null:onmouseWheel($event)\"\n            (swipeleft)=\"circularEffect? null:scrolledLeft($event)\"\n            (swiperight)=\"circularEffect? null:scrolledRight($event)\">\n            <ng-container *ngFor=\"let scenario of tiles; let i = index;\">\n              <div *ngIf=\"!scenario.empty\"\n                [ngClass]=\"{box:!circularEffect, cBox:circularEffect, animate:isCircularInitated, selected: scenario === selectedTile}\"\n                #tile (mouseleave)=\"left(scenario)\" (click)=\"clicked(i, scenario)\">\n                <ng-container\n                  *ngTemplateOutlet=\"tileTemplate; context: {$implicit: scenario, itemIndex:i, carouselIndex:i, selected: scenario === selectedTile}\"></ng-container>\n              </div>\n              <div *ngIf=\"scenario.empty\"\n                [ngClass]=\"{box:!circularEffect, cBox:circularEffect, emptyTile:scenario.empty}\" #tile\n                (mouseleave)=\"left(scenario)\" (click)=\"clicked(i, scenario)\">\n                <ng-container\n                  *ngTemplateOutlet=\"emptyTpl; context: {$implicit: scenario, selected: scenario === selectedTile, context: {$implicit: scenario, itemIndex:i, carouselIndex:i}}\"></ng-container>\n              </div>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"scrollerBox\" [ngClass]=\"{hideScroll:!active}\" #hoster (mousewheel)=\"onmouseWheel($event)\">\n    <!--div class=\"box hide\" >\n          <ng-container  *ngTemplateOutlet=\"tileTemplate; context: {$implicit: tiles[0]}\"></ng-container>\n      </div-->\n    <dia-scroll class=\"scroller\" #scroller (scrolledLeft)=\"scrolledLeft($event)\" [scrollBuffer]=\"5\"\n      (scrolledRight)=\"scrolledRight($event)\" [forced]=\"isMobile\" [vertical]=false></dia-scroll>\n  </div>\n</div>", styles: [":host{padding:0;margin:0}:host .container{display:flex;justify-content:center;align-items:center}:host .container.circular{width:100%}:host .container.circular.hideComponent{opacity:0}:host .container.circular.grab{cursor:grab}:host .container.circular.grabbing{cursor:grabbing}:host .container.circular.grabbing .scenariContainer{transition-duration:0ms;transition-delay:0ms}:host .cBox{position:absolute}:host animate{transition-duration:.5s;transition-delay:.5s}:host .box{position:relative;transition-duration:.5s;transition-delay:.5s}:host .box:hover{transform:scale(1.2);margin:2rem;position:relative;transition-duration:.5s;transition-delay:.5s}:host .scenariContainer{display:flex;position:relative;margin-bottom:2rem;transition-duration:.6s;transition-delay:.5s;justify-content:center;align-items:center}:host .scenariMask{transition-duration:.6s;display:flex;position:relative;justify-content:center;align-items:center}:host .scenarioBG{position:absolute;top:0%;left:0%;height:70%;width:100%}:host .scenarioBG img{width:100%;transition-duration:.6s;transition-delay:.5s;opacity:.4;-webkit-filter:grayscale(1);filter:grayscale(1)}:host .scenarioBG.color img{-webkit-filter:unset;filter:unset}:host .scenarioBG:hover img{transform:scale(1.2);opacity:.75}:host #choices.hoveringScenario{background-image:linear-gradient(45deg,#35353545,#15151545);top:70vh;height:70vh}:host .content{position:absolute;width:100%;height:100%;top:0}:host .title{position:relative;top:20%;width:80%;margin:auto;font-size:5rem;font-weight:700;transition-duration:.6s;transition-delay:.5s}:host .desc{position:relative;opacity:0;width:80%;top:70%;margin:auto;text-align:justify;transition-duration:.3s;transition-delay:.5s}:host .desc .text{width:60%}:host .actorImg{position:absolute;top:2rem;left:3rem;transition-duration:.6s;transition-delay:.5s}:host .actorImg img{transition-duration:.6s;transition-delay:.5s;border-radius:3rem;width:3rem;height:3rem;opacity:0}:host .actions{transition-duration:.6s;transition-delay:.5s;display:flex;position:absolute;right:-11.5rem;top:24%;flex-direction:column;opacity:0}:host .actions mat-icon{transition-duration:.6s;transition-delay:.5s;margin:1.5em 2em;transform:scale(2)}:host .actions mat-icon:hover{transform:scale(3)}:host .actions .act{cursor:pointer;padding:0 1em;margin:1rem 0;width:11.5rem;border:2px solid white}:host .actions .playBox{transition-duration:.6s;transition-delay:.3s;position:relative}:host .actions .favBox{transition-duration:.6s;transition-delay:.6s;position:relative;right:-200px}:host .actions .shareBox{transition-duration:.6s;transition-delay:.9s;position:relative;right:-200px}:host .TileSelection{width:100vw;display:flex;font-size:0rem;height:0px}:host .contentHovered .title{position:relative;top:35%}:host .contentHovered .actions{right:-11.5rem;opacity:1}:host .contentHovered .actions .act{background-color:#00000035;border-radius:1rem}:host .contentHovered .actions .act:hover{background-color:#00000075;border-radius:1rem;right:150px;transition-delay:0ms}:host .contentHovered .actions .playBox{right:100px}:host .contentHovered .actions .shareBox{right:100px}:host .contentHovered .actions .favBox{right:100px}:host .contentHovered .desc{opacity:1;top:40%;overflow:auto;-webkit-overflow-scrolling:touch}:host mat-icon{cursor:pointer;transition-duration:.6s;transition-delay:.5s}:host .scroller{z-index:600}:host .choices{display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;width:100%;transition-duration:.6s}:host .visibleMask{-webkit-overflow-scrolling:touch}@media only screen and (max-height: 800px),(max-width: 800px){:host .title{font-size:0rem}:host .contentHovered .title{font-size:2rem}:host #choices.hoveringScenario{top:90vh}}:host app-scroll ::ng-deep .container{z-index:600;width:3vw}:host app-scroll ::ng-deep .left{background-image:linear-gradient(90deg,black,transparent)}:host app-scroll ::ng-deep .right{background-image:linear-gradient(90deg,transparent,black)}:host app-scroll ::ng-deep .up{background-image:linear-gradient(180deg,black,transparent)}:host app-scroll ::ng-deep .bottom{background-image:linear-gradient(0deg,transparent,black)}:host .scrollerBox{transition-duration:.5s;position:absolute;left:0;width:100%;z-index:600;opacity:1}:host .hideScroll{z-index:-1;opacity:0}:host .hide{position:relative;left:-400px;opacity:0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: Scroll, selector: "dia-scroll", inputs: ["scrolledUpDisabled", "scrolledDownDisabled", "scrolledLeftDisabled", "scrolledRightDisabled", "scrollBuffer", "vertical", "horizontal", "forced"], outputs: ["scrolledUp", "scrolledDown", "scrolledLeft", "scrolledRight"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Tiles, decorators: [{
            type: Component,
            args: [{ selector: 'dia-tiles', standalone: true, imports: [CommonModule, Scroll], template: "<div class=\"container\"\n  [ngClass]=\"{circular:circularEffect, grabbing:grabbing, grab:!grabbing, hideComponent:circularEffect && !isCircularInitated}\"\n  #container (window:resize)=\"resetTunnel()\">\n  <div id=\"choices\" class=\"choices\" (mousewheel)=\"circularEffect? null:onmouseWheel($event)\"\n    (panstart)=\"panStart($event)\" (pan)=\"panMoving($event)\" (panend)=\"panEnd($event)\" (mousemove)=\"mouseMove($event)\"\n    (mousedown)=\"mouseDown($event)\" (mouseup)=\"mouseUp($event)\" (mouseleave)=\"mouseLeave($event)\">\n    <div class=\"choicesMask\">\n      <div class=\"TileSelection\">{{title}}</div>\n      <div class=\"scenariContainer\" #scenariContainer>\n        <div class=\"visibleMask\">\n          <div class=\"scenariMask\" #scenariMask (mousewheel)=\"circularEffect? null:onmouseWheel($event)\"\n            (swipeleft)=\"circularEffect? null:scrolledLeft($event)\"\n            (swiperight)=\"circularEffect? null:scrolledRight($event)\">\n            <ng-container *ngFor=\"let scenario of tiles; let i = index;\">\n              <div *ngIf=\"!scenario.empty\"\n                [ngClass]=\"{box:!circularEffect, cBox:circularEffect, animate:isCircularInitated, selected: scenario === selectedTile}\"\n                #tile (mouseleave)=\"left(scenario)\" (click)=\"clicked(i, scenario)\">\n                <ng-container\n                  *ngTemplateOutlet=\"tileTemplate; context: {$implicit: scenario, itemIndex:i, carouselIndex:i, selected: scenario === selectedTile}\"></ng-container>\n              </div>\n              <div *ngIf=\"scenario.empty\"\n                [ngClass]=\"{box:!circularEffect, cBox:circularEffect, emptyTile:scenario.empty}\" #tile\n                (mouseleave)=\"left(scenario)\" (click)=\"clicked(i, scenario)\">\n                <ng-container\n                  *ngTemplateOutlet=\"emptyTpl; context: {$implicit: scenario, selected: scenario === selectedTile, context: {$implicit: scenario, itemIndex:i, carouselIndex:i}}\"></ng-container>\n              </div>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"scrollerBox\" [ngClass]=\"{hideScroll:!active}\" #hoster (mousewheel)=\"onmouseWheel($event)\">\n    <!--div class=\"box hide\" >\n          <ng-container  *ngTemplateOutlet=\"tileTemplate; context: {$implicit: tiles[0]}\"></ng-container>\n      </div-->\n    <dia-scroll class=\"scroller\" #scroller (scrolledLeft)=\"scrolledLeft($event)\" [scrollBuffer]=\"5\"\n      (scrolledRight)=\"scrolledRight($event)\" [forced]=\"isMobile\" [vertical]=false></dia-scroll>\n  </div>\n</div>", styles: [":host{padding:0;margin:0}:host .container{display:flex;justify-content:center;align-items:center}:host .container.circular{width:100%}:host .container.circular.hideComponent{opacity:0}:host .container.circular.grab{cursor:grab}:host .container.circular.grabbing{cursor:grabbing}:host .container.circular.grabbing .scenariContainer{transition-duration:0ms;transition-delay:0ms}:host .cBox{position:absolute}:host animate{transition-duration:.5s;transition-delay:.5s}:host .box{position:relative;transition-duration:.5s;transition-delay:.5s}:host .box:hover{transform:scale(1.2);margin:2rem;position:relative;transition-duration:.5s;transition-delay:.5s}:host .scenariContainer{display:flex;position:relative;margin-bottom:2rem;transition-duration:.6s;transition-delay:.5s;justify-content:center;align-items:center}:host .scenariMask{transition-duration:.6s;display:flex;position:relative;justify-content:center;align-items:center}:host .scenarioBG{position:absolute;top:0%;left:0%;height:70%;width:100%}:host .scenarioBG img{width:100%;transition-duration:.6s;transition-delay:.5s;opacity:.4;-webkit-filter:grayscale(1);filter:grayscale(1)}:host .scenarioBG.color img{-webkit-filter:unset;filter:unset}:host .scenarioBG:hover img{transform:scale(1.2);opacity:.75}:host #choices.hoveringScenario{background-image:linear-gradient(45deg,#35353545,#15151545);top:70vh;height:70vh}:host .content{position:absolute;width:100%;height:100%;top:0}:host .title{position:relative;top:20%;width:80%;margin:auto;font-size:5rem;font-weight:700;transition-duration:.6s;transition-delay:.5s}:host .desc{position:relative;opacity:0;width:80%;top:70%;margin:auto;text-align:justify;transition-duration:.3s;transition-delay:.5s}:host .desc .text{width:60%}:host .actorImg{position:absolute;top:2rem;left:3rem;transition-duration:.6s;transition-delay:.5s}:host .actorImg img{transition-duration:.6s;transition-delay:.5s;border-radius:3rem;width:3rem;height:3rem;opacity:0}:host .actions{transition-duration:.6s;transition-delay:.5s;display:flex;position:absolute;right:-11.5rem;top:24%;flex-direction:column;opacity:0}:host .actions mat-icon{transition-duration:.6s;transition-delay:.5s;margin:1.5em 2em;transform:scale(2)}:host .actions mat-icon:hover{transform:scale(3)}:host .actions .act{cursor:pointer;padding:0 1em;margin:1rem 0;width:11.5rem;border:2px solid white}:host .actions .playBox{transition-duration:.6s;transition-delay:.3s;position:relative}:host .actions .favBox{transition-duration:.6s;transition-delay:.6s;position:relative;right:-200px}:host .actions .shareBox{transition-duration:.6s;transition-delay:.9s;position:relative;right:-200px}:host .TileSelection{width:100vw;display:flex;font-size:0rem;height:0px}:host .contentHovered .title{position:relative;top:35%}:host .contentHovered .actions{right:-11.5rem;opacity:1}:host .contentHovered .actions .act{background-color:#00000035;border-radius:1rem}:host .contentHovered .actions .act:hover{background-color:#00000075;border-radius:1rem;right:150px;transition-delay:0ms}:host .contentHovered .actions .playBox{right:100px}:host .contentHovered .actions .shareBox{right:100px}:host .contentHovered .actions .favBox{right:100px}:host .contentHovered .desc{opacity:1;top:40%;overflow:auto;-webkit-overflow-scrolling:touch}:host mat-icon{cursor:pointer;transition-duration:.6s;transition-delay:.5s}:host .scroller{z-index:600}:host .choices{display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;width:100%;transition-duration:.6s}:host .visibleMask{-webkit-overflow-scrolling:touch}@media only screen and (max-height: 800px),(max-width: 800px){:host .title{font-size:0rem}:host .contentHovered .title{font-size:2rem}:host #choices.hoveringScenario{top:90vh}}:host app-scroll ::ng-deep .container{z-index:600;width:3vw}:host app-scroll ::ng-deep .left{background-image:linear-gradient(90deg,black,transparent)}:host app-scroll ::ng-deep .right{background-image:linear-gradient(90deg,transparent,black)}:host app-scroll ::ng-deep .up{background-image:linear-gradient(180deg,black,transparent)}:host app-scroll ::ng-deep .bottom{background-image:linear-gradient(0deg,transparent,black)}:host .scrollerBox{transition-duration:.5s;position:absolute;left:0;width:100%;z-index:600;opacity:1}:host .hideScroll{z-index:-1;opacity:0}:host .hide{position:relative;left:-400px;opacity:0}\n"] }]
        }], ctorParameters: () => [], propDecorators: { tunnel: [{
                type: ViewChild,
                args: ['scenariMask', { read: ElementRef, static: true }]
            }], hoster: [{
                type: ViewChild,
                args: ['hoster', { read: ElementRef, static: true }]
            }], scroller: [{
                type: ViewChild,
                args: ['scroller', { read: ElementRef, static: true }]
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ElementRef, static: true }]
            }], scenariContainer: [{
                type: ViewChild,
                args: ['scenariContainer', { read: ElementRef, static: true }]
            }], tile: [{
                type: ViewChildren,
                args: ['tile', { read: ElementRef }]
            }], tiles: [{
                type: Input
            }], selector: [{
                type: Input
            }], autofill: [{
                type: Input
            }], emptyTpl: [{
                type: Input
            }], tileTemplate: [{
                type: Input
            }], title: [{
                type: Input
            }], maxTiles: [{
                type: Input
            }], wheelSpace: [{
                type: Input
            }], hasLeft: [{
                type: Output
            }], selection: [{
                type: Output
            }], hasClicked: [{
                type: Output
            }], maxBound: [{
                type: Output
            }], minBound: [{
                type: Output
            }], autoCompute: [{
                type: Input
            }], forceActive: [{
                type: Input
            }], circularEffect: [{
                type: Input
            }], scroll: [{
                type: Input
            }], pourcent: [{
                type: Input
            }], minDiametre: [{
                type: Input
            }], maxDiametre: [{
                type: Input
            }], forcedDiametre: [{
                type: Input
            }], debug: [{
                type: Input
            }], resetTunnel: [{
                type: HostListener,
                args: ['document:resize', ['$event']]
            }] } });

/*
 * Public API Surface of dia-utils-libs
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ClickedOutsideDirective, DiaUtilsLibsModule, Dossier, DossierBloc, InputDatePicker, InputRangeDate, Inputs, IsNumericDirective, ModelOption, Scroll, Select, Textarea, Tiles };
//# sourceMappingURL=dia-utils-libs.mjs.map
