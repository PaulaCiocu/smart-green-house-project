import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable} from "rxjs";
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
  title = 'angular-raspberry';

  humidity_data: any;
  light_data: any;
  temp_data: any;
  water_data: any;

  constructor(public database: Database) {
    this.getData();
  }

  getData(){
    const humidity = ref(this.database , 'Humidity');
    onValue(humidity, (snapshot) => {
       this.humidity_data = snapshot.val();
      console.log("Humidity: "+this.humidity_data)
    });

    const light = ref(this.database , 'Light_detected');
    onValue(light, (snapshot) => {
      this.light_data = snapshot.val();
      console.log("Light detected:  "+this.light_data)
    });

    const temperature = ref(this.database , 'Temp');
    onValue(temperature, (snapshot) => {
       this.temp_data = snapshot.val();
      console.log("Temperature:  "+ this.temp_data)
    });

    const water = ref(this.database , 'Water_detected');
    onValue(water, (snapshot) => {
      this.water_data = snapshot.val();
      console.log("Water detected:  "+this.water_data)
    });


  }




}
