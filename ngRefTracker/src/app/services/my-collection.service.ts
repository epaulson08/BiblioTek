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

  // GET api/collections
  findAllAsUser(): Observable<MyCollection[]> {
    return this.http.get<MyCollection[]>(
      this.baseUrl + "api/collections/",
      this.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  // GET api/collections/{myCollectionId}
  findByIdAsUser(id: number): Observable<MyCollection> {
    return this.http.get<MyCollection>(
      this.baseUrl + "api/collections/" + id,
      this.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  // GET api/all/collections/{myCollectionId}
  findByIdAsAdmin(id: number): Observable<MyCollection> {
    return this.http.get<MyCollection>(
      this.baseUrl + "api/all/collections/" + id,
      this.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  // GET api/all/collections/users/{userId}
  // findAllForUserAsAdmin() { }

  // POST api/collections
  // create() { }

  // PUT api/collections/{myCollectionId}
  update(id: number, newVersion: MyCollection): Observable<MyCollection> {
    return this.http.put<MyCollection>(
      this.baseUrl + "api/collections/" + id,
      newVersion,
      this.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  // PUT api/collections/{myCollectionId}/add-article/{journalArticleId}
  // addArticle() { }

  // PUT api/collections/{myCollectionId}/remove-article/{journalArticleId}
  // removeArticle() { }

  // DELETE api/collections/{myCollectionId}
  // deleteAsUser() { }

  // DELETE api/all/collections/{myCollectionId}
  // deleteAsAdmin() { }

}
