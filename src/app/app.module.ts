import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostEstimationService } from './services/cost-estimation.service';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { MatRadioModule } from '@angular/material/radio/'
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips'


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule


  ],
  providers: [CostEstimationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
