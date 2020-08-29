/*
 * @Author: stephan <m6ahenina@gmail.com>
 * @Date: 2020-07-15 00:04:22
 * @Last Modified by: stephan <m6ahenina@gmail.com>
 * @Last Modified time: 2020-08-01 23:46:47
 */

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { AdminHttpClient } from '../http/admin-http-client';

// @dynamic
@Injectable({
  providedIn: 'root',
})
export class ItemResolver implements Resolve<any> {

  constructor(private router: Router, private http: AdminHttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    const id = +route.paramMap.get('id');

    // return of({title: "lorem"});
    return this.http.getItem(route.data.resource, id).pipe(
      take(1),
      mergeMap(item => {
        if (item) {
          return of(item);
        } else { // id not found
          this.router.navigate(['/']);
          return EMPTY;
        }
      })
    );
  }
}
