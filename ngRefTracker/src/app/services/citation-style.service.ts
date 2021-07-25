import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CitationStyle } from '../models/citation-style';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CitationStyleService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  findAll(): Observable<CitationStyle[]> {
    return this.http.get<CitationStyle[]>(
      `${this.baseUrl}api/citation-styles/`,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('A problem occurred.');
        })
      );
  }
}
