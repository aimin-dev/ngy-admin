import { Injectable, Inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {TYPE_STRING, TYPE_BOOLEAN, TYPE_DATE} from '../constant/types';
import * as deepmerge from 'deepmerge';
import lodashGet from 'lodash.get';
import { NaaTitleService } from '../core/naa-title.service';
import { NAA_CONFIG } from '../config/naa-config';

// @dynamic
@Injectable({
  providedIn: 'root'
})
export class FieldConfigBuilder {

  constructor(private naaTitle: NaaTitleService, @Inject(NAA_CONFIG) private config) { }

  buildField(field: any, resource: any, options?: any, configOverride: any = {}): FormlyFieldConfig {
    // check if field should be supported or not
    if ([TYPE_BOOLEAN, TYPE_STRING, TYPE_DATE].indexOf(field.range) === -1) {
      return null;
    }

    let config = {
      key: field.name,
      type: 'input',
      templateOptions: {
        label: this.naaTitle.getFieldLabel(field),
        required: field.required,
      }
    };

    switch (field.range) {
      case TYPE_STRING:
        break;
      case TYPE_BOOLEAN:
        config.type = 'toggle';
        break;
      case TYPE_DATE:
        config.type = 'datepicker';
        break;
      default:
        break;
    }
    // get customized config
    const defaultFormConfig = lodashGet(this.config, ['fieldOptions', resource.name, '__form', field.name].join('.'), null);
    const customization = lodashGet(
      this.config,
      ['fieldOptions', resource.name, lodashGet(options, 'action', '__form'), field.name].join('.'),
      defaultFormConfig
    );
    if (customization) {
      let customConfig;
      if (typeof customization === 'function') {
        customConfig = customization(field, resource);
      } else if (typeof customization === 'object') {
        customConfig = customization;
      } else {
        throw new TypeError('Invalid field config, you must provide a FormlyFieldConfig object or a function returning a FormlyFieldConfig object');
      }
      config = deepmerge(config, customConfig);
    }

    return deepmerge(config, configOverride);
  }

  buildFields(fields: any[], resource: any, options?: any): FormlyFieldConfig[] {
    return fields.map(field => this.buildField(field, resource, options)).filter(config => config !== null);
  }
}
