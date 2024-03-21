import { TestBed } from '@angular/core/testing';

import { AppointmentHelperService } from './appointment-helper.service';

describe('AppointmentHelperService', () => {
  let service: AppointmentHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
