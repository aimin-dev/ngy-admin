import { Pipe, PipeTransform } from '@angular/core';
import { NaaTitleService } from '../core/naa-title.service';

// @dynamic
@Pipe({
  name: 'naaFieldLabel'
})
export class NaaFieldLabelPipe implements PipeTransform {

  constructor(private naaTitle: NaaTitleService) {}

  transform(field: any): string {
    try {
      return this.naaTitle.getFieldLabel(field);
    } catch (e) {}

    return field.name;
  }

}
