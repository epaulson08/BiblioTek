import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Journal } from '../models/journal';

@Injectable({
  providedIn: 'root'
})

export class JournalService {
  private baseUrl: string = "http://localhost:8084/";
  private url = this.baseUrl + "api/journals/";

  index(): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.baseUrl + 'api/journals')
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('A problem occurred.');
        })
      );
  }


  constructor(private http : HttpClient) { }
}
