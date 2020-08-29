import { Pipe, PipeTransform } from '@angular/core';
import { AdminRouteGenerator } from '../router/admin-route-generator';

// @dynamic
@Pipe({
  name: 'naaResourceLink'
})
export class NaaResourceLinkPipe implements PipeTransform {

  constructor(private routeGenerator: AdminRouteGenerator) {}

  transform(resource: any): any {
    return this.routeGenerator.generateEntryRoute(resource);
  }

}
