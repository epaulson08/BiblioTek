import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MyCollection } from '../models/my-collection.model';

@Injectable({
  providedIn: 'root'
})
export class MyCollectionService {
  private baseUrl: string = "http://localhost:8084/";

  constructor(private http: HttpClient) { }

  index() : Observable<MyCollection[]> {
    return this.http.get<MyCollection[]>(this.baseUrl + "api/collections/")
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  show(id : number): Observable<MyCollection> {
    return this.http.get<MyCollection>(this.baseUrl + "api/collections/" + id)
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

}
