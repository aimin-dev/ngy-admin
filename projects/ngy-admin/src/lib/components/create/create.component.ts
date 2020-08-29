import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldConfigBuilder } from '../../form/field-config-builder';
import { ResourceHelper } from '../../utils/resource-helper';
import { HttpClient } from '@angular/common/http';
import { AdminRouteGenerator } from '../../router/admin-route-generator';
import { NaaTitleService } from '../../core/naa-title.service';
import { NaaToolbar } from '../../naa-toolbar/naa-toolbar';

// @dynamic
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  resource: any;
  fields: FormlyFieldConfig[] = [];

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private routeGenerator: AdminRouteGenerator,
    private resourceHelper: ResourceHelper,
    private fieldBuilder: FieldConfigBuilder,
    private httpClient: HttpClient,
    private titleService: NaaTitleService,
    private toolbar: NaaToolbar
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.resource = data.resource;
      this.toolbar.setTitle(this.titleService.getCreateTitle(this.resource));
      this.fields = this.fieldBuilder.buildFields(this.resourceHelper.getWritableFields(this.resource), this.resource, {action: '__create'});
    });
  }

  onSubmit(): void {
    this.httpClient.post<any>(this.resource.url, this.model).subscribe(saved => {
      this.router.navigate(this.routeGenerator.generateEntryRoute(this.resource));
    }, err => alert('faild to create ' + this.resource.name));
  }
}
