import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaaLayoutComponent } from './naa-layout.component';

describe('NaaLayoutComponent', () => {
  let component: NaaLayoutComponent;
  let fixture: ComponentFixture<NaaLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaaLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
