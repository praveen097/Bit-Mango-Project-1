import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostEstimationService } from './services/cost-estimation/cost-estimation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationDialogComponent } from './components/shared/validation-dialog/validation-dialog.component';
import { TabsComponent } from './components/impl/tabs/tabs.component';
import { SectionIntroCardComponent } from './components/impl/section-intro-card/section-intro-card.component';
import { QuestionAndOptionsComponent } from './components/impl/question-and-options/question-and-options.component';
import { EmailFormComponent } from './components/impl/email-form/email-form.component';
import { FinalOverviewAccordionComponent } from './components/impl/final-overview-accordion/final-overview-accordion.component';
import { ButtonsComponent } from './components/shared/buttons/buttons.component';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { NavigationButtonsComponent } from './components/shared/navigation-buttons/navigation-buttons.component';
import { SectionOverviewCardComponent } from './components/shared/section-overview-card/section-overview-card.component';
import { AnsweredQuestionsViewComponent } from './components/shared/answered-questions-view/answered-questions-view.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ValidationDialogComponent,
    TabsComponent,
    SectionIntroCardComponent,
    QuestionAndOptionsComponent,
    EmailFormComponent,
    FinalOverviewAccordionComponent,
    ButtonsComponent,
    ProgressBarComponent,
    NavigationButtonsComponent,
    SectionOverviewCardComponent,
    AnsweredQuestionsViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [CostEstimationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
