import { Directive, ViewContainerRef } from '@angular/core';

// @dynamic
@Directive({
  selector: '[naaHost], [naa-host]'
})
export class NaaHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
