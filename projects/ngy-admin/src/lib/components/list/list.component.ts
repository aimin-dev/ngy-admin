import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap, mergeMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminRouteGenerator } from '../../router/admin-route-generator';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResourceHelper } from '../../utils/resource-helper';
import { FieldConfigBuilder } from '../../form/field-config-builder';
import * as _get from 'lodash.get';
import { SelectionModel } from '@angular/cdk/collections';
import { NaaToolbar } from '../../naa-toolbar/naa-toolbar';
import { NaaTitleService } from '../../core/naa-title.service';
import { AdminHttpClient, AdminHttpOptions } from '../../http/admin-http-client';

// @dynamic
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  resource: any;
  displayedColumns: string[] = [];
  dataSource = [];
  searchFields: FormlyFieldConfig[] = [];
  searchForm = new FormGroup({});
  searchModel = {};
  filters: {[key: string]: {active: boolean, field?: any}} = {};
  parameters: any[] = [];
  sortFields: string[] = [];
  activeSort: {active: string, direction: 'asc'|'desc'} = null;
  paginationState: any = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    previousPageIndex: 0,
  };
  // selection
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  constructor(
    public route: ActivatedRoute,
    private routeGenerator: AdminRouteGenerator,
    private resourceHelper: ResourceHelper,
    private fieldBuilder: FieldConfigBuilder,
    private toolbar: NaaToolbar,
    private titleService: NaaTitleService,
    private http: AdminHttpClient
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data.resource),
      tap(resource => this.initResource(resource)),
      tap(resource => this.toolbar.setTitle(this.titleService.getListTitle(this.resource))),
      mergeMap(resource => this.http.getCollections(this.resource))
    ).subscribe(response => {
      this.handleResponse(response);
      // check if filters are supported
      if (_get(response, '["hydra:search"]["hydra:mapping"]', null)) {
        this.parseSearchMapping(response['hydra:search']['hydra:mapping']);
        this.parseOrderMapping(response['hydra:search']['hydra:mapping']);
      }
    });
    this.searchForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(() => {
      this.paginationState.pageIndex = 0;
      this.getCollections();
    });
  }

  initResource(resource: any): void {
    this.resource = resource;
    this.resource.getParameters().then(params => this.parameters = params);
    this.displayedColumns = ['select', ...this.resource.readableFields.map(field => field.name), 'actions'];
  }

  onColumnsChange(columns: string[]): void {
    this.displayedColumns = ['select', ...columns, 'actions'];
  }

  getCollections(): void {
    const options: AdminHttpOptions = {};
    const searchValue = this.searchForm.value;

    if (this.activeSort) {
      options.order = this.activeSort.active;
      options.orderDir = this.activeSort.direction.toLocaleLowerCase();
    }

    if (this.paginationState) {
      options.page = this.paginationState.pageIndex + 1;
      options.itemsPerPage = this.paginationState.pageSize;
    }

    if (searchValue) {
      options.search = {};
      for (const key in searchValue) {
        if (searchValue && (searchValue[key] !== null && this.filters[key].active)) {
          options.search[key] = searchValue[key];
        }
      }
    }

    this.http.getCollections(this.resource, options).subscribe(response => this.handleResponse(response));
  }

  handleResponse(response): void {
    this.dataSource = response['hydra:member'];
    this.selection.clear();
    this.parsePagination(response);
  }

  getEditRoute(item: any): any {
    return this.routeGenerator.generateEditRoute(this.resource, item.id);
  }

  getShowRoute(item: any): any {
    return this.routeGenerator.generateShowRoute(this.resource, item.id);
  }

  parseSearchMapping(mappings: any[]): void {
    const resourceFields = this.resourceHelper.getFields(this.resource);
    mappings.filter(mapping => mapping.property === mapping.variable).forEach(mapping => {
      const fieldIndex = this.resource.fields.findIndex(field => field.name === mapping.property);
      this.filters[mapping.property] = {active: false};
      if (fieldIndex !== -1) {
        this.filters[mapping.property].field = this.resource.fields[fieldIndex];
      }
    });

    this.searchFields = mappings.filter(mapping => mapping.property === mapping.variable).map(mapping => {
      const filterName = mapping.property;
      const index = resourceFields.findIndex(field => field.name === filterName);
      const override = {
        hideExpression: (model) => !this.filters[filterName].active,
        templateOptions: {
          required: false,
          btnAddonLeft: {
            icon: 'clear',
            onClick: (e) => this.deactivateFilter(filterName),
          }
        },
      };
      const fieldConfig = this.fieldBuilder.buildField(resourceFields[index], this.resource, {action: '__filter'}, override);
      if (fieldConfig.type !== 'toggle') {
        fieldConfig.templateOptions.appearance = 'fill';
      }

      return fieldConfig;
    });
  }

  parsePagination(response: any): void {
    const view = response['hydra:view'];
    this.paginationState = { ...this.paginationState, length: response['hydra:totalItems']};
    if (view) { }
  }

  parseOrderMapping(mappings: any[]): void {
    const orderPattern = new RegExp('^order\\[.*\\]$', 'i');
    this.sortFields = mappings.filter(mapping => orderPattern.test(mapping.variable)).map(mapping => mapping.property);
  }

  disableSort(fieldName: string): boolean {
    return !this.sortFields || (this.sortFields && (this.sortFields.indexOf(fieldName) === -1));
  }

  sort(activeSort): void {
    this.activeSort = activeSort;
    this.getCollections();
  }

  get createRoute(): any {
    return this.routeGenerator.generateCreateRoute(this.resource);
  }

  showFilterMenu(): boolean {
    return Object.keys(this.filters).filter(key => !this.filters[key].active).length > 0;
  }

  activateFilter(filterName: string): void {
    this.filters[filterName].active = true;
  }

  deactivateFilter(filterName: string): void {
    this.filters[filterName].active = false;
    this.getCollections();
  }

  onPageChange(event): void {
    this.paginationState = {...this.paginationState, ...event};
    this.getCollections();
  }

  onDeleting(items: any[]): void {
    this.dataSource = this.dataSource.filter(item => items.indexOf(item) === -1);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }
}
