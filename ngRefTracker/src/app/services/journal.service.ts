import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Journal } from '../models/journal';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class JournalService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private auth: AuthService,
    private http : HttpClient,
    ) { }

  index(): Observable<Journal[]> {
    return this.http.get<Journal[]>(
      this.baseUrl + 'api/journals',
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('A problem occurred.');
        })
      );
  }

}
