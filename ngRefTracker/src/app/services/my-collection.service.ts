import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MyCollection } from '../models/my-collection.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyCollectionService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  generateHttpHeader() {
    let credentials = this.auth.getCredentials();
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    }
    return httpOptions;
  }

  index(): Observable<MyCollection[]> {
    return this.http.get<MyCollection[]>(
      this.baseUrl + "api/collections/",
      this.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  show(id: number): Observable<MyCollection> {
    return this.http.get<MyCollection>(
      this.baseUrl + "api/collections/" + id,
      this.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

}
