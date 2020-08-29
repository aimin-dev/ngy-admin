/**
import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
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

// loading bar
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';


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
    RouterModule,
    // Formly
    // FormlyModule.forRoot(), // with issue
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    FormlyMatToggleModule,
    // ./Formly
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
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
***/




import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';

import { AdminComponent } from './components/admin/admin.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { ShowComponent } from './components/show/show.component';
import { MaterialsModule } from './materials.module';
import { AdminInitializer } from './core/admin-initializer';
import { AdminRouter } from './router/admin-router';
import { HttpClientModule } from '@angular/common/http';
import { FieldColumnComponent } from './components/field-column/field-column.component';
import { ReactiveFormsModule } from '@angular/forms';

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
import { BtnAddonsWrapperComponent } from './form/wrapper/btn-addons-wrapper/btn-addons-wrapper.component';
import { btnAddonsExtension } from './form/extension/btn-addons.extension';

import { ThemeModule } from './theme/theme.module';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { SelectionToolbarComponent } from './components/selection-toolbar/selection-toolbar.component';
import { NaaToolbarComponent } from './components/naa-toolbar/naa-toolbar.component';
import { NaaLayoutComponent } from './components/naa-layout/naa-layout.component';
import { NaaFieldLabelPipe } from './pipes/naa-field-label.pipe';
import { NaaResourceLabelPipe } from './pipes/naa-resource-label.pipe';
import { NaaResourceLinkPipe } from './pipes/naa-resource-link.pipe';

import { NAA_ENTRYPOINT } from './config/naa-entrypoint';
import { NAA_BASE_PATH } from './config/naa-base-path';
import { NAA_CONFIG, NaaConfig } from './config/naa-config';
import { ColumnsComponent } from './components/columns/columns.component';
import { NaaHostDirective } from './directives/naa-host.directive';
import { NaaTextareaAutoResizeComponent } from './form/components/naa-textarea-auto-resize/naa-textarea-auto-resize.component';
import { naaTextAreaAutoResizeType } from './form/types/naa-textarea-auto-resize.type';

// formly config
const ngyFormlyConfig = {
      wrappers: [
        { name: 'btnAddons', component: BtnAddonsWrapperComponent },
      ],
      extensions: [
        { name: 'btnAddons', extension: { onPopulate: btnAddonsExtension } },
      ],
      types: [naaTextAreaAutoResizeType]

};
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

// create factory
export function initializeAdmin(adminInitializer: AdminInitializer): any {
  const res = (): Promise<any> => {
    return adminInitializer.init();
  };

  return res;
}

@NgModule({
  declarations: [
    AdminComponent,
    ListComponent,
    EditComponent,
    CreateComponent,
    ShowComponent,
    FieldColumnComponent,
    BtnAddonsWrapperComponent,
    SelectionToolbarComponent,
    NaaToolbarComponent,
    NaaLayoutComponent,
    NaaFieldLabelPipe,
    NaaResourceLabelPipe,
    NaaResourceLinkPipe,
    ColumnsComponent,
    NaaHostDirective,
    NaaTextareaAutoResizeComponent,
  ],
  exports: [
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    MaterialsModule,
    ThemeModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Formly
    // FormlyModule.forRoot(), // with issue
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    FormlyMatToggleModule,
    // ./Formly

    // FormlyModule.forRoot({
    //   wrappers: [
    //     { name: 'btnAddons', component: BtnAddonsWrapperComponent },
    //   ],
    //   extensions: [
    //     { name: 'btnAddons', extension: { onPopulate: btnAddonsExtension } },
    //   ],
    //   types: [naaTextAreaAutoResizeType]
    // }),
    // FormlyMaterialModule,
    // FormlyMatDatepickerModule,
    // FormlyMatToggleModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
  ],
  providers: [
    AdminRouter,
    AdminInitializer,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAdmin,
      multi: true,
      deps: [AdminInitializer]
    },
    { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
    { provide: FORMLY_CONFIG, useValue: ngyFormlyConfig, multi: true },
    FormlyConfig,
    FormlyFormBuilder,
  ],
})
export class NgyAdminModule {
  constructor(@Optional() @SkipSelf() parentModule?: NgyAdminModule) {
    if (parentModule) {
      throw new Error(
        'NgyAdminModule is already loaded. Import it in the NgyAdminModule only');
    }
  }

  static forRoot(config: NaaConfig): ModuleWithProviders<NgyAdminModule> {
    return {
      ngModule: NgyAdminModule,
      providers: [
        { provide: NAA_ENTRYPOINT, useValue: config.entrypoint },
        { provide: NAA_BASE_PATH, useValue: config.basePath || '' },
        { provide: NAA_CONFIG, useValue: config },
      ]
    };
  }
}
