/*
 * @Author: stephan <m6ahenina@gmail.com>
 * @Date: 2020-07-15 13:11:02
 * @Last Modified by: stephan <m6ahenina@gmail.com>
 * @Last Modified time: 2020-07-15 13:51:50
 */

import { FormlyFieldConfig } from '@ngx-formly/core';

export function btnAddonsExtension(field: FormlyFieldConfig): void {
  if (!field.templateOptions || (field.wrappers && field.wrappers.indexOf('btnAddons') !== -1)) {
    return;
  }

  if (field.templateOptions.btnAddonLeft || field.templateOptions.btnAddonRight) {
    field.wrappers = ['btnAddons', ...(field.wrappers || [])];
  }
}
