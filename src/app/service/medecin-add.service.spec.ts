import { TestBed } from '@angular/core/testing';

import { MedecinAddService } from './medecin-add.service';

describe('MedecinAddService', () => {
  let service: MedecinAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedecinAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
