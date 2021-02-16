import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(public http: HttpClient) { }

  search(keywords: string[]): Observable<Object> {

    let params = new HttpParams()
      .append('order', '2')
      .append('count', '100');
    keywords.forEach(kwd => params = params.append('keyword', `${kwd}`));

    return this.http.get("/connpass/api", { params: params });
  }
  get(eventId: string): Observable<Object> {

    let params = new HttpParams()
      .append('event_id', `${eventId}`);

    return this.http.get("/connpass/api", { params: params });
  }
}

