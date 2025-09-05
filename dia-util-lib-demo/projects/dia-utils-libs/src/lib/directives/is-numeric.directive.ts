import {
    Directive,
    ElementRef,
    Renderer2,
    HostListener,
    Input,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[appIsNumeric]'
})
export class IsNumericDirective {
    regExIsNum = new RegExp('^[0-9]d{0,2}$');
    regExIsNumber = new RegExp('^[0-9]*$');
    regExIsAlphabet = new RegExp('[A-Za-z]');
    component: any;
    nextValue: string='';
    @Input() isDecimal: boolean|undefined=false;
    @Input() disable: boolean|undefined=false;

    isControl = false;
    @Input() appIsNumeric: string='';
    constructor(private el: ViewContainerRef, private renderer: Renderer2) {

    }

    @HostListener('keydown', ['$event'])
    onkeyup($e: KeyboardEvent) {
        if (!this.disable) {
            if (!this.regExIsNum.test($e.key) && !this.isControl) {
                //console.log($e.key);
                if (
                    ($e.key.length === 1 ||
                        $e.key === 'Multiply' ||
                        $e.key === 'Subtract' ||
                        $e.key === 'Add' ||
                        $e.key === 'Divide') &&
                    !($e.key === '.' && this.isDecimal)
                ) {
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
    @HostListener('paste', ['$event']) blockPaste(e:any) {
        const val = e.clipboardData.getData('Text').split(' ').join('');
        if (!this.disable && e.clipboardData && !this.regExIsNumber.test(val)) {
            e.preventDefault();
        }
    }
}
