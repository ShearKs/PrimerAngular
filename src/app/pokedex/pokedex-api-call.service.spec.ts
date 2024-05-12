import { TestBed } from '@angular/core/testing';

import { PokedexApiCallService } from './pokedex-api-call.service';

describe('PokedexApiCallService', () => {
  let service: PokedexApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
