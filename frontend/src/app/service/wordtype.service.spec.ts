import { TestBed } from '@angular/core/testing';

import { WordtypeService } from './wordtype.service';

describe('WordtypeService', () => {
  let service: WordtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
