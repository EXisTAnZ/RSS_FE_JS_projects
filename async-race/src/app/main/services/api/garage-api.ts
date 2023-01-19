import apiService from '../../../shared/services/api.service';
import { MyObject } from '../../../shared/models/basse-types';

class GarageApi {
  public getCars(paginator: MyObject) {
    return apiService.getData('garage', paginator);
  }

  public getCar(id: number) {
    return apiService.getData('garage', { id: id.toString() });
  }

  public createCar(data: MyObject) {
    return apiService.post('garage', data);
  }

  public deleteCar(id: number) {
    return apiService.delete(`garage/${id}`);
  }

  public updateCar(data: MyObject) {
    return apiService.put(`garage/${data.id}`, data);
  }
}

const garageApi = new GarageApi();
export default garageApi;
