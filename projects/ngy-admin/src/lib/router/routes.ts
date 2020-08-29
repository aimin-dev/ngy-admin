/*
 * @Author: stephan <m6ahenina@gmail.com>
 * @Date: 2020-07-16 22:43:20
 * @Last Modified by: stephan <m6ahenina@gmail.com>
 * @Last Modified time: 2020-08-01 23:39:16
 */

import { ListComponent } from '../components/list/list.component';
import { EditComponent } from '../components/edit/edit.component';
import { CreateComponent } from '../components/create/create.component';
import { ShowComponent } from '../components/show/show.component';
import { ItemResolver } from '../router/item-resolver';
import { Route } from '@angular/router';

export const EDIT_ROUTE: Route = {
  path: ':id',
  component: EditComponent,
  resolve: {
    item: ItemResolver
  }
};

export const CREATE_ROUTE: Route = {
  path: 'create',
  component: CreateComponent
};

export const SHOW_ROUTE: Route = {
  path: ':id/show',
  component: ShowComponent,
  resolve: {
    item: ItemResolver
  }
};

export const LIST_ROUTE: Route = {
  path: '',
  component: ListComponent
};
