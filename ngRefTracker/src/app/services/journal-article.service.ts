import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { JournalArticle } from '../models/journal-article';
import { PayloadUtility } from '../models/payload-utility.model';
import { Journal } from '../models/journal';

@Injectable({
  providedIn: 'root'
})
export class JournalArticleService {

  private baseUrl: string = "http://localhost:8084/";
  private url = this.baseUrl + "api/articles/";


  index(): Observable<JournalArticle[]> {
    return this.http.get<JournalArticle[]>(this.baseUrl + 'api/articles')
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('A problem occurred.');
        })
      );
  }


  show(id: number): Observable<JournalArticle> {
    return this.http.get<JournalArticle>(this.url + id)
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  showAllByJournal(journal: Journal) : Observable<JournalArticle[]> {
    return this.http.get<JournalArticle[]>(`${this.url}/journals/${journal.id}`)
    .pipe(
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  search(searchTerm: string): Observable<JournalArticle[]> {
    return this.http.get<JournalArticle[]>(this.url + "search/" + searchTerm)
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }


  create(payload: PayloadUtility): Observable<PayloadUtility> {
    console.warn("**DEBUG: in SERVICE create()");

    return this.http.post<PayloadUtility>(this.baseUrl + "api/articles", payload)
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
    console.warn("**DEBUG: in SERVICE update()");
    console.warn(ja.title);

    return this.http.put<JournalArticle>(this.baseUrl + "api/articles/" + ja.id, ja)
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        }
        )
      );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(this.baseUrl + "api/articles/" + id)
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        }
        )
      );
  }


  constructor(private http: HttpClient) { }


}
