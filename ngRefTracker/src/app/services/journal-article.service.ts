import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { JournalArticle } from '../models/journal-article';
import { Journal } from '../models/journal';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JournalArticleService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  allJournalArticlesAllUsers(): Observable<JournalArticle[]> {
    return this.http.get<JournalArticle[]>(
      `${this.baseUrl}api/all/articles/`,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('A problem occurred.');
        })
      );
  }

  index(): Observable<JournalArticle[]> {
    return this.http.get<JournalArticle[]>(
      `${this.baseUrl}api/articles/`,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('A problem occurred.');
        })
      );
  }

  show(id: number): Observable<JournalArticle> {
    return this.http.get<JournalArticle>(
      `${this.baseUrl}api/articles/${id}`,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  showAllByJournal(journal: Journal): Observable<JournalArticle[]> {
    return this.http.get<JournalArticle[]>(
      `${this.baseUrl}api/articles/journals/${journal.id}`,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  search(searchTerm: string): Observable<JournalArticle[]> {
    return this.http.get<JournalArticle[]>(
      `${this.baseUrl}api/articles/search/${searchTerm}`,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  create(ja: JournalArticle): Observable<JournalArticle> {
    return this.http.post<JournalArticle>(
      `${this.baseUrl}api/articles/`,
      ja,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        }
        )
      );
  }

  update(ja: JournalArticle): Observable<JournalArticle> {
    // TODO: allow author, journal update
    // may need to change argument to PayloadUtility
    return this.http.put<JournalArticle>(
      `${this.baseUrl}api/articles/${ja.id}`,
      ja,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        }
        )
      );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(
      `${this.baseUrl}api/articles/${id}`,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        }
        )
      );
  }

}
