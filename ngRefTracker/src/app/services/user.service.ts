import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.baseUrl;

  constructor(private auth: AuthService, private http: HttpClient) {}

  loadPalette(): string {
    let chosenPalette: string = localStorage.getItem('chosenPalette');
    if (!chosenPalette) chosenPalette = '-A';
    return chosenPalette;
  }

  findUserId(username: string): Observable<number> {
    return this.http
      .get<number>(
        this.baseUrl + `api/users/getId/${username}`,
        this.auth.generateHttpHeader()
      )
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  findPalette(): Observable<string> {
    return this.http
      .get<string>(
        this.baseUrl + `users/palette`,
        this.auth.generateHttpHeader()
      )
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  savePalette(paletteToSave: string): Observable<string> {
    return this.http
      .put<string>(
        this.baseUrl + `users/palette/${paletteToSave}`,
        null,
        this.auth.generateHttpHeader()
      )
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }
}
