import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaaTextareaAutoResizeComponent } from './naa-textarea-auto-resize.component';

describe('NaaTextareaAutoResizeComponent', () => {
  let component: NaaTextareaAutoResizeComponent;
  let fixture: ComponentFixture<NaaTextareaAutoResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaaTextareaAutoResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaaTextareaAutoResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
