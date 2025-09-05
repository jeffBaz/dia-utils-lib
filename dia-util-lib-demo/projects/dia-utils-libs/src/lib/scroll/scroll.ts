import { CommonModule } from "@angular/common";
import { Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'dia-scroll',
  standalone: true,
  templateUrl: './scroll.html',
  styleUrls: ['./scroll.css'],
  imports: [MatIconModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Scroll)
    }
  ]
})
export class Scroll implements OnInit {
  @Input()
  scrolledUpDisabled = false;
  @Input()
  scrolledDownDisabled = false;
  @Input()
  scrolledLeftDisabled = false;
  @Input()
  scrolledRightDisabled = false;
  @Output()
  scrolledUp = new EventEmitter();
  @Output()
  scrolledDown = new EventEmitter();
  @Output()
  scrolledLeft = new EventEmitter();
  @Output()
  scrolledRight = new EventEmitter();
  @Input()
  scrollBuffer = 500;
  scrollBuffered = false;
  @Input()
  vertical = true;
  @Input()
  horizontal = true;
  @Input()
  forced = false;
  constructor() { }

  @HostListener('mousewheel', ['$event'])
  onmouseWheel(event:any){
    if((event.wheelDelta>0 && !this.scrolledDownDisabled)||(event.wheelDelta<0 && !this.scrolledUpDisabled)){
      if(!this.scrollBuffered){
        this.scrollBuffered = true;
        if(this.vertical){
          this.scrolled(event.wheelDelta>0, event.wheelDelta);
        }
        if(this.horizontal){
          this.scrolledH(event.wheelDelta>0, event.wheelDelta);
        }
        setTimeout(()=>this.scrollBuffered = false, this.scrollBuffer);
      }
    }
  }

  onmouseoverup(event:any){
    if(this.scrolledUpDisabled){
      this.scrolled(event.wheelDelta>0, event.wheelDelta);
    }
  }
  onmouseoverdown(event:any){
    if(this.scrolledDownDisabled){
       this.scrolled(event.wheelDelta>0, event.wheelDelta);
    }
  }
  ngOnInit() {
  }
  scrolled(up:any, wheel?:any){
    if(up){
      this.scrolledUp.emit(Math.abs(wheel));
    }else{
      this.scrolledDown.emit(Math.abs(wheel));
    }
  }
  scrolledH(up:any, wheel?:any){
    if(up){
      this.scrolledLeft.emit(Math.abs(wheel));
    }else{
      this.scrolledRight.emit(Math.abs(wheel));
    }
  }
}