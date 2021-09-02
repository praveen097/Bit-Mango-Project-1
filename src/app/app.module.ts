import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostEstimationService } from './cost-estimation.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CostEstimationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
