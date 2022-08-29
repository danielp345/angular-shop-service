import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserWithId } from './models/user.model';

const url = 'http://localhost:3000/users';
const usersUrl = '/api/users';

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

  public loginFB(): Observable<any> {
    return this.http.get('http://localhost:5000/auth/facebook');
  }

  public getAuthUser(): Observable<any> {
    return this.http.get('/api/authUser');
  }

  public logoutUser(): Observable<any> {
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    return this.http.get('/api/logoutUser');
  }

  public loginUser(loginData: AuthData): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${usersUrl}/login`, loginData);
  }

  public registerUser(registerData: AuthData): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `${usersUrl}/register`,
      registerData
    );
  }

  public getUsers(): Observable<UserWithId[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.get<UserWithId[]>(`${usersUrl}`, requestOptions);
  }

  public getUserById(id: string): Observable<UserWithId> {
    return this.http.get<UserWithId>(`${url}/${id}`);
  }

  public updateUser(user: UserWithId): Observable<UserWithId> {
    return this.http.put<UserWithId>(`${url}/${user._id}`, user);
  }
}
