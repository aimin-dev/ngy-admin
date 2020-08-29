import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldConfigBuilder } from '../../form/field-config-builder';
import { ResourceHelper } from '../../utils/resource-helper';
import { HttpClient } from '@angular/common/http';
import { AdminRouteGenerator } from '../../router/admin-route-generator';
import { NaaToolbar } from '../../naa-toolbar/naa-toolbar';
import { NaaTitleService } from '../../core/naa-title.service';

// @dynamic
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  resource: any;
  fields: FormlyFieldConfig[] = [];
  item: any = {};

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private routeGenerator: AdminRouteGenerator,
    private resourceHelper: ResourceHelper,
    private fieldBuilder: FieldConfigBuilder,
    private httpClient: HttpClient,
    private toolbar: NaaToolbar,
    private titleService: NaaTitleService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.resource = data.resource;
      this.toolbar.setTitle(this.titleService.getEditTitle(this.resource));
      this.fields = this.fieldBuilder.buildFields(this.resourceHelper.getWritableFields(this.resource), this.resource, {action: '__edit'});
      const modelTmp: any = {};
      for (const key of this.fields.map(field => field.key)) {
        modelTmp[String(key)] = data.item[String(key)];
      }
      this.model = modelTmp;
      this.item = data.item;
    });
  }

  onSubmit(): void {
    this.httpClient.put<any>(this.resource.url + '/' + this.item.id, this.model).subscribe(saved => {
      this.router.navigate(this.routeGenerator.generateEntryRoute(this.resource));
    }, err => alert('faild to save'));
  }
}
