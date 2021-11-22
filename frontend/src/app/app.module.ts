import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostEstimationService } from './services/cost-estimation/cost-estimation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio/';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ValidationDialogComponent } from './components/shared/validation-dialog/validation-dialog.component';
import { TabsComponent } from './components/impl/tabs/tabs.component';
import { SectionIntroCardComponent } from './components/impl/section-intro-card/section-intro-card.component';
import { QuestionAndOptionsComponent } from './components/impl/question-and-options/question-and-options.component';
import { EmailFormComponent } from './components/impl/email-form/email-form.component';
import { FinalOverviewAccordionComponent } from './components/impl/final-overview-accordion/final-overview-accordion.component';
import { SnackbarComponent } from './components/shared/snackbar/snackbar.component';
import { ButtonsComponent } from './components/shared/buttons/buttons.component';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { NavigationButtonsComponent } from './components/shared/navigation-buttons/navigation-buttons.component';
import { SectionOverviewCardComponent } from './components/shared/section-overview-card/section-overview-card.component';
import { AnsweredQuestionsViewComponent } from './components/shared/answered-questions-view/answered-questions-view.component';

@NgModule({
  declarations: [AppComponent, routingComponents, ValidationDialogComponent, TabsComponent, SectionIntroCardComponent, QuestionAndOptionsComponent, EmailFormComponent, FinalOverviewAccordionComponent, SnackbarComponent, ButtonsComponent, ProgressBarComponent, NavigationButtonsComponent, SectionOverviewCardComponent, AnsweredQuestionsViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [CostEstimationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
