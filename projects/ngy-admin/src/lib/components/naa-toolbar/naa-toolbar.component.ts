import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NaaToolbar } from '../../naa-toolbar/naa-toolbar';

// @dynamic
@Component({
  selector: 'naa-toolbar',
  templateUrl: './naa-toolbar.component.html',
  styleUrls: ['./naa-toolbar.component.scss']
})
export class NaaToolbarComponent implements OnInit {

  constructor(
    public loader: LoadingBarService,
    public toolbar: NaaToolbar
  ) { }

  ngOnInit(): void {
  }

}
