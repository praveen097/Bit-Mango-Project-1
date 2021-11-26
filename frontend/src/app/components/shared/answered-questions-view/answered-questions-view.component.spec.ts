import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredQuestionsViewComponent } from './answered-questions-view.component';

describe('AnsweredQuestionsViewComponent', () => {
  let component: AnsweredQuestionsViewComponent;
  let fixture: ComponentFixture<AnsweredQuestionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnsweredQuestionsViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsweredQuestionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
