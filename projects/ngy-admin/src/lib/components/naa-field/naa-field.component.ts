import { Component, OnInit, Input } from '@angular/core';

// @dynamic
@Component({
  selector: 'app-naa-field',
  templateUrl: './naa-field.component.html',
  styleUrls: ['./naa-field.component.scss']
})
export class NaaFieldComponent implements OnInit {

  @Input() value: any;
  @Input() data: any;
  @Input() field: any;

  constructor() { }

  ngOnInit(): void { }

  get range(): string {
    return this.field.range;
  }

  get name(): string {
    return this.field.name;
  }
}
