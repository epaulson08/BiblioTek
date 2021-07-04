import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CitationStyle } from '../models/citation-style';
import { CitationStyleLink } from '../models/citation-style-link';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CitationStyleService {

  private baseUrl: string = "http://localhost:8084/";

  constructor(private http: HttpClient, private auth: AuthService) { }

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

  findAll(): Observable<CitationStyle[]> {
    return this.http.get<CitationStyle[]>(
      `${this.baseUrl}api/users/citation-styles/`,
      this.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('A problem occurred.');
        })
      );
  }
}
