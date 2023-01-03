import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionIntroCardComponent } from './section-intro-card.component';

describe('SectionIntroCardComponent', () => {
  let component: SectionIntroCardComponent;
  let fixture: ComponentFixture<SectionIntroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionIntroCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionIntroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
