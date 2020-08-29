import { Injectable, Inject } from '@angular/core';
import { Router, Routes, Route } from '@angular/router';
import { ResourceHelper } from '../utils/resource-helper';
import { Observable } from 'rxjs';
import { ItemResolver } from '../router/item-resolver';
import {
  CREATE_ROUTE,
  EDIT_ROUTE,
  SHOW_ROUTE,
  LIST_ROUTE,
} from '../router/routes';
import { NAA_BASE_PATH } from '../config/naa-base-path';
import { AdminComponent } from '../components/admin/admin.component';

// @dynamic
@Injectable({
  providedIn: 'root'
})
export class AdminRouter {

  api: any;
  resourcesRoutes: Routes = [];

  constructor(
    private router: Router,
    private resourceHelper: ResourceHelper,
    @Inject(NAA_BASE_PATH) private basePath
  ) { }

  init(api: any): void {
    this.api = api;
    this.registerRoutes();
  }

  // TODO : declare Api type
  registerRoutes(): void {
    // update resourcesRoutes
    this.api.resources.forEach(resource => this.resourcesRoutes.push(this.generateResourcesRoutes(resource)));

    // add naa routes to router config
    this.router.config.push({
      path: this.basePath,
      component: AdminComponent,
      children: this.resourcesRoutes,
      data: {
        resources: this.api.resources
      }
    });

    console.info('registering routes...', this.router.config, this.api);
  }

  generateResourcesRoutes(resource: any): Route {
    const routes: Routes = [];
    const resourceId = this.resourceHelper.getId(resource);

    for (let operation of resource.operations) {
      const method = operation.method;
      switch (method) {
        case 'PUT':
          routes.push({...EDIT_ROUTE});
          break;
        case 'POST':
          routes.push({...CREATE_ROUTE});
          break;
        case 'GET':
          if (operation.returns === resourceId) {
            routes.push({...SHOW_ROUTE});
          } else {
            routes.push({...LIST_ROUTE});
          }
          break;
        default:
          break;
      }
    }

    return {
      path: this.resourceHelper.getName(resource),
      children: routes,
      data: {
        label: this.resourceHelper.getTitle(resource),
        resource,
      }
    };
  }

  getResourcesLinks(): {label: string, link: any}[] {
    const links = [];
    this.resourcesRoutes.forEach(route => links.push({
      label: route.data.label,
      resource: route.data.resource,
      link: [this.basePath ? this.basePath : '/', route.path]
    }));

    return links;
  }
}
