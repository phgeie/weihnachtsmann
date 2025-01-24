import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { wish } from '../wish';

export const BASE_URI: string = 'http://localhost:8082/data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  add(wish1: wish): Observable<any> {
    return this.httpClient.post<wish>(BASE_URI + '/add', wish1);
  }

}
