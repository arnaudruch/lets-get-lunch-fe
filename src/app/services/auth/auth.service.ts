import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(credentials: User): Observable<object> {
    return this.http.post('http://localhost:8080/api/users', credentials);
  }

}
