import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component:RegisterComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
