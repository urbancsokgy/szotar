import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl: string = `${this.config.apiUrl}/addresses`;

  constructor(
    private config : ConfigService,
    private http : HttpClient) {
   }
   create(address : Address): Observable<Address>{
     return this.http.post<Address>(this.baseUrl, address)
   }

   getAll(): Observable<Address[]> {
    return this.http.get<Address[]>(this.baseUrl);
  }
  getWithFilter(params: string): Observable<Address>{
    return this.http.get<Address>(`${this.baseUrl}/filter?params`)
  }
  count(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count`)
  }

  getByID(id: string): Observable<Address>{
    return this.http.get<Address>(`${this.baseUrl}/${id}`)
  }
  update(id: string, data: Address): Observable<Address>{
    return this.http.put<Address>(`${this.baseUrl}/${id}`, data)
  }
  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }


}
