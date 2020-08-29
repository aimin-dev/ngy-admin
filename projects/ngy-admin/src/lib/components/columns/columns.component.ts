import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// @dynamic
@Component({
  selector: 'naa-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  @Input() resource: any;
  @Output() columnsChange: EventEmitter<string[]> = new EventEmitter();
  fields: any[] = [];

  visibilityForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.resource) {
      this.fields = this.resource.readableFields;
      this.fields.forEach(field => this.visibilityForm.addControl(field.name, this.fb.control(true)));
      // watch visibility changes
      this.visibilityForm.valueChanges.subscribe((value) => {
        this.emit();
      });
    }
  }

  emit(): void {
    const value = this.visibilityForm.value;
    this.columnsChange.emit(this.resource.readableFields.map(field => field.name).filter(field => field && value[field]));
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    this.emit();
  }

  isControlDisabled(field: any): boolean {
    const value = this.visibilityForm.value;
    for (const key in value) {
      if ((key !== field.name) && value[key]) {
        return false;
      }
    }

    return true;
  }
}
