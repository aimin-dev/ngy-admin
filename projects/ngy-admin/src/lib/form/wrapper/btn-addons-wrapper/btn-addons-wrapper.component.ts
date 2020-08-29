import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

// @dynamic
@Component({
  selector: 'ngx-api-admin-formly-btn-addons-wrapper',
  templateUrl: './btn-addons-wrapper.component.html',
  styleUrls: ['./btn-addons-wrapper.component.scss']
})
export class BtnAddonsWrapperComponent extends FieldWrapper {

  // @ViewChild('matPrefix') matPrefix: TemplateRef<any>;
  // @ViewChild('matSuffix') matSuffix: TemplateRef<any>;

  // ngAfterViewInit(): void {
  //   if (this.matPrefix) {
  //     Promise.resolve().then(() => this.to.prefix = this.matPrefix);
  //   }

  //   if (this.matSuffix) {
  //     Promise.resolve().then(() => this.to.suffix = this.matSuffix);
  //   }
  // }

  btnAddonRightClick($event: any): void {
    if (this.to.btnAddonRight.onClick) {
      this.to.btnAddonRight.onClick(this.to, this, $event);
    }
  }

  btnAddonLeftClick($event: any): void {
    if (this.to.btnAddonLeft.onClick) {
      this.to.btnAddonLeft.onClick(this.to, this, $event);
    }
  }

}
