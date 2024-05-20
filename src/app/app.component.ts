import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AsyncPipe, NgIf} from "@angular/common";
import {interval, Observable, Subscription, takeWhile} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {getDatabase, ref, onValue, Database} from "@angular/fire/database";
import firebase from "firebase/compat";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}


