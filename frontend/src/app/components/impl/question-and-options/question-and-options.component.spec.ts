import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAndOptionsComponent } from './question-and-options.component';

describe('QuestionAndOptionsComponent', () => {
  let component: QuestionAndOptionsComponent;
  let fixture: ComponentFixture<QuestionAndOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAndOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAndOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
