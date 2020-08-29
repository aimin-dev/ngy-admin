import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldColumnComponent } from './field-column.component';

describe('FieldColumnComponent', () => {
  let component: FieldColumnComponent;
  let fixture: ComponentFixture<FieldColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
