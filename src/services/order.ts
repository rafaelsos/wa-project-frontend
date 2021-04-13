import { Observable } from 'rxjs';

import apiService, { ApiService } from './api';

export interface IOrder {
  id: number;
  description: string;
  amount: number;
  price: number;

  createdDate?: Date;
  updatedDate?: Date;
}

export interface ICreateOrder {
  description?: string;
  amount?: number;
  price?: number;
}
export class OrderService {
  constructor(private apiService: ApiService) {}

  public list(): Observable<IOrder[]> {
    return this.apiService.get('/order');
  }

  public create(model: ICreateOrder): Observable<IOrder> {
    return this.apiService.post('/order', model);
  }
}

const orderService = new OrderService(apiService);
export default orderService;
