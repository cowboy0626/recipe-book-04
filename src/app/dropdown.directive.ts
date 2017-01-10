import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {

  // open class related opened property binding 
  @HostBinding('class.open') get opened(){
    return this.isOpen;
  }

  // action listener click and mouse leave 
  @HostListener('click') open2(){
    this.isOpen = true;
  }
  @HostListener('mouseleave') close2(){
    this.isOpen = false;
  }

  private isOpen = false;

  constructor() { }

}
