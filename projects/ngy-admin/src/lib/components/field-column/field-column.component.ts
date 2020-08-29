import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Inject } from '@angular/core';
import { NaaHostDirective } from '../../directives/naa-host.directive';
import { NAA_CONFIG } from '../../config/naa-config';
import { NaaFieldComponent } from '../../components/naa-field/naa-field.component';
import lodashGet from 'lodash.get';

// @dynamic
@Component({
  selector: 'ngx-api-admin-field-column, [ngx-api-admin-field-column]',
  templateUrl: './field-column.component.html',
  styleUrls: ['./field-column.component.scss']
})
export class FieldColumnComponent implements OnInit {

  @Input() field: any;
  @Input() data: any;
  @Input() resource: any;
  @Input() action = '__list';
  @ViewChild(NaaHostDirective, { static: true }) naaHost: NaaHostDirective;
  component: null;

  constructor(@Inject(NAA_CONFIG) private config, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    // resolve field component
    // try to find it in the resource action field options
    // else try to find it in the resource general field options
    this.component = lodashGet(
      this.config, ['fieldOptions', this.resource.name, this.action, this.field.name].join('.'),
      lodashGet(this.config, ['fieldOptions', this.resource.name, this.field.name].join('.'), NaaFieldComponent)
    );
    if (this.component) {
      this.renderValue();
    }
  }

  renderValue(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);

    const viewContainerRef = this.naaHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as NaaFieldComponent).value = this.data[this.field.name];
    (componentRef.instance as NaaFieldComponent).data = this.data;
    (componentRef.instance as NaaFieldComponent).field = this.field;
  }

}
