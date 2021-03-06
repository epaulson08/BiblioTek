import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CitationStyleLink } from '../models/citation-style-link';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CitationStyleLinkService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  findByCitationStyleId(citationStyleId: number): Observable<CitationStyleLink[]> {
    return this.http.get<CitationStyleLink[]>(
      `${this.baseUrl}api/citation-style-link/${citationStyleId}`,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('A problem occurred.');
        })
      );
  }

}
