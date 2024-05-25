import {Client} from "./BaseApiClient";
import {PlantModel} from "./PlantModel";

export const PlantApiClient = {

  getOneAsync(plant_name:string):Promise<PlantModel>{
    return Client.get<PlantModel>(
      "/" + plant_name).then(
      (response) => response.data
    );
  },

}
