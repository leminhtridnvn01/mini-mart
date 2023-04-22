import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
