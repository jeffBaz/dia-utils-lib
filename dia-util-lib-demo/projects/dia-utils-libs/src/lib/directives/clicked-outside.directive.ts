import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  Input,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective implements AfterViewInit {
  @Input() looseCheck = false;
  @Input() trackEphemeraElement = false;
  @Input() hasleftFor: number=0;
  @Output() hasLeft = new EventEmitter<any>();
  @Output() clickedOutside = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  public lastElement: any;
  public componentList: ElementRef[] = [];
  @Input() compList: ElementRef[] = [];
  @Output() compListChange = new EventEmitter<ElementRef[]>();
  mouseIsOver = false;
  mouseleavedAlready = false;
  overSuspended = false;
  @Input() debug = false;
  index = 0;
  constructor(private el: ElementRef) {}
  ngAfterViewInit() {
    this.componentList.push(this.el);
  }
  @HostListener('document:click', ['$event.target'])
  public onclick(targetElement: any) {
    if (!this.contains(targetElement) && (this.isInDocument(targetElement) || this.looseCheck)) {
      this.clickedOutside.emit({ target: targetElement, src: this.el.nativeElement });
      if ((this.lastElement && this.contains(this.lastElement)) || (this.trackEphemeraElement && this.lastElement && this.lastElement.usedTobePartOf)) {
        this.blur.emit({ target: targetElement, src: this.el.nativeElement, last: this.lastElement });
      }
    }
    this.lastElement = targetElement;
  }
  isInDocument(targetElement: any) {
    return targetElement === document.body ? false : document.body.contains(targetElement);
  }
  contains(el: any) {
    let contains = false;
    this.componentList.forEach(it => {
      if (it.nativeElement.contains(el)) contains = true;
    });
    this.compList.forEach(it => {
      if (it.nativeElement.contains(el)) contains = true;
    });
    if (this.trackEphemeraElement && contains) {
      el.usedTobePartOf = true;
    }
    if (this.debug) {
      console.log(el.className + ': fait' + (contains ? '' : 'pas') + 'parti');
    }
    return contains;
  }
  @HostListener('mousemove', ['$event.target'])
  onmouseover(el: any) {
    this.mouseIsOver = true;
  }
  @HostListener('mouseleave', ['$event.target'])
  onmouseleave(el?: any) {
    if (this.hasleftFor) {
      if (this.mouseleavedAlready && !this.mouseIsOver && !this.overSuspended) {
        this.hasLeft.emit(el);
      } else if (!this.mouseleavedAlready) {
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
  public suspendOverDetection() {
    this.mouseIsOver = true;
    this.overSuspended = true;
  }
  public resumeOverDetection() {
    this.overSuspended = false;
  }
}
