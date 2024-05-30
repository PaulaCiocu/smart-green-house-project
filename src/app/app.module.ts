import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';
import { BaseChartDirective } from 'ng2-charts';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {appConfig} from "./app.config";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./dashboard/dashboard.component";

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    FormsModule,
    DashboardComponent

  ],
  providers: [...appConfig.providers],
})
export class AppModule { }
