import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(username: string, password: string) {
    return this.http.post(`${config.apiUrl}/user/register`, { username, password });
  }
}
