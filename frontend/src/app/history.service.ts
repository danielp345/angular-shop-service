import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoryItem, HistoryItemWithId } from './models/history.model';

const url = 'http://localhost:3000/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  public getHistory(): Observable<HistoryItemWithId[]> {
    return this.http.get<HistoryItemWithId[]>(url);
  }

  public addHistoryItem(item: HistoryItem): Observable<HistoryItem> {
    return this.http.post<HistoryItem>(url, item);
  }
}
