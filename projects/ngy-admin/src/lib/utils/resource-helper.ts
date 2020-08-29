import { Injectable } from '@angular/core';

// @dynamic
@Injectable({
  providedIn: 'root'
})
export class ResourceHelper {

  constructor() { }

  // TODO : define resource type
  getId(resource: any) {
    return resource.id;
  }

  // TODO : define resource type
  getName(resource: any) {
    return resource.name;
  }
  
  // TODO : define resource type
  getTitle(resource: any) {
    return resource.title;
  }

  getFields(resource: any): any[] {
    return resource.readableFields;
  }

  getWritableFields(resource: any): any[] {
    return resource.writableFields;
  }
}
