import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]',
  standalone: true,
})
export class NextDirective {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    
  }

  @HostListener('click')
  nextFunc() {
    var el = this.el.nativeElement.parentElement.parentElement.children[0];
    var item = el.getElementsByClassName("item")
    el.append(item[0])
  }
}
