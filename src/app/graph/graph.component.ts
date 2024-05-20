import {Component, inject, OnInit} from '@angular/core';
import {interval, Observable, Subscription, takeWhile} from "rxjs";
import { BaseChartDirective } from 'ng2-charts';

import Chart from 'chart.js/auto';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, collectionData, Firestore, getDocs} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import {Item} from "./Item";


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  standalone: true,
  styleUrl: './graph.component.css'
})

export class GraphComponent implements OnInit{
  public chart: any;
  time: any;
  sampleDataMap: Map<string, any> = new Map<string, any[]>();
  private alive = true;
  private dataSubscription: Subscription | undefined;
  private documents: any;
  firestore: Firestore = inject(Firestore)


  constructor() {
    //this.createChart();
  }

  ngOnInit() {
    this.getDataFirestore();
    this.createChart()
  }


  async getDataFirestore() {
    const itemCollection = collection(this.firestore, 'greenhouse-data');
    const snapshot = await getDocs(itemCollection);
    const list = snapshot.docs.map(doc =>doc.data())
    this.populateMap(list);
  }

  populateMap(list: any[]) {
    const maxItems = 100; // Maximum number of items allowed in the map
    const minTimeDifference = 30000; // Minimum time difference of 1 hour in milliseconds
    let count = 0; // Counter for the number of items added to the map
    let lastTimestamp = 0; // Variable to store the last timestamp added to the map

    list.forEach(item => {
      if (count >= maxItems) {
        return; // Exit the loop if the maximum number of items is reached
      }

      const timestamp = item.sampling_time.seconds * 1000 + item.sampling_time.nanoseconds / 1000000;
      if (timestamp === lastTimestamp || (timestamp - lastTimestamp) < minTimeDifference) {
        return; // Skip adding the item if it has the same timestamp as the last item or if the time difference is less than 1 hour
      }

      const data = {
        humidity: item.humidity,
        temperature: item.temperature
      };

      const date = new Date(item.sampling_time.seconds * 1000 + item.sampling_time.nanoseconds / 1000000);
      const formattedDate = date.toLocaleString('en-US', {
        timeZone: 'UTC',
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      this.sampleDataMap.set(formattedDate, data);
      lastTimestamp = timestamp; // Update the last timestamp variable
      count++; // Increment the counter after adding an item to the map
    });

    console.log('Sample Data Map:', this.sampleDataMap);
    this.updateChart();
  }


  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [],
        datasets: [
          {
            label: "Humidity",
            data: [],
            backgroundColor: 'blue'
          },
          {
            label: "Temperature",
            data: [],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });

  }

  updateChart() {
    this.sampleDataMap.forEach((data, timestamp) => {
      this.chart.data.labels.push(timestamp);
      this.chart.data.datasets[0].data.push(data.humidity);
      this.chart.data.datasets[1].data.push(data.temperature);
    });
    this.chart.update();
  }
}
