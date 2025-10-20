import * as i0 from '@angular/core';
import { OnInit, OnChanges, SimpleChanges, AfterViewChecked, ElementRef, EventEmitter, Renderer2, AfterViewInit, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@angular/forms';
import { FormGroup, ValidatorFn, AsyncValidatorFn, ControlValueAccessor, AbstractControl, FormControl, ControlContainer } from '@angular/forms';
import * as i3 from '@angular/material/form-field';
import { FloatLabelType } from '@angular/material/form-field';
import * as i4 from '@angular/material/input';
import * as i5 from '@angular/material/icon';
import * as i6 from '@angular/material/datepicker';
import * as i7 from '@angular/material/tooltip';
import { MatSelect } from '@angular/material/select';
import { DateAdapter } from '@angular/material/core';

declare class DiaUtilsLibsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DiaUtilsLibsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DiaUtilsLibsModule, never, [typeof i1.CommonModule, typeof i2.FormsModule, typeof i2.ReactiveFormsModule, typeof i3.MatFormFieldModule, typeof i4.MatInputModule, typeof i5.MatIconModule, typeof i6.MatDatepickerModule, typeof i7.MatTooltipModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DiaUtilsLibsModule>;
}

interface IFormatInput {
    parse: (_: any) => any;
    transform: (_: any) => any;
}

declare class ModelOption {
    libelle: string;
    value: string;
    data: any;
    constructor(lib: string, val: string, dat?: any);
    static setUniqueValue(lib: string): ModelOption;
    static setCheckboxValue(lib: string): ModelOption;
}

interface IFormGroupConfig {
    formName: string;
    form: FormGroup;
    updateOn?: string;
    validators: ValidatorFn[];
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
}

interface IAdvancedCustom {
    template: any;
    context: any;
}

declare class Dossier {
    static service?: any;
    static amountFormatter?: IFormatInput;
    static prefix?: string;
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
    value?: string | number | boolean;
    isNumber?: boolean;
    isDecimal?: boolean | undefined;
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
    required?: boolean | undefined;
    formGroupConfig?: IFormGroupConfig;
    customFormat?: IFormatInput;
    advancedCustoms?: IAdvancedCustom[];
    selectValues?: any[];
    placeholder?: string;
    checkboxValues?: any[];
    getErrorMsg?: (_: Dossier) => {};
    sizeColumn?: number;
    indexColumn?: number;
    countDown?: boolean;
    modifiable?: boolean;
    isTextarea?: boolean;
    customClass?: string;
    fill?: boolean;
    isCheckbox?: boolean;
    constructor(title: string, list: Dossier[], value: string | number | boolean);
    static isDefined(val: any): boolean;
    static getEmptyDossier(): Dossier;
    static setByModel(title: string, model: any, field: string, custom?: any): {
        title: string;
        value: any;
        model: any;
        field: string | undefined;
    } | {
        title: string;
        value: any;
        model: any;
        field: string | undefined;
        suffix: any;
    };
    static set(title: string, value: any, custom?: any, model?: any, field?: string): {
        title: string;
        value: any;
        model: any;
        field: string | undefined;
    } | {
        title: string;
        value: any;
        model: any;
        field: string | undefined;
        suffix: any;
    };
    static build(title: string, list: Dossier[], multi?: Dossier[], custom?: any): {
        value: null;
        title: string;
        list: Dossier[] | {
            value: null;
            title: null;
            list: Dossier[];
        }[];
    };
    static formBuild(value: any, config: IFormGroupConfig): void;
    static bloc(title: string, list: Dossier[]): Dossier;
}

declare class DossierBloc implements OnInit, OnChanges {
    amountFormat: IFormatInput | undefined;
    disabled: boolean;
    modifiable: boolean;
    translateSuffix: string;
    nbColumns: number;
    items: Dossier[];
    ratifiable: any;
    minrows: number;
    transServ: any;
    debug: boolean;
    emptyfn: () => void;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    translateTitle(it: string): any;
    translator(it: Dossier): Dossier;
    mapTimestampToDate(timestamp: number): string | null;
    ngOnInit(): void;
    getIntName(str: string): string;
    onclick(item: Dossier): void;
    handleChange(e: any, item: Dossier): void;
    handleValue(item: Dossier): any;
    handleSelectValue(item: Dossier): ModelOption | null;
    handleFormattedValue(item: Dossier): string;
    handleDateValue(item: Dossier): Date | undefined;
    fgroup(): FormGroup<{}>;
    handleIndeterminate(item: Dossier, v?: ModelOption): boolean;
    handleCheckedChange(checked: boolean, item: Dossier): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DossierBloc, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DossierBloc, "dia-dossier", never, { "disabled": { "alias": "disabled"; "required": false; }; "modifiable": { "alias": "modifiable"; "required": false; }; "translateSuffix": { "alias": "translateSuffix"; "required": false; }; "nbColumns": { "alias": "nbColumns"; "required": false; }; "items": { "alias": "items"; "required": false; }; "ratifiable": { "alias": "ratifiable"; "required": false; }; "minrows": { "alias": "minrows"; "required": false; }; "transServ": { "alias": "transServ"; "required": false; }; "debug": { "alias": "debug"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class Inputs implements ControlValueAccessor, OnChanges, OnInit, AfterViewChecked {
    private el;
    private renderer;
    private controlContainer;
    formatInput: ElementRef | undefined;
    input: ElementRef | undefined;
    computeWidth: ElementRef | undefined;
    displayAsLabel: boolean;
    label: string;
    required: boolean | undefined;
    format: string;
    placeholder: string | undefined;
    hidden: string | undefined;
    description: string | undefined;
    disabled: boolean | undefined;
    isDatePicker: boolean;
    readonlyInput: boolean | undefined;
    readonly: boolean | undefined;
    type: string | undefined;
    min: number;
    max: number;
    minDate: number;
    maxDate: number;
    maxLength: number | undefined;
    maxLengthFormat: number | undefined;
    minLength: number | undefined;
    unit: string;
    name: string | undefined;
    cancellable: boolean;
    searching: boolean;
    value: string | boolean | undefined;
    customFormat: IFormatInput | undefined;
    icon: string | undefined;
    errorMsg: string | undefined;
    isError: boolean;
    valueChange: EventEmitter<any>;
    cancelValue: EventEmitter<any>;
    formattedValue: string;
    defaultControl: boolean;
    matDatepicker: any;
    dateChange: EventEmitter<any>;
    visualHelpDisabled: boolean | undefined;
    isDateControl: boolean;
    currentControl: AbstractControl | undefined;
    formControl: FormControl;
    iconWasClicked: EventEmitter<any>;
    wasDblClicked: EventEmitter<any>;
    iconAction: (() => any) | undefined;
    tooltipText: string;
    onChange: (_: any) => void;
    onTouched: (_: any) => void;
    constructor(el: ElementRef, renderer: Renderer2, controlContainer: ControlContainer);
    ngOnInit(): void;
    f_dateChange(): void;
    gets(obs: any): any;
    ngAfterViewChecked(): void;
    textOverflow(): boolean | undefined;
    ngOnChanges(changes: SimpleChanges): void;
    change(newValue: any): void;
    changeFormat(newValue: any): void;
    cancel(data: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    transform(val: any): string;
    parse(val: any): string;
    iconClicked(e: Event): void;
    dblClicked(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Inputs, [null, null, { optional: true; host: true; skipSelf: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Inputs, "dia-input", never, { "displayAsLabel": { "alias": "displayAsLabel"; "required": false; }; "label": { "alias": "label"; "required": false; }; "required": { "alias": "required"; "required": false; }; "format": { "alias": "format"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "hidden": { "alias": "hidden"; "required": false; }; "description": { "alias": "description"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "isDatePicker": { "alias": "isDatePicker"; "required": false; }; "readonlyInput": { "alias": "readonlyInput"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "type": { "alias": "type"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "maxLength": { "alias": "maxLength"; "required": false; }; "minLength": { "alias": "minLength"; "required": false; }; "unit": { "alias": "unit"; "required": false; }; "name": { "alias": "name"; "required": false; }; "cancellable": { "alias": "cancellable"; "required": false; }; "searching": { "alias": "searching"; "required": false; }; "value": { "alias": "value"; "required": false; }; "customFormat": { "alias": "customFormat"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "errorMsg": { "alias": "errorMsg"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "defaultControl": { "alias": "defaultControl"; "required": false; }; "matDatepicker": { "alias": "matDatepicker"; "required": false; }; "visualHelpDisabled": { "alias": "visualHelpDisabled"; "required": false; }; "isDateControl": { "alias": "isDateControl"; "required": false; }; "formControl": { "alias": "formControl"; "required": false; }; "iconAction": { "alias": "iconAction"; "required": false; }; }, { "valueChange": "valueChange"; "cancelValue": "cancelValue"; "dateChange": "dateChange"; "iconWasClicked": "iconWasClicked"; "wasDblClicked": "wasDblClicked"; }, never, ["*"], true, never>;
}

declare class Select implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit, AfterViewChecked {
    private controlContainer;
    private el;
    value: ModelOption | null;
    required: boolean;
    defaultValue: boolean;
    fixPlaceholder: boolean;
    values: ModelOption[] | null;
    forced: ModelOption[] | null;
    list: ModelOption[];
    placeholder: string | undefined;
    disablePlaceHolder: boolean;
    label: string | undefined;
    description: string | undefined;
    multiple: boolean;
    defaultSort: boolean;
    selectedValue: string;
    disabled: boolean;
    direction: string;
    preset: any;
    tooltip: boolean;
    tooltipValue: string;
    autoClosedAfter: number;
    valueChange: EventEmitter<string>;
    valuesChange: EventEmitter<ModelOption[] | null>;
    beenForced: EventEmitter<ModelOption[] | null>;
    formField: any;
    select: MatSelect | undefined;
    floatLabel: FloatLabelType;
    currentControl: AbstractControl | undefined;
    private isBeingForced;
    onChange: (_: any) => void;
    onTouched: (_: any) => void;
    translate: any;
    isAppleBrowser: boolean;
    constructor(controlContainer: ControlContainer, el: ElementRef);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    isAppleBrowsers(): boolean;
    gets(obs: any): any;
    ngAfterViewChecked(): void;
    ngOnChanges(changes: SimpleChanges): void;
    resetMultiple(): void;
    getListValue(val: any): ModelOption | null;
    isAlreadySelected(val: any): ModelOption | null;
    isValInList(val: any, list: ModelOption[] | null): ModelOption | null;
    getPresetValue(): ModelOption | null;
    onUpdateValue(item: any): void;
    getPlaceHolder(): string | undefined;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    itemSelected(e: any, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Select, [{ optional: true; host: true; skipSelf: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Select, "dia-select", never, { "value": { "alias": "value"; "required": false; }; "required": { "alias": "required"; "required": false; }; "defaultValue": { "alias": "defaultValue"; "required": false; }; "fixPlaceholder": { "alias": "fixPlaceholder"; "required": false; }; "values": { "alias": "values"; "required": false; }; "forced": { "alias": "forced"; "required": false; }; "list": { "alias": "list"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "disablePlaceHolder": { "alias": "disablePlaceHolder"; "required": false; }; "label": { "alias": "label"; "required": false; }; "description": { "alias": "description"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "defaultSort": { "alias": "defaultSort"; "required": false; }; "selectedValue": { "alias": "selectedValue"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "direction": { "alias": "direction"; "required": false; }; "preset": { "alias": "preset"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "autoClosedAfter": { "alias": "autoClosedAfter"; "required": false; }; "translate": { "alias": "translate"; "required": false; }; }, { "valueChange": "valueChange"; "valuesChange": "valuesChange"; "beenForced": "beenForced"; }, never, never, true, never>;
}

declare class Textarea implements ControlValueAccessor, OnChanges, OnInit, AfterViewChecked {
    private el;
    private controlContainer;
    input: ElementRef;
    label: string;
    unit: string | undefined;
    placeholder: string | undefined;
    description: string | undefined;
    value: string | undefined;
    readonly: boolean | undefined;
    innerHTML: string | undefined;
    isTextArea: boolean;
    valueChange: EventEmitter<any>;
    maxLength: number | undefined;
    minrows: number | undefined;
    required: boolean | undefined;
    name: string | undefined;
    disabled: boolean | undefined;
    defaultControl: boolean | undefined;
    customFormat: any;
    formControlName: string;
    formGroup: any;
    iconAction: (...args: any[]) => any | undefined;
    icon: string;
    dblClick: (...args: any[]) => any;
    countDown: boolean | undefined;
    currentControl: AbstractControl | undefined;
    count: number;
    formControl: FormControl | undefined;
    onChange: (...args: any[]) => void;
    onTouched: (...args: any[]) => void;
    constructor(el: ElementRef, controlContainer: ControlContainer);
    ngAfterViewChecked(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    change(newValue: any): void;
    changeTextAreaValue(): void;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    iconClicked(item?: any): any;
    dblClicked(item?: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<Textarea, [null, { optional: true; host: true; skipSelf: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Textarea, "dia-textarea", never, { "label": { "alias": "label"; "required": false; }; "unit": { "alias": "unit"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "description": { "alias": "description"; "required": false; }; "value": { "alias": "value"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "innerHTML": { "alias": "innerHTML"; "required": false; }; "isTextArea": { "alias": "isTextArea"; "required": false; }; "maxLength": { "alias": "maxLength"; "required": false; }; "minrows": { "alias": "minrows"; "required": false; }; "required": { "alias": "required"; "required": false; }; "name": { "alias": "name"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "defaultControl": { "alias": "defaultControl"; "required": false; }; "customFormat": { "alias": "customFormat"; "required": false; }; "formControlName": { "alias": "formControlName"; "required": false; }; "formGroup": { "alias": "formGroup"; "required": false; }; "iconAction": { "alias": "iconAction"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "dblClick": { "alias": "dblClick"; "required": false; }; "countDown": { "alias": "countDown"; "required": false; }; }, { "valueChange": "valueChange"; }, never, ["*", "*"], true, never>;
}

declare class InputDatePicker implements ControlValueAccessor, OnChanges, OnInit {
    private dateAdapter;
    label: string;
    customDatePicker: boolean;
    placeholder: string;
    minDate: Date | undefined;
    maxDate: Date | undefined;
    dateChange: EventEmitter<any>;
    popupVisible: boolean;
    formControlDate: FormControl<any>;
    localDate: Date | undefined;
    disabledf: boolean;
    onChanged: (_?: any) => void;
    onTouched: (_?: any) => void;
    value: Date | undefined;
    valueChange: EventEmitter<Date>;
    required: boolean;
    constructor(dateAdapter: DateAdapter<any>);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    set date(date: Date | undefined);
    get date(): Date | undefined;
    set disabled(disabled: boolean);
    get disabled(): boolean;
    onChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputDatePicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InputDatePicker, "dia-input-date-picker", never, { "label": { "alias": "label"; "required": false; }; "customDatePicker": { "alias": "customDatePicker"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "value": { "alias": "value"; "required": false; }; "required": { "alias": "required"; "required": false; }; "date": { "alias": "date"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "dateChange": "dateChange"; "valueChange": "valueChange"; }, never, never, true, never>;
}

declare class InputRangeDate {
    static ɵfac: i0.ɵɵFactoryDeclaration<InputRangeDate, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InputRangeDate, "lib-input-range-date", never, {}, {}, never, never, true, never>;
}

declare class Scroll implements OnInit {
    scrolledUpDisabled: boolean;
    scrolledDownDisabled: boolean;
    scrolledLeftDisabled: boolean;
    scrolledRightDisabled: boolean;
    scrolledUp: EventEmitter<any>;
    scrolledDown: EventEmitter<any>;
    scrolledLeft: EventEmitter<any>;
    scrolledRight: EventEmitter<any>;
    scrollBuffer: number;
    scrollBuffered: boolean;
    vertical: boolean;
    horizontal: boolean;
    forced: boolean;
    constructor();
    onmouseWheel(event: any): void;
    onmouseoverup(event: any): void;
    onmouseoverdown(event: any): void;
    ngOnInit(): void;
    scrolled(up: any, wheel?: any): void;
    scrolledH(up: any, wheel?: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Scroll, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Scroll, "dia-scroll", never, { "scrolledUpDisabled": { "alias": "scrolledUpDisabled"; "required": false; }; "scrolledDownDisabled": { "alias": "scrolledDownDisabled"; "required": false; }; "scrolledLeftDisabled": { "alias": "scrolledLeftDisabled"; "required": false; }; "scrolledRightDisabled": { "alias": "scrolledRightDisabled"; "required": false; }; "scrollBuffer": { "alias": "scrollBuffer"; "required": false; }; "vertical": { "alias": "vertical"; "required": false; }; "horizontal": { "alias": "horizontal"; "required": false; }; "forced": { "alias": "forced"; "required": false; }; }, { "scrolledUp": "scrolledUp"; "scrolledDown": "scrolledDown"; "scrolledLeft": "scrolledLeft"; "scrolledRight": "scrolledRight"; }, never, never, true, never>;
}

interface Tile {
    id?: string;
    empty?: boolean;
    desc?: string;
    acteur?: string;
    title?: string;
    data?: any[];
    css?: any;
    form?: any;
    searchHash?: string[];
}
declare class Tiles implements OnInit, AfterViewInit, OnChanges {
    tunnelLeft: number | undefined;
    tunnel: ElementRef;
    hoster: ElementRef;
    scroller: ElementRef;
    container: ElementRef;
    scenariContainer: ElementRef;
    tile: QueryList<ElementRef> | undefined;
    tiles: any | Tile[];
    selector: boolean;
    autofill: boolean;
    emptyTpl: TemplateRef<any>;
    tileTemplate: TemplateRef<any>;
    title: string;
    maxTiles: number | undefined;
    wheelSpace: number;
    hasLeft: EventEmitter<any>;
    selection: EventEmitter<any>;
    hasClicked: EventEmitter<any>;
    maxBound: EventEmitter<boolean>;
    minBound: EventEmitter<boolean>;
    maxLength: number;
    autoCompute: boolean;
    forceActive: boolean;
    circularEffect: boolean;
    active: boolean;
    currentContentWidth: number | null;
    currentContentHeight: number | null;
    isMobile: boolean;
    tileWidth: number;
    tileHeight: number;
    maxTile: number | undefined;
    carouselIndex: number | undefined;
    scrollAngle: number;
    translateX: string | undefined;
    translateY: string | undefined;
    scroll: number;
    grabbing: boolean;
    pourcent: number;
    minDiametre: number;
    maxDiametre: number;
    forcedDiametre: number | undefined;
    diametre: number;
    tetas: any[];
    init: boolean;
    ready: boolean;
    isCircularInitated: boolean;
    selectedEvent: EventEmitter<any>;
    selectedTile: any;
    currentEvent: any;
    isBoundMax: boolean;
    isBoundMin: boolean;
    debug: boolean;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    next(): void;
    prev(): void;
    ngOnInit(): void;
    computeCircularTileAmount(): void;
    addEmptyTiles(q: number): void;
    isIosBrowser(): boolean;
    isMobileBrowser(): boolean;
    getDiametre(): any;
    getFirstTile(): ElementRef<any> | undefined;
    ngAfterViewInit(): void;
    resetTunnel(e?: any): void;
    getMaxTiles(): number;
    computeAngle(c: any, i: number, tube: any, num: number): number;
    computeLeft(c: any, i: number, tube: any, num: number): number;
    computeBottom(c: any, i: number, tube: any, num: number): number;
    computeSlider(init?: boolean): void;
    scrolledRight(e: any, tar?: any): void;
    refreshCircular(): void;
    scrolledLeft(e: any, tar?: any): void;
    getSlideDelata(e: any): any;
    getTar(tar: any, e: any): any;
    left(e: any): void;
    clicked(e: any, sc: any): void;
    mouseDown(e: any): void;
    panStart(e: any): void;
    mouseUp(e: MouseEvent | null): void;
    mouseLeave(e: any): void;
    mouseMove(e: MouseEvent): void;
    panMoving(e: {
        srcEvent: PointerEvent;
    } | any): void;
    panEnd(e: {
        srcEvent: PointerEvent;
    } | any): void;
    onmouseWheel(event: any): void;
    rotateBox(event: any, eParent?: any): void;
    isSameEventAndTarget(e: any): any;
    getDelta(e: any, field: string): number;
    rotate(): void;
    log(any: any): void;
    boundMaxReached(): void;
    boundMinReached(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Tiles, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Tiles, "dia-tiles", never, { "tiles": { "alias": "tiles"; "required": false; }; "selector": { "alias": "selector"; "required": false; }; "autofill": { "alias": "autofill"; "required": false; }; "emptyTpl": { "alias": "emptyTpl"; "required": false; }; "tileTemplate": { "alias": "tileTemplate"; "required": false; }; "title": { "alias": "title"; "required": false; }; "maxTiles": { "alias": "maxTiles"; "required": false; }; "wheelSpace": { "alias": "wheelSpace"; "required": false; }; "autoCompute": { "alias": "autoCompute"; "required": false; }; "forceActive": { "alias": "forceActive"; "required": false; }; "circularEffect": { "alias": "circularEffect"; "required": false; }; "scroll": { "alias": "scroll"; "required": false; }; "pourcent": { "alias": "pourcent"; "required": false; }; "minDiametre": { "alias": "minDiametre"; "required": false; }; "maxDiametre": { "alias": "maxDiametre"; "required": false; }; "forcedDiametre": { "alias": "forcedDiametre"; "required": false; }; "debug": { "alias": "debug"; "required": false; }; }, { "hasLeft": "hasLeft"; "selection": "selection"; "hasClicked": "hasClicked"; "maxBound": "maxBound"; "minBound": "minBound"; }, never, never, true, never>;
}

declare class ClickedOutsideDirective implements AfterViewInit {
    private el;
    looseCheck: boolean;
    trackEphemeraElement: boolean;
    hasleftFor: number;
    hasLeft: EventEmitter<any>;
    clickedOutside: EventEmitter<any>;
    blur: EventEmitter<any>;
    lastElement: any;
    componentList: ElementRef[];
    compList: ElementRef[];
    compListChange: EventEmitter<ElementRef<any>[]>;
    mouseIsOver: boolean;
    mouseleavedAlready: boolean;
    overSuspended: boolean;
    debug: boolean;
    index: number;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    onclick(targetElement: any): void;
    isInDocument(targetElement: any): boolean;
    contains(el: any): boolean;
    onmouseover(el: any): void;
    onmouseleave(el?: any): void;
    suspendOverDetection(): void;
    resumeOverDetection(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickedOutsideDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClickedOutsideDirective, "[appClickedOutside]", never, { "looseCheck": { "alias": "looseCheck"; "required": false; }; "trackEphemeraElement": { "alias": "trackEphemeraElement"; "required": false; }; "hasleftFor": { "alias": "hasleftFor"; "required": false; }; "compList": { "alias": "compList"; "required": false; }; "debug": { "alias": "debug"; "required": false; }; }, { "hasLeft": "hasLeft"; "clickedOutside": "clickedOutside"; "blur": "blur"; "compListChange": "compListChange"; }, never, never, true, never>;
}

declare class IsNumericDirective {
    private el;
    private renderer;
    regExIsNum: RegExp;
    regExIsNumber: RegExp;
    regExIsAlphabet: RegExp;
    component: any;
    nextValue: string;
    isDecimal: boolean | undefined;
    disable: boolean | undefined;
    isControl: boolean;
    appIsNumeric: string;
    constructor(el: ViewContainerRef, renderer: Renderer2);
    onkeyup($e: KeyboardEvent): void;
    blockPaste(e: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsNumericDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IsNumericDirective, "[appIsNumeric]", never, { "isDecimal": { "alias": "isDecimal"; "required": false; }; "disable": { "alias": "disable"; "required": false; }; "appIsNumeric": { "alias": "appIsNumeric"; "required": false; }; }, {}, never, never, true, never>;
}

interface ITableState {
    page: number;
    size?: number;
    orderBy?: string;
    asc?: boolean;
}

interface IDossierItem {
    id: string | number;
    name: string;
    description?: string;
    icon?: string;
    selected?: boolean;
    disabled?: boolean;
    children?: IDossierItem[];
}

export { ClickedOutsideDirective, DiaUtilsLibsModule, Dossier, DossierBloc, InputDatePicker, InputRangeDate, Inputs, IsNumericDirective, ModelOption, Scroll, Select, Textarea, Tiles };
export type { IAdvancedCustom, IDossierItem, IFormGroupConfig, IFormatInput, ITableState, Tile };
