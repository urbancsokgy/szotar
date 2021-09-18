import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { User, UserWithAddress, UserBasicData } from '../model/user';
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
   create(user : User): Observable<User>{
     return this.http.post<User>(this.baseUrl, user)
   }
   createWithAddress(userWithAddress : UserWithAddress): Observable<UserWithAddress>{
     return this.http.post<UserWithAddress>(`${this.baseUrl}/withAddress`, userWithAddress)
   }

   getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  getWithFilter(params: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/filter?params`)
  }
  count(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count`)
  }
  getBasicdata(): Observable<UserBasicData>{
    return this.http.get<UserBasicData>(`${this.baseUrl}/basicdata`)
  }
  getByID(id: string): Observable<UserWithAddress>{
    return this.http.get<UserWithAddress>(`${this.baseUrl}/${id}`)
  }
  update(id: string, data: UserWithAddress): Observable<UserWithAddress>{
    return this.http.put<UserWithAddress>(`${this.baseUrl}/${id}`, data)
  }
  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }


}
