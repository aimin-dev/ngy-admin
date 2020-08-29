import { Component, OnInit } from '@angular/core';
import { AdminRouteGenerator } from '../../router/admin-route-generator';
import { ActivatedRoute } from '@angular/router';

// @dynamic
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-api-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  resources: any[] = [];

  constructor(public adminRouter: AdminRouteGenerator, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.resources = data.resources);
  }

}
