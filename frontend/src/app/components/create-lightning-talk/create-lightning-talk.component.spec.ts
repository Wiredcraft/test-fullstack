import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLightningTalkComponent } from './create-lightning-talk.component';

describe('CreateLightningTalkComponent', () => {
  let component: CreateLightningTalkComponent;
  let fixture: ComponentFixture<CreateLightningTalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLightningTalkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLightningTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
