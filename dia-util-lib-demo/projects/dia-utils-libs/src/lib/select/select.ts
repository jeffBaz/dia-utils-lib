
import {
    Component,
    Input,
    ViewChild,
    EventEmitter,
    Output,
    ChangeDetectionStrategy,
    forwardRef,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges,
    OnInit,
    AfterViewInit,
    AfterViewChecked,
    Optional,
    ElementRef,
    Host,
    SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClickedOutsideDirective } from '../directives/clicked-outside.directive';
import { ModelOption } from '../common/model-option';

@Component({
    selector: 'dia-select',
    templateUrl: './select.html',
    styleUrls: ['./select.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatTooltipModule,
        ClickedOutsideDirective
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => Select)
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Emulated
})
export class Select implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit, AfterViewChecked {
    @Input() value: ModelOption | null = null;
    @Input() required: boolean= false;
    @Input() defaultValue: boolean = true;
    @Input() fixPlaceholder: boolean = false;
    @Input() values: ModelOption[] | null = [];
    @Input() forced: ModelOption[] | null = [];
    @Input() list: ModelOption[] = [];
    @Input() placeholder: string|undefined= '';
    @Input() disablePlaceHolder: boolean = true;
    @Input() label: string|undefined= '';
    @Input() description: string|undefined= '';
    @Input() multiple: boolean = false;
    @Input() defaultSort: boolean = true;
    @Input() selectedValue: string = '';
    @Input() disabled: boolean = false;
    @Input() direction: string = '';
    @Input() preset: any = null;
    @Input() tooltip: boolean = false;
    tooltipValue: string = '';
    @Input() autoClosedAfter: number = 0;
    @Output() valueChange = new EventEmitter<string>();
    @Output() valuesChange = new EventEmitter<ModelOption[] | null>();
    @Output() beenForced = new EventEmitter<ModelOption[] | null>();
    @ViewChild('formField', { static: true }) formField: any;
    @ViewChild('select', { static: false }) select: MatSelect | undefined;
    floatLabel: FloatLabelType = 'auto';
    currentControl: AbstractControl | undefined = undefined;
    private isBeingForced: boolean = false;
    onChange = (_: any) => { };
    onTouched = (_: any) => { };
    @Input() translate: any = null;
    isAppleBrowser: boolean = false;

    constructor(
        @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
        private el: ElementRef
    ) { }

    ngAfterViewInit() {
        this.isAppleBrowser = this.isAppleBrowsers();
    }
    ngOnInit() { }

    isAppleBrowsers() {
        if (typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }
    gets(obs: any) {
        if (obs) {
            return obs;
        } else {
            return {};
        }
    }
    ngAfterViewChecked() {
        if (this.controlContainer && this.el) {
            const fname = this.el.nativeElement.getAttribute('formControlName');
            const fgroupDirective = this.gets(this.controlContainer) as FormGroupDirective;
            if (fgroupDirective && fgroupDirective.form) {
                this.currentControl = fgroupDirective.form.controls[fname];
                if (this.currentControl) {
                    if (this.currentControl.validator) {
                        const validator = this.currentControl.validator({} as AbstractControl);
                        if (validator && validator['required']) {
                            this.required = true;
                        }
                    }
                }
            }
        }
    }
    ngOnChanges(changes: SimpleChanges) {
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
                        this.list = this.list.sort((a, b) =>
                            a.libelle < b.libelle ? -1 : a.libelle > b.libelle ? 1 : 0
                        );
                    }
                }
            }
            if (this.list) {
                if (
                    this.list.length > 0 &&
                    this.preset &&
                    (!this.value || !this.getListValue(this.value))
                ) {
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
                this.values = this.forced.map(it => this.getListValue(it)).filter((it): it is ModelOption => !!it);
            } else {
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
    getListValue(val: any) {
        return this.isValInList(val, this.list);
    }
    isAlreadySelected(val: any) {
        return this.isValInList(val, this.values);
    }
    isValInList(val: any, list: ModelOption[] | null) {
        if (!val || !list) {
            return null;
        }
        const res = list.find(
            it => (!val.value && !it.value && val === it) || (val.value && it.value && val.value === it.value) || (val.value && it.value && val.libelle === it.libelle)
        );
        return res ? res : null;
    }
    getPresetValue() {
        if (!this.list) return null;
        const res = this.list.find(
            it => this.preset === it.value || this.preset === it.libelle
        );
        return res ? res : this.list[0];
    }
    onUpdateValue(item: any) {
        this.value = item;
        if (this.tooltip && this.value && this.value.libelle) {
            this.tooltipValue = this.value.libelle;
        }
        this.onChange(item);
        this.valueChange.emit(item);
    }
    getPlaceHolder() {
        if (
            this.disablePlaceHolder &&
            this.value !== null &&
            this.value !== undefined &&
            !this.multiple
        ) {
            return '';
        } else {
            return this.placeholder;
        }
    }
    writeValue(value: any): void {
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
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    itemSelected(e: any, item: any) {
        if (e.source.selected) {
            this.writeValue(item);
        } else {
            if (this.values) {
                this.values = this.values.filter(it => it.libelle !== item.libelle);
            }
            this.valuesChange.emit(this.values);
            this.onUpdateValue(item);
        }
    }
}
