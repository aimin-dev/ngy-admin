import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaaToolbarComponent } from './naa-toolbar.component';

describe('NaaToolbarComponent', () => {
  let component: NaaToolbarComponent;
  let fixture: ComponentFixture<NaaToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaaToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaaToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
