import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat"; // Import your AppRoutes module

@NgModule({
  imports: [
    BrowserModule,
    RouterModule, // Import RouterModule for routing
    AppRoutes,
    AppComponent,
    AngularFireModule.initializeApp(environment.firebase)
    // Import and use your AppRoutes module
  ],
  providers: [],

})
export class AppModule { }
