import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoryItem, HistoryItemWithId } from './models/history.model';

const url = 'http://localhost:3000/history';
const historyUrl = '/api/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  public getHistory(): Observable<HistoryItemWithId[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.get<HistoryItemWithId[]>(`${historyUrl}`, requestOptions);
  }

  public getUserHistory(userId: string): Observable<HistoryItemWithId[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.get<HistoryItemWithId[]>(
      `${historyUrl}/${userId}`,
      requestOptions
    );
  }

  public addHistoryItem(item: HistoryItem): Observable<HistoryItem> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.post<HistoryItem>(`${historyUrl}`, item, requestOptions);
  }
}
