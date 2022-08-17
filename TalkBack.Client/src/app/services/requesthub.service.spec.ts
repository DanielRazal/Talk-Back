import { TestBed } from '@angular/core/testing';

import { RequesthubService } from './requesthub.service';

describe('RequesthubService', () => {
  let service: RequesthubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequesthubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
