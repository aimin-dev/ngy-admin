/*
 * @Author: stephan <m6ahenina@gmail.com>
 * @Date: 2020-07-21 08:18:30
 * @Last Modified by: stephan <m6ahenina@gmail.com>
 * @Last Modified time: 2020-08-01 23:46:47
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminHttpOptions {
  page?: number;
  itemsPerPage?: number;
  order?: string;
  orderDir?: 'asc'|'desc'|string;
  search?: {[key: string]: any};
}

// @dynamic
@Injectable({
  providedIn: 'root'
})
export class AdminHttpClient {

  defaultOptions: AdminHttpOptions = {
    page: 1,
    itemsPerPage: 10,
  };

  constructor(private http: HttpClient) {}

  getItem(resource: any, id: number): Observable<any> {
    return this.http.get<any>(resource.url + '/' + id);
  }

  getCollections(resource: any, options: AdminHttpOptions = this.defaultOptions): Observable<any> {
    const httpOptions: any = {};
    let params = new HttpParams();

    if (options.search) {
      for (const key in options.search) {
        if (options.search[key] !== null) {
          params = params.set(key, options.search[key].toString());
        }
      }
    }
    if (options.order) {
      params = params.set(`order[${options.order}]`, options.orderDir || 'asc');
    }
    if (options.page) {
      params = params.set('page', options.page.toString());
    }
    if (options.itemsPerPage) {
      params = params.set('itemsPerPage', options.itemsPerPage.toString());
    }

    httpOptions.params = params;

    return this.http.get(resource.url, httpOptions);
  }
}
