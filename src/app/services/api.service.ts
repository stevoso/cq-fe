import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
//  private apiUrl = 'http://localhost:8082/api';
  private apiUrl = 'https://sqbe.prestiz.sk/api';

  constructor(private http: HttpClient) { }

  getUsers(startDate?: Date, endDate?: Date): Observable<any> {
    let url = `${this.apiUrl}/users`;
    if (startDate && endDate) {
      url += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    return this.http.get(url);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  getCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/countries`);
  }
}
