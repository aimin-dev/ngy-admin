import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngya-admin',
  template: `
    <p>
      ngy-admin works!
    </p>
    <button mat-flat-button color="primary">Hello World!</button>
  `,
  styles: [
  ]
})
export class NgyAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
