import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaaFieldComponent } from './naa-field.component';

describe('NaaFieldComponent', () => {
  let component: NaaFieldComponent;
  let fixture: ComponentFixture<NaaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaaFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
