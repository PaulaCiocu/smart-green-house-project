import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Firestore, collection, getDocs } from "@angular/fire/firestore";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  standalone: true
})
export class GraphComponent implements OnInit {
  public temperatureChart: any;
  public humidityChart: any;
  public wetnessScoreChart: any;
  sampleDataMap: Map<string, any> = new Map<string, any[]>();
  private dataSubscription: Subscription | undefined;
  firestore: Firestore = inject(Firestore)

  constructor() {}

  ngOnInit() {
    this.getDataFirestore();
    this.createCharts();
  }

  async getDataFirestore() {
    const itemCollection = collection(this.firestore, 'greenhouse-data');
    const snapshot = await getDocs(itemCollection);
    const list = snapshot.docs.map(doc => doc.data());
    this.populateMap(list);
  }

  populateMap(list: any[]) {
    const maxItems = 20;
    const minTimeDifference = 30000;
    let count = 0;
    let lastTimestamp = 0;

    list.forEach(item => {
      if (count >= maxItems) {
        return;
      }

      const timestamp = item.sampling_time.seconds * 1000 + item.sampling_time.nanoseconds / 1000000;
      if (timestamp === lastTimestamp || (timestamp - lastTimestamp) < minTimeDifference) {
        return;
      }

      const data = {
        humidity: item.humidity,
        temperature: item.temperature,
        wetness_score: item.wetness_score // Assuming 'wetness_score' field exists in the data
      };

      const date = new Date(timestamp);
      const formattedDate = `${date.toLocaleString('en-GB', { month: 'long' })} ${date.getDate()} at ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

      this.sampleDataMap.set(formattedDate, data);
      lastTimestamp = timestamp;
      count++;
    });

    console.log('Sample Data Map:', this.sampleDataMap);
    this.updateCharts();
  }

  createCharts() {
    this.temperatureChart = new Chart("TemperatureChart", {
      type: 'line',
      data: { labels: [], datasets: [{ label: "Temperature", data: [], backgroundColor: 'green', borderColor: 'green' }] },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,
                weight: 400
              },
              color: 'black',
              pointStyle: 'triangle',
              usePointStyle: false,
            }
          }
        }
      }
    });

    this.humidityChart = new Chart("HumidityChart", {
      type: 'line',
      data: { labels: [], datasets: [{ label: "Humidity", data: [], backgroundColor: 'blue', borderColor: 'blue' }] },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,
                weight: 400
              },
              color: 'black',
              pointStyle:'triangle',
              usePointStyle: false,
            }
          }
        }
      }
    });

    this.wetnessScoreChart = new Chart("WetnessScoreChart", {
      type: 'line',
      data: { labels: [], datasets: [{ label: "Wetness Score", data: [], backgroundColor: 'red', borderColor: 'red' }] },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,
                weight: 400
              },
              color: 'black',
              pointStyle:'star',
              usePointStyle: false,
            }
          }
        }
      }
    });
  }

  updateCharts() {
    this.sampleDataMap.forEach((data, timestamp) => {
      this.temperatureChart.data.labels.push(timestamp);
      this.temperatureChart.data.datasets[0].data.push(data.temperature);

      this.humidityChart.data.labels.push(timestamp);
      this.humidityChart.data.datasets[0].data.push(data.humidity);

      this.wetnessScoreChart.data.labels.push(timestamp);
      this.wetnessScoreChart.data.datasets[0].data.push(data.wetness_score);
    });

    this.temperatureChart.update();
    this.humidityChart.update();
    this.wetnessScoreChart.update();
  }
}
