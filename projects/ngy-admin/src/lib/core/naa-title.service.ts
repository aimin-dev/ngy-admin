import { Injectable } from '@angular/core';
import pluralize from 'pluralize';
import { capitalCase } from 'change-case';


// @dynamic
@Injectable({
  providedIn: 'root'
})
export class NaaTitleService {

  constructor() { }

  getListTitle(resource: any): string {
    return pluralize(resource.title);
  }

  getResourceLabel(resource: any): string {
    return pluralize(resource.title);
  }

  getCreateTitle(resource: any): string {
    return `Create ${pluralize.singular(resource.title)}`;
  }

  getEditTitle(resource: any): string {
    return `Edit ${pluralize.singular(resource.title)}`;
  }

  getFieldLabel(field: any): string {
    return capitalCase(field.name);
  }
}
