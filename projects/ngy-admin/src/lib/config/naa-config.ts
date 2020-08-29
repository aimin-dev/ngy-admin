/*
 * @Author: stephan <m6ahenina@gmail.com>
 * @Date: 2020-07-26 06:41:49
 * @Last Modified by: stephan <m6ahenina@gmail.com>
 * @Last Modified time: 2020-07-26 06:56:23
 */
import { InjectionToken } from '@angular/core';

export interface NaaConfig {
  entrypoint: string;
  basePath?: string;
  [key: string]: any;
}

export const NAA_CONFIG = new InjectionToken<NaaConfig>('NAA_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    entrypoint: null
  })
});
