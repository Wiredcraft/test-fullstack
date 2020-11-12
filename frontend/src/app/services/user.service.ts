import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(username: string, password: string) {
    return this.http.post('http://localhost:3000/user/register', { username, password });
  }
}
