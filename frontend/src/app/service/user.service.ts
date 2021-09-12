import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = `${this.config.apiUrl}/users`;

  constructor(
    private config : ConfigService,
    private http : HttpClient) {
   }

   getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);

  }
}
