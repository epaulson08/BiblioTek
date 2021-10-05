import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(username, password) {
    const credentials = this.generateBasicAuthCredentials(username, password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    // localStorage.setItem("userId", this.findUserId(username).toString());

    return this.http
    .get(this.baseUrl + 'authenticate', httpOptions)
    .pipe(
      tap((res) => {
        localStorage.setItem('credentials', credentials);
        // this is clumsy and can likely be refactored:
        localStorage.setItem('chosenPalette', this.loadPalette());
        return res;

      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.login(): error logging in.')
        })
      );
  }

  register(user) {
    return this.http.post(this.baseUrl + 'register', user)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('AuthService.register(): error registering user.');
        })
      );
  }

  logout() {
    localStorage.removeItem('credentials');
    localStorage.removeItem('lastPage');
    localStorage.removeItem('length');
  }

  checkLogin() {
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  generateBasicAuthCredentials(username, password) {
    return btoa(`${username}:${password}`);
  }

  getCredentials() {
    return localStorage.getItem('credentials');
  }

  generateHttpHeader() {
    let credentials = this.getCredentials();
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    }
    return httpOptions;
  }

  // On Login:
  // (this approach is clumsy and can likely be refactored)
  findPalette(): Observable<string> {
    return this.http.get<string>(
      this.baseUrl + `users/palette`,
      this.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
        );
      }

    loadPalette(): string {
       this.findPalette().subscribe(
          success => {
            localStorage.setItem("chosenPalette", "-" + success);
            return success;
          },
          failure => {
            console.error(failure);
          });
        return null;
      }

}
