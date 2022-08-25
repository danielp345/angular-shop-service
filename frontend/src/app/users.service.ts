import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserWithId } from './models/user.model';

const url = 'http://localhost:3000/users';

interface AuthResponseData {
  _id: string;
  login: string;
  isAdmin: boolean;
  token: string;
}

interface AuthData {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public loginUser(loginData: AuthData): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('/api/users/login', loginData);
  }

  public registerUser(registerData: AuthData): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      '/api/users/register',
      registerData
    );
  }

  public getUsers(): Observable<UserWithId[]> {
    return this.http.get<UserWithId[]>(url);
  }

  public getUserById(id: string): Observable<UserWithId> {
    return this.http.get<UserWithId>(`${url}/${id}`);
  }

  public updateUser(user: UserWithId): Observable<UserWithId> {
    return this.http.put<UserWithId>(`${url}/${user.id}`, user);
  }
}
