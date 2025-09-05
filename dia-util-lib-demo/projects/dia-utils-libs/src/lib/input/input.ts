import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  OnInit,
  forwardRef,
  HostListener,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  Optional,
  SkipSelf,
  Host,
  Self,
  AfterViewChecked
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ControlValueAccessor,
  FormGroup,
  FormGroupDirective,
  AbstractControl,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlContainer
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IFormatInput } from '../common/IFormatInput';

@Component({
  selector: 'dia-input',
  standalone: true,
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule, MatTooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Inputs)
    }
  ]
})
export class Inputs implements ControlValueAccessor, OnChanges, OnInit, AfterViewChecked {
  @ViewChild('formatInput', { static: false }) formatInput: ElementRef | undefined;
  @ViewChild('input', { static: false }) input: ElementRef | undefined;
  @ViewChild('computeWidth', { static: false }) computeWidth: ElementRef | undefined;

  @Input() displayAsLabel: boolean = false;
  @Input() label: string= '';
  @Input() required: boolean|undefined = false;
  @Input() format: string= '';
  @Input() placeholder: string|undefined= '';
  @Input() hidden: string|undefined= '';
  @Input() description: string|undefined= '';
  @Input() disabled: boolean|undefined = false;
  @Input() isDatePicker: boolean = false;
  @Input() readonlyInput: boolean|undefined = false;
  @Input() readonly: boolean|undefined = false;
  @Input() type: string|undefined= '';
  @Input() min: number= 0;
  @Input() max: number= 0;
  @Input() minDate: number= 0;
  @Input() maxDate: number= 0;
  @Input() maxLength: number | undefined;
  maxLengthFormat: number | undefined;
  @Input() minLength: number | undefined;
  @Input() unit: string= '';
  @Input() name: string|undefined= '';
  @Input() cancellable: boolean = false;
  @Input() searching: boolean = false;
  @Input() value: string | boolean|undefined= '';
  @Input() customFormat: IFormatInput | undefined;
  @Input() icon: string | undefined;
  @Input() errorMsg: string | undefined;
  @Input() isError: boolean = false;
  @Output() valueChange = new EventEmitter<any>();
  @Output() cancelValue = new EventEmitter<any>();
  formattedValue: string = '';
  @Input() defaultControl: boolean = false;
  @Input() matDatepicker: any;
  @Output() dateChange = new EventEmitter<any>();
  @Input() visualHelpDisabled: boolean|undefined = false;
  @Input() isDateControl: boolean = false;
  currentControl: AbstractControl | undefined;
  @Input() formControl: FormControl = new FormControl();
  @Output() iconWasClicked = new EventEmitter<any>();
  @Output() wasDblClicked = new EventEmitter<any>();
  @Input() iconAction: (() => any) | undefined;
  tooltipText: string = '';
  onChange = (_: any) => {};
  onTouched = (_: any) => {};

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

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
      const form = this.controlContainer.control as FormGroup;
      const lbl = this.el.nativeElement.getAttribute('formControlName');
      if (form) {
        const control = form.controls[lbl] as FormControl;
      }
    }
  }

  f_dateChange() {
    this.dateChange.emit();
  }

  gets(obs: any) {
    if (obs) {
      return obs;
    } else {
      return {};
    }
  }

  ngAfterViewChecked(): void {
    if (this.value && (this.format || this.customFormat)) {
      if (!((this.formattedValue + '').endsWith('.'))) {
        this.formattedValue = this.transform(this.value);
      }
    }
    if (this.controlContainer && this.el) {
      let fname = this.el.nativeElement.getAttribute('formControlName');
      fname = fname ? fname : this.el.nativeElement.getAttribute('ng-reflect-name');
      fname = fname ? fname : (this.input ? this.input.nativeElement.name : undefined);
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
    if (!this.visualHelpDisabled && this.textOverflow()) {
      this.tooltipText = this.value + '';
    } else {
      this.tooltipText = '';
    }
  }

  textOverflow() {
    const currentWitdh = this.formatInput
      ? this.formatInput.nativeElement.clientWidth
      : this.input?.nativeElement.clientWidth;
    return this.computeWidth && this.computeWidth.nativeElement.clientWidth > (currentWitdh || 0) + 5;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.label === 'Montant') {
      //console.log(changes);
    }
    if (
      (this.format || this.customFormat) &&
      changes['value'] &&
      changes['value'].currentValue !== this.parse(this.formattedValue)
    ) {
      this.formattedValue = this.transform(changes['value'].currentValue);
      if (this.formatInput) {
        this.formatInput.nativeElement.value = this.formattedValue;
      }
    }
  }

  change(newValue: any) {
    this.writeValue(newValue);
    this.valueChange.emit(newValue);
    this.onChange(this.value);
    if ((this.format || this.customFormat) && this.formatInput) {
      this.formatInput.nativeElement.value = this.formattedValue;
    }
  }

  changeFormat(newValue: any) {
    this.formattedValue = this.transform(newValue);
    const offset = this.formattedValue.split(' ').length - 1;
    if (offset && offset > 0 && this.maxLength) {
      this.maxLengthFormat = this.maxLength + offset;
    }
    const unformattedValue = this.parse(this.formattedValue);
    this.change(unformattedValue);
  }

  cancel(data: any) {
    this.formattedValue = '';
    this.value = '';
    this.cancelValue.emit(data);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  transform(val: any) {
    let valStr = '';
    let arr;
    if (this.format) {
      switch (this.format) {
        case 'siren':
          valStr = val + '';
          valStr = this.parse(valStr) + '';
          arr = valStr.split('');
          valStr = '';
          arr.map((c: string) => {
            valStr += c;
            if (
              valStr.replace(/ /g, '').length % 3 === 0 &&
              arr.length > valStr.replace(/ /g, '').length
            ) {
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
          arr.reverse().map((c: string) => {
            valStr += c;
            if (
              valStr.replace(/ /g, '').length % 3 === 0 &&
              arr.length > valStr.replace(/ /g, '').length
            ) {
              valStr += ' ';
            }
          });
          valStr = valStr.split('').reverse().join('');
          if (decPart && decPart !== '') {
            valStr += '.' + decPart;
          }
          break;
      }
    } else {
      valStr = this.customFormat ? this.customFormat.transform(val) : val;
    }
    return valStr;
  }

  parse(val: any) {
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
    } else {
      valStr = this.customFormat ? this.customFormat.parse(val) : val;
    }
    return valStr;
  }

  iconClicked(e: Event) {
    this.iconWasClicked.emit(true);
    if (this.iconAction) {
      this.iconAction();
    }
  }

  dblClicked(e: Event) {
    this.wasDblClicked.emit(true);
  }
}
