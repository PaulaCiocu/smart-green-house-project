import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes'; // Import your AppRoutes module

@NgModule({
  imports: [
    BrowserModule,
    RouterModule, // Import RouterModule for routing
    AppRoutes,
    AppComponent
    // Import and use your AppRoutes module
  ],
  providers: [],

})
export class AppModule { }
