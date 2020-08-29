import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminRouteGenerator } from '../../router/admin-route-generator';

// @dynamic
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  resource: any;
  item: any;
  action = '__show';

  constructor(public route: ActivatedRoute, public routeGenerator: AdminRouteGenerator) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.resource = data.resource;
      this.item = data.item;
    });
  }

}
