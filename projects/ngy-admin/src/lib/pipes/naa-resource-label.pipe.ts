import { Pipe, PipeTransform } from '@angular/core';
import { NaaTitleService } from '../core/naa-title.service';

// @dynamic
@Pipe({
  name: 'naaResourceLabel'
})
export class NaaResourceLabelPipe implements PipeTransform {

  constructor(private naaTitle: NaaTitleService) {}

  transform(resource: any): string {
    try {
      return this.naaTitle.getResourceLabel(resource);
    } catch (e) {}
    return resource.title;
  }

}
