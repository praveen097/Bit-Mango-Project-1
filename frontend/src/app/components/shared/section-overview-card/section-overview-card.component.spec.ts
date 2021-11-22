import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOverviewCardComponent } from './section-overview-card.component';

describe('SectionOverviewCardComponent', () => {
  let component: SectionOverviewCardComponent;
  let fixture: ComponentFixture<SectionOverviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionOverviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
