import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Inputs } from '../input/input';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'dia-input-date-picker',
  imports: [Inputs, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule],
  templateUrl: './input-date-picker.html',
  styleUrl: './input-date-picker.css',
  providers: [
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
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputDatePicker implements ControlValueAccessor, OnChanges, OnInit  {

  @Input() label: string='';
  @Input() customDatePicker: boolean=false;
  @Input() placeholder = 'Date';
  @Input() minDate: Date|undefined;
  @Input() maxDate: Date|undefined;
  @Output() dateChange = new EventEmitter();
  popupVisible = false;
  formControlDate = new FormControl();
  // Warning localDate via l'input date est la vraie valeur prise en compte pour la date
  localDate: Date|undefined;
  disabledf = false;
  onChanged = (_?: any) => {};
  onTouched = (_?: any) => {};
  //value n'est pas la valeur utilisé par le composant
  @Input()
  value: Date|undefined;
  @Output()
  valueChange: EventEmitter<Date> = new EventEmitter();

  @Input()
  required: boolean=false;

  constructor(private dateAdapter: DateAdapter<any>) {
    dateAdapter.setLocale('fr');
  }

  ngOnInit(): void {
    if (this.required) {
      this.formControlDate.setValidators(Validators.required);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Fix JIRA 848
    if (changes['value'] && changes['value'].currentValue === undefined) {
      this.formControlDate.reset();
    }
    if (changes['value'] && changes['value'].currentValue ) {
      this.formControlDate.reset();
    }

  }

  writeValue(obj: any): void {
    this.value = obj;
    this.date =  this.value;// ? this.value.getTime() : this.value;
  }
  registerOnChange(fn: any): void {
   this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  @Input() // getter and setter de la date
  set date(date) {
    if (date !== null && date !== undefined) {
      this.localDate = new Date(date);
    } else {
      delete this.localDate ;
    }
    this.formControlDate = new FormControl(this.localDate);
  }
  get date() {
    return this.localDate;
  }

  @Input()
  set disabled(disabled) {
    this.disabledf = disabled;
    if (this.disabledf) {
      this.formControlDate.disable();
    } else {
      this.formControlDate.enable();
    }
  }

  get disabled() {
    return this.disabledf;
  }

  // détection de changement et renvoi automatique de la nouvelle valeur.
  onChange() {
    if (this.formControlDate.value === null ) {
      delete this.localDate ;
    } else {
      this.localDate = new Date(this.formControlDate.value);
    }
    this.writeValue(this.localDate);
    this.dateChange.emit(this.localDate);
    this.onChanged(this.value);
  }
}

