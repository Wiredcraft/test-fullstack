import { TestBed } from '@angular/core/testing';

import { LightningTalkService } from './lightning-talk.service';

describe('LightningTalkService', () => {
  let service: LightningTalkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightningTalkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
