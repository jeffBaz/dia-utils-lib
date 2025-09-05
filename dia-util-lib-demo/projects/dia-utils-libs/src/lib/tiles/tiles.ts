import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input, HostListener, AfterViewInit, ViewChildren, QueryList, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Scroll } from '../scroll/scroll';

export interface Tile {
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

@Component({
  selector: 'dia-tiles',
  templateUrl: './tiles.html',
  styleUrls: ['./tiles.scss'],
  standalone: true,
  imports: [CommonModule, Scroll],
})
export class Tiles implements OnInit, AfterViewInit, OnChanges {
  tunnelLeft: number | undefined = undefined;
  @ViewChild('scenariMask', { read: ElementRef, static: true }) tunnel: ElementRef = new ElementRef(null);
  @ViewChild('hoster', { read: ElementRef, static: true }) hoster: ElementRef = new ElementRef(null);
  @ViewChild('scroller', { read: ElementRef, static: true }) scroller: ElementRef = new ElementRef(null);
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef = new ElementRef(null);
  @ViewChild('scenariContainer', { read: ElementRef, static: true }) scenariContainer: ElementRef = new ElementRef(null);
  @ViewChildren('tile', { read: ElementRef }) tile: QueryList<ElementRef> | undefined = undefined;
  @Input() tiles: any | Tile[] = [];
  @Input() selector: boolean = false;
  @Input() autofill: boolean = false;
  @Input() emptyTpl!: TemplateRef<any>;
  @Input() tileTemplate!: TemplateRef<any>;
  @Input() title: string = '';
  @Input() maxTiles: number | undefined = undefined;
  @Input() wheelSpace: number = 120;
  @Output() hasLeft = new EventEmitter();
  @Output() selection = new EventEmitter<any>();
  @Output() hasClicked = new EventEmitter();
  @Output() maxBound = new EventEmitter<boolean>();
  @Output() minBound = new EventEmitter<boolean>();
  maxLength: number = 0;
  @Input() autoCompute: boolean = true;
  @Input() forceActive: boolean = true;
  @Input() circularEffect: boolean = false;
  active: boolean = false;
  currentContentWidth: number | null = null;
  currentContentHeight: number | null = null;
  isMobile: boolean = false;
  tileWidth: number = 0;
  tileHeight: number = 0;
  maxTile: number | undefined = undefined;
  carouselIndex: number | undefined = undefined;
  scrollAngle: number = 0;
  translateX: string | undefined = undefined;
  translateY: string | undefined = undefined;
  @Input() scroll: number = 90;
  grabbing: boolean = false;
  @Input() pourcent: number = 0.8;
  @Input() minDiametre: number = 0;
  @Input() maxDiametre: number = 0;
  @Input() forcedDiametre: number | undefined = undefined;
  diametre: number = 0;
  tetas: any[] = [];
  init: boolean = false;
  ready: boolean = false;
  isCircularInitated: boolean = false;
  selectedEvent = new EventEmitter();
  selectedTile: any = undefined;
  currentEvent: any = undefined;
  isBoundMax: boolean = false;
  isBoundMin: boolean = false;
  @Input() debug: boolean = true;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tiles'] && changes['tiles'].currentValue) {
      if(this.circularEffect && this.tiles?.filter((tile: any) => tile.empty).length==0){
        this.computeSlider();
      }
      if(this.hoster && this.tiles && this.tileWidth) {
        this.hoster.nativeElement.style.width = Math.max(
          this.tiles.length * this.tileWidth / Math.PI * 1.3,
          0
        ) + 'px';
      }
    }
    if((changes['forcedDiametre'] && changes['forcedDiametre'].currentValue && !changes['forcedDiametre'].isFirstChange())
    ||(changes['minDiametre'] && changes['minDiametre'].currentValue && !changes['minDiametre'].isFirstChange())
    ||(changes['maxDiametre'] && changes['maxDiametre'].currentValue && !changes['maxDiametre'].isFirstChange())){
      this.computeSlider();
    }
  }
  next(){
    const activeTiles = this.tiles.filter((_: any) => !_.empty).length;
    const maxangle = (activeTiles - 1) * this.scrollAngle;
    const minangle = 90;
    this.scroll += this.scrollAngle;
    this.rotate();
  }
  prev(){
    const activeTiles = this.tiles.filter((_: any) => !_.empty).length;
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
  addEmptyTiles(q:number) {
    for (let i = this.tiles.length - 1; i < 31; i++) {
      this.tiles.push({ empty: true });
    }
    const diam = this.tiles.length * this.tileWidth / Math.PI * 1.3;
    this.hoster.nativeElement.style.width = Math.round(diam) + 'px';
  }
  isIosBrowser() {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }
  isMobileBrowser() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }
  getDiametre(){
    return  this.forcedDiametre? this.forcedDiametre : this.minDiametre>this.hoster.nativeElement.clientWidth ? this.minDiametre: this.maxDiametre<this.hoster.nativeElement.clientWidth? this.maxDiametre: this.hoster.nativeElement.clientWidth;
  }
  getFirstTile(){
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
  @HostListener('document:resize', ['$event'])
  resetTunnel(e?:any) {
    this.tunnelLeft = 0;
    this.tunnel.nativeElement.style.left = this.tunnelLeft + 'px';
    this.computeSlider();
  }
  getMaxTiles(): number {
    this.getFirstTile();
    let widthTile;
    if (this.tile && this.tile.first) {
      widthTile = this.tile.first.nativeElement.clientWidth;
      this.log('largeur tiles: '+widthTile)
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
  computeAngle(c:any, i:number, tube:any, num:number) :number{
    return (360 / num * i);
  }
  computeLeft(c:any, i:number, tube:any, num:number) {
    let teta = this.computeAngle(c, i, tube, num);
    return (this.getDiametre() - this.getDiametre() * Math.cos(teta * Math.PI / 180)) / 2;
  }
  computeBottom(c:any, i:number, tube:any, num:number) {
    let teta = this.computeAngle(c, i, tube, num);
    return (this.getDiametre() - this.getDiametre() * Math.sin(teta * Math.PI / 180)) / 2;
  }
  computeSlider(init?:boolean) {
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
      this.log('boxing: '+ boxW)
      this.currentContentWidth = boxW;
      let boxH = this.tunnel.nativeElement.clientHeight;
      if (this.scroller && this.scroller.nativeElement && this.scroller.nativeElement.children.length > 0) {
        this.scroller.nativeElement.children[0].style.height = boxH + 'px'
        this.scroller.nativeElement.children[0].style.width = boxW / 3 + 'px'
        this.scroller.nativeElement.children[1].style.height = boxH + 'px'
        this.scroller.nativeElement.children[1].style.width = boxW / 3 + 'px'
        this.scroller.nativeElement.children[0].style.top = '-' + (boxH + 32) / 2 + 'px'
        this.scroller.nativeElement.children[1].style.top = '-' + (boxH + 32) / 2 + 'px'
      }
      if (this.circularEffect) {
        this.getDiametre();
        this.translateY = 1.7 * this.getDiametre() + 'px';
        this.translateX = (this.getDiametre() * 1.2 + boxW) + 'px';
      }
      if (this.forceActive && this.tunnel.nativeElement.clientWidth > this.getDiametre()) {
        this.active = true;
      } else {
        this.active = false;
      }
      if (this.autofill && !this.circularEffect) {
        if (this.tiles.filter((_: any) => _.empty).length > 0 && this.tiles.length > this.getMaxTiles()) {
          this.tiles = this.tiles.filter((_: any) => !_.empty);
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
          tmp = this.tiles.map((_: any) => empties.splice(Math.floor(empties.length / 2), 0, _));
          this.tiles = empties;
        }
      }
      if (this.circularEffect) {
        this.refreshCircular();
      }
    }
  }
  scrolledRight(e:any, tar?: any) {
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
      this.log('diametre:'+this.getDiametre());
      this.scenariContainer.nativeElement.style.position = "relative"
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
  scrolledLeft(e: any, tar?: any) {
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
  getSlideDelata(e:any) {
    return e && e.deltaX ? e.deltaX : e ? e : this.autoCompute ? this.currentContentWidth : this.wheelSpace;
  }
  getTar(tar:any, e:any) {
    return this.tunnel.nativeElement;
  }
  left(e:any) {
    this.hasLeft.emit(e);
  }
  clicked(e:any, sc:any) {
    this.log('clicked')
    if( sc.empty){
      this.log('clicked aborted: empty tile')
      return;
    }
    if(this.circularEffect){
      this.scroll = this.tetas[e];
      this.selectedTile = this.tiles[e];
      this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
      this.selection.emit(this.selectedTile);
      this.log(e);
    }
    this.hasClicked.emit(e);
  }
  mouseDown(e:any) {
    this.grabbing = true;
  }
  panStart(e:any) {
    this.grabbing = true;
  }
  mouseUp(e: MouseEvent|null) {
    this.grabbing = false;
    if (this.circularEffect) {
      const activeTiles = this.tiles.filter((_: any) => !_.empty).length;
      const maxangle = (activeTiles - 1) * this.scrollAngle;
      const minangle = 90;
      if (activeTiles === 1) {
        this.scroll = 90;
        this.selectedTile = this.tiles[0];
        this.selection.emit(this.selectedTile);
      } else if (this.tiles.length != activeTiles) {
        const tmp = Math.round((this.scroll) / this.scrollAngle);
        this.scroll = tmp * this.scrollAngle;
        this.scroll = this.scroll > maxangle + minangle ? maxangle + minangle : this.scroll < minangle ? minangle : this.scroll;
        if(this.scroll >= maxangle){
          this.boundMaxReached() ;
        } 
        if( this.scroll<= minangle){
          this.boundMinReached() ;
        }
        let v = this.scroll;
        let last = null;
        for (let i = 0; i < this.tetas.length; i++) {
          const cur = Math.abs(this.tetas[i] - v);
          if (last === null || cur <= last ) {
            last = cur;
            this.selectedTile = this.tiles[i];
            this.selection.emit(this.selectedTile);
          }
        }
      } else {
        this.log(maxangle + " > " + this.scroll + " > " + minangle);
        const multipleTour = Math.round((this.scroll - 90) / 360);
        let last = null;
        let v = multipleTour === 0 ? this.scroll : Math.round(this.scroll / multipleTour);
        for (let i = 0; i < this.tetas.length; i++) {
          const cur = Math.abs(this.tetas[i] - v);
          if (last === null || cur <= last ) {
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
  mouseLeave(e: any) {
    if (this.grabbing) {
      this.grabbing = false;
      this.mouseUp(e);
    }
  }
  mouseMove(e: MouseEvent) {
    if (this.grabbing && !this.isIosBrowser()) {
      this.rotateBox(e);
      e.stopPropagation();
    }
  }
  panMoving(e: { srcEvent: PointerEvent }|any) {
    if (this.grabbing) {
      const ev = e as any;
      if (!e.srcEvent.movementX) {
        this.scroll += this.scrollAngle * ev.overallVelocityX *0.1;
        this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
      } else {
        this.rotateBox(e.srcEvent, e);
      }
    }
  }
  panEnd(e: { srcEvent: PointerEvent }|any) {
    this.grabbing = false;
    this.mouseUp(e.srcEvent)
  }
  onmouseWheel(event: any) {
    if (this.circularEffect) {
      this.rotateBox(event)
    } else {
      event.preventDefault();
      event.wheelDelta > 0 ? this.scrolledLeft(Math.abs(event.wheelDelta), event.currentTarget) : this.scrolledRight(Math.abs(event.wheelDelta), event.currentTarget);
    }
  }
  rotateBox(event : any, eParent?: any) {
    this.log(event);
    if(event.movementX && this.circularEffect){
      this.scroll += this.scrollAngle * event.movementX * 0.01;
      this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
    }
  }
  isSameEventAndTarget(e: any) {
    return e && this.currentEvent && this.currentEvent.type === e.type;
  }
  getDelta(e: any, field: string) {
    return e && this.currentEvent ? e[field] - this.currentEvent[field] : 0;
  }
  rotate(){
    const activeTiles = this.tiles.filter((_: any) => !_.empty).length;
    const maxangle = (activeTiles - 1) * this.scrollAngle;
    const minangle = 90;
    if(this.scroll > maxangle){
      this.scroll = maxangle;
     this.boundMaxReached()
    }else if(this.scroll < minangle){
      this.scroll = minangle;
    this.boundMinReached()
    }else{
      this.isBoundMax = false;
      this.isBoundMin = false;
    }
    this.scenariContainer.nativeElement.style.transform = ' rotate(' + this.scroll + 'deg)';
  }
  log(any: any){
    if(this.debug){
      console.log(any);
    }
  }
  boundMaxReached(){
    this.isBoundMax = true;
    this.maxBound.emit(true);
  }
  boundMinReached(){
    this.isBoundMin = true;
    this.minBound.emit(true);
  }
}
