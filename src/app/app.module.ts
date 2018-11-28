import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { D3Module } from './d3/d3.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    D3Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
