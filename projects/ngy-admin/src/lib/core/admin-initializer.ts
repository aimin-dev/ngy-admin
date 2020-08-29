import { Injectable, Inject } from '@angular/core';
// import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';
// import { Api } from '@api-platform/api-doc-parser/src';
import { AdminRouter } from '../router/admin-router';
import { NAA_ENTRYPOINT } from '../config/naa-entrypoint';
import { hydraDoc } from './hydraDoc';

export const parseHydraDocumentation = (entrypoint: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    resolve(hydraDoc);
  });
};

// @dynamic
@Injectable({
  providedIn: 'root'
})
export class AdminInitializer {

  constructor(
    private adminRouter: AdminRouter,
    @Inject(NAA_ENTRYPOINT) private entrypoint
  ) { }

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      parseHydraDocumentation(this.entrypoint).then(({ api }) => {
        this.adminRouter.init(api);
        resolve();
      }, err => reject(err));
    });
  }}
