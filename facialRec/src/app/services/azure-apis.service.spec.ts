import { TestBed } from '@angular/core/testing';

import { AzureAPIsService } from './azure-apis.service';

describe('AzureAPIsService', () => {
  let service: AzureAPIsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureAPIsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
