import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPrev]',
  standalone: true
})
export class PrevDirective {

  constructor(private elm: ElementRef) { 

  }

  @HostListener('click')
  prevFun(){
    
    var elm = this.elm.nativeElement.parentElement.parentElement.children[0];
    let item = elm.getElementsByClassName("item");
    elm.prepend(item[item.length-1]);
  }

}
