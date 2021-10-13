import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}users`)
  }
}
