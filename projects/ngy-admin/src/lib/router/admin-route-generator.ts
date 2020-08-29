/*
 * @Author: stephan <m6ahenina@gmail.com>
 * @Date: 2020-07-16 22:51:41
 * @Last Modified by: stephan <m6ahenina@gmail.com>
 * @Last Modified time: 2020-08-01 23:46:47
 */

import { Injectable, Inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ResourceHelper } from '../utils/resource-helper';
import { NAA_BASE_PATH } from '../config/naa-base-path';

// @dynamic
@Injectable({
  providedIn: 'root'
})
export class AdminRouteGenerator {

  api: any;
  resourcesRoutes: Routes = [];
  basePath = null;

  constructor(
    private router: Router, 
    private resourceHelper: ResourceHelper,
    @Inject(NAA_BASE_PATH) basePath
  ) {
    this.basePath = '/' + (basePath ? `${basePath}/` : '');
  }

  generateEntryRoute(resource: any): any {
    return [this.basePath, this.resourceHelper.getName(resource)];
  }

  generateEditRoute(resource: any, id: number): any {
    return [this.basePath, this.resourceHelper.getName(resource), id];
  }

  generateShowRoute(resource: any, id: number): any {
    return [this.basePath, this.resourceHelper.getName(resource), id, 'show'];
  }

  generateCreateRoute(resource: any): any {
    return [this.basePath, this.resourceHelper.getName(resource), 'create'];
  }
}
