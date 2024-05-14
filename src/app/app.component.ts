import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  title = 'angular-raspberry';
  public chart: any;
  data = [,];

  humidityData = 0;
  temperatureData = 0;
  lightData = true;
  waterData = 0;

  sampleDataMap: Map<string, any[]> = new Map<string, any[]>();
  samplingInterval = 5000; // Sampling interval in milliseconds (1 second)
  private alive = true;
  private dataSubscription: Subscription | undefined;

  constructor(private database: Database) {
    this.getDataValues();
  }

  getDataValues() {
    const humidity = ref(this.database, 'Humidity');
    onValue(humidity, (snapshot) => {
      this.humidityData = snapshot.val();
      console.log("Humidity: " + this.humidityData)
    });

    const light = ref(this.database, 'Light_detected');
    onValue(light, (snapshot) => {
      this.lightData = snapshot.val();
      console.log("Light detected:  " + this.lightData)
    });

    const temperature = ref(this.database, 'Temp');
    onValue(temperature, (snapshot) => {
      this.temperatureData = snapshot.val();
      console.log("Temperature:  " + this.temperatureData)
    });

    const water = ref(this.database, 'Water_detected');
    onValue(water, (snapshot) => {
      this.waterData = snapshot.val();
      console.log("Water detected:  " + this.waterData)
    });
  }

// Function to update sensor data properties
  updateSensorData() {
    // Assuming sampleDataMap is populated with latest sensor data
    if (this.sampleDataMap.has('humidity')) {
      const humidityArray = this.sampleDataMap.get('humidity');
      if (humidityArray && humidityArray.length > 0) {
        this.humidityData = humidityArray[0].value;
      }
    }
    if (this.sampleDataMap.has('temp')) {
      const tempArray = this.sampleDataMap.get('temp');
      if (tempArray && tempArray.length > 0) {
        this.temperatureData = tempArray[0].value; // Assuming temp is first in array
      }
    }
    if (this.sampleDataMap.has('Light_detected')) {
      const lightArray = this.sampleDataMap.get('Light_detected');
      if (lightArray && lightArray.length > 0) {
        this.lightData = lightArray[0].value; // Assuming Light_detected is first in array
      }
    }
    if (this.sampleDataMap.has('Water_detected')) {
      const waterArray = this.sampleDataMap.get('Water_detected');
      if (waterArray && waterArray.length > 0) {
        this.waterData = waterArray[0].value; // Assuming Water_detected is first in array
      }
    }
  }


  startSampling() {
    this.dataSubscription = interval(this.samplingInterval)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.getData();
      });
  }

  getData() {
    const sensors = ['Humidity', 'Temp', 'Light_detected', 'Water_detected'];

    const now = new Date(); // Sample time in ISO string format
    const hours = now.getHours().toString().padStart(2, '0'); // Ensure two-digit format
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two-digit format
    const sampledAt = `${hours}:${minutes}`;
    const sampleData: any[] = [];
    const promises: Promise<void>[] = [];

    sensors.forEach(sensor => {
      const sensorRef = ref(this.database, sensor);

      const promise = new Promise<void>((resolve, reject) => {
        onValue(sensorRef, (snapshot) => {
          const value = snapshot.val();
          sampleData.push({sensor, value});
          resolve(); // Resolve the promise when data is received
        }, {
          onlyOnce: true // Listen for value once and resolve
        });
      });

      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      this.sampleDataMap.set(sampledAt, sampleData);
      console.log('Sample Data Map:', this.sampleDataMap);
    });
    this.updateSensorData();
  }
}


