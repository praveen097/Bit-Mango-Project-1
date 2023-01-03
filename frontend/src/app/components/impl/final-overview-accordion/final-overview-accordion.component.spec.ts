import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalOverviewAccordionComponent } from './final-overview-accordion.component';

describe('FinalOverviewAccordionComponent', () => {
  let component: FinalOverviewAccordionComponent;
  let fixture: ComponentFixture<FinalOverviewAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalOverviewAccordionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalOverviewAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
