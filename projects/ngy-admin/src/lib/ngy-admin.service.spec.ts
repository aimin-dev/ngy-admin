import { TestBed } from '@angular/core/testing';

import { NgyAdminService } from './ngy-admin.service';

describe('NgyAdminService', () => {
  let service: NgyAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgyAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
