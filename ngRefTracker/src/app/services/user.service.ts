import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;

  constructor(private auth: AuthService, private http: HttpClient) { }
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

  findUserId(username: string): Observable<number> {
    return this.http.get<number>(
      this.baseUrl + `api/users/getId/${username}`,
      this.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

}
