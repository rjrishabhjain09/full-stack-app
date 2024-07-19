import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
 
@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // for reactive forms
    HttpClientModule //  for HTTP requests
  ],
  providers: [],
  bootstrap: [AppComponent] // Bootstrap the main component starting the main
})
export class AppModule { }
