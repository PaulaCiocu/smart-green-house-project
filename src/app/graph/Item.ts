// Define the Item interface to match the data structure from Firestore
export interface Item {
  temperature: number;
  humidity: number;
  wetness_score: number;
  light: boolean;
  sampling_time: {
    seconds: number;
    nanoseconds: number;
  };
}
