import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgyAdminComponent } from './ngy-admin.component';

describe('NgyAdminComponent', () => {
  let component: NgyAdminComponent;
  let fixture: ComponentFixture<NgyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
