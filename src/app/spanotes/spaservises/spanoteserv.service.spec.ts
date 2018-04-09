import { TestBed, inject } from '@angular/core/testing';

import { SpanoteservService } from './spanoteserv.service';

describe('SpanoteservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpanoteservService]
    });
  });

  it('should be created', inject([SpanoteservService], (service: SpanoteservService) => {
    expect(service).toBeTruthy();
  }));
});
