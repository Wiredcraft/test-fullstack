import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightningTalkDetailComponent } from './lightning-talk-detail.component';

describe('LightningTalkDetailComponent', () => {
  let component: LightningTalkDetailComponent;
  let fixture: ComponentFixture<LightningTalkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightningTalkDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightningTalkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
