import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightningTalksListComponent } from './lightning-talks-list.component';

describe('LightningTalksListComponent', () => {
  let component: LightningTalksListComponent;
  let fixture: ComponentFixture<LightningTalksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightningTalksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightningTalksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
