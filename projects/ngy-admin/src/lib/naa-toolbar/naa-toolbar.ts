import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// @dynamic
@Injectable({
  providedIn: 'root'
})
export class NaaToolbar {

  private title$ : BehaviorSubject<string> = new BehaviorSubject('NGX API ADMIN');

  constructor() { }

  setTitle(title: string): void {
    this.title$.next(title);
  }

  getTitle$(): Observable<string> {
    return this.title$;
  }
}
