import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { ChargeRequest } from './charge-request.payload';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  charge(chargeRequest: ChargeRequest): Observable<any> {
    return this.httpClient.post(`${env.apiUrl}/stripe/charge`, chargeRequest);
  }
}
