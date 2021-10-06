import { TestBed } from '@angular/core/testing';

import { UserPreferencesResolverService } from './user-preferences-resolver.service';

describe('UserPreferencesResolverService', () => {
  let service: UserPreferencesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPreferencesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
