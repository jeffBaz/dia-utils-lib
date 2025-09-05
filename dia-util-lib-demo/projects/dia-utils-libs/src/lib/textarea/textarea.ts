import { AfterViewChecked, Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Input, Output, EventEmitter, Optional, Host, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dia-textarea',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss'
})
export class Textarea implements ControlValueAccessor, OnChanges, OnInit, AfterViewChecked {
  @ViewChild('textarea', { static: false })
  input!: ElementRef;
  @Input() label: string='';
  @Input() unit: string|undefined;
  @Input() placeholder: string|undefined;
  @Input() description: string|undefined;
  @Input() value: string|undefined;
  @Input() readonly: boolean|undefined;
  @Input() innerHTML: string|undefined;
  @Input() isTextArea = true;
  @Output() valueChange = new EventEmitter();
  @Input() maxLength: number|undefined;
  @Input() minrows: number|undefined;
  @Input()
  required: boolean|undefined;
  @Input()
  name: string|undefined;
  @Input()
  disabled: boolean|undefined;
  @Input()
  defaultControl: boolean|undefined;
  @Input()
  customFormat: any;
  @Input()
  formControlName: string='';
  @Input()
  formGroup: any;
  @Input()
  iconAction!: (...args: any[]) => any|undefined;
  @Input()
  icon:string='';
  @Input()
  dblClick!: (...args: any[]) => any;
  @Input()
  countDown: boolean|undefined;
  currentControl: AbstractControl|undefined;
  count = 0;
  formControl: FormControl | undefined = new FormControl();
  onChange = (...args: any[]) => { };
  onTouched = (...args: any[]) => { };

  constructor(private el: ElementRef,
    @Optional() @Host() @SkipSelf()
    private controlContainer: ControlContainer) { }
  ngAfterViewChecked(): void {
    if (this.controlContainer && this.el) {
      let fname = this.el.nativeElement.getAttribute('formControlName');
      fname = fname ? fname : this.el.nativeElement.getAttribute('ng-reflect-name');
      fname = fname ? fname : this.input.nativeElement.name;
      const fgroupDirective = this.controlContainer  as FormGroupDirective;
      if (fgroupDirective && fgroupDirective['form']) {
        this.currentControl = fgroupDirective['form'].controls[fname];
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
  ngOnInit(): void {
    if (this.defaultControl) {
      this.formControl = new FormControl(this.value);
      if (this.input) {
        this.input.nativeElement.formControl = this.formControl;
      }
    }
    if (this.controlContainer) {
      const form = this.controlContainer.control as FormGroup;
      const lbl = this.el.nativeElement.getAttribute('formControlName');
      if (form) {
        const control = form.controls[lbl ? lbl : this.formControlName] as FormControl;
      }
      /*control.valueChanges.subscribe(_=>{
        //this.value = _;
      });*/

    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && changes['value'].currentValue) {
      this.count = this.value?.length||0;
    }
  }
  change(newValue: any) {
    this.writeValue(newValue);
    // this.value = newValue;
    this.valueChange.emit(newValue);
  }
  changeTextAreaValue() {
    this.valueChange.emit(this.value);
  }
  writeValue(val: any): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  /* setDisabledState?(isDisabled: boolean): void {
     throw new Error("Method not implemented.");
   }*/
  iconClicked(item?: any) {
    return this.iconAction ? this.iconAction(item) : null;
  }
  dblClicked(item?: any) {
    return this.dblClick ? this.dblClick(item) : null;
  }
}