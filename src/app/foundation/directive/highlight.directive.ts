import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  // 背景色改变
  // constructor(el: ElementRef) {
  //   el.nativeElement.style.backgroundColor = 'yellow';
  // }

  // 用户交互
  @Input('appHighlight') highlightColor: string
  @Input('defaultColor') defaultColor: string
  constructor(private el: ElementRef) {
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }



}
