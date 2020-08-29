import { NgModule, InjectionToken } from '@angular/core';
import { NgyAdminComponent } from './ngy-admin.component';
import { MaterialsModule } from './materials.module';

// Formly
import {
  FormlyModule,
  FORMLY_CONFIG,
  FormlyConfig,
  FormlyFormBuilder,
  ConfigOption
} from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';

// formly config
const ngyFormlyConfig = {};
export function defaultFormlyConfig(config: FormlyConfig): ConfigOption {
  return {
    // types: [
    //   { name: 'formly-group', component: FormlyGroup },
    //   { name: 'formly-template', component: FormlyTemplateType },
    // ],
    // extensions: [
    //   { name: 'core', extension: new CoreExtension(config) },
    //   { name: 'field-validation', extension: new FieldValidationExtension(config) },
    //   { name: 'field-form', extension: new FieldFormExtension() },
    //   { name: 'field-expression', extension: new FieldExpressionExtension() },
    // ],
  };
}

@NgModule({
  declarations: [NgyAdminComponent],
  imports: [
    MaterialsModule,
    // Formly
    // FormlyModule.forRoot(), // with issue
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    FormlyMatToggleModule,
    // ./Formly
  ],
  providers: [
    { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
    { provide: FORMLY_CONFIG, useValue: ngyFormlyConfig, multi: true },
    FormlyConfig,
    FormlyFormBuilder,
  ],
  exports: [NgyAdminComponent]
})
export class NgyAdminModule { }
