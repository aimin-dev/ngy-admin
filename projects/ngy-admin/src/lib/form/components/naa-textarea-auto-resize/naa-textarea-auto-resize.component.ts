import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material/input';

// @dynamic
@Component({
  selector: 'naa-textarea-auto-resize',
  template: `
    <textarea matInput
      [id]="id"
      [formControl]="formControl"
      [errorStateMatcher]="errorStateMatcher"
      [cols]="to.cols"
      [rows]="to.rows"
      [placeholder]="to.placeholder"
      [formlyAttributes]="field"
      [matTextareaAutosize]="true"
    >
    </textarea>
  `,
  styles: [
  ]
})
export class NaaTextareaAutoResizeComponent extends FieldType implements OnInit {

  @ViewChild(MatInput) formFieldControl: MatInput;

  ngOnInit(): void {
  }

}
