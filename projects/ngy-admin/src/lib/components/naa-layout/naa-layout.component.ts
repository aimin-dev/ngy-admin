import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

// @dynamic
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'naa-layout',
  templateUrl: './naa-layout.component.html',
  styleUrls: ['./naa-layout.component.scss']
})
export class NaaLayoutComponent implements OnInit {

  @ViewChild('snav', {static: true}) snav: MatSidenav;
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void { }

  public toggleSidenav(): void {
    this.snav.toggle();
  }

}
