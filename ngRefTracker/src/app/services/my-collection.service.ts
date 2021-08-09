import { HttpClient } from '@angular/common/http';
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
  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  //////////////
  // GET methods

  // GET api/collections
  findAllAsUser(): Observable<MyCollection[]> {
    return this.http.get<MyCollection[]>(
      this.baseUrl + "api/collections/",
      this.auth.generateHttpHeader())
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
      this.auth.generateHttpHeader())
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
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  // GET api/all/collections/users/{userId}
  // findAllForUserAsAdmin() { }

  ///////////////
  // POST methods

  // POST api/collections
  // create() { }

  // POST api/collections/{myCollectionId}/add-article/{journalArticleId}
  addArticle(myCollectionId: number, journalArticleId: number) {
    return this.http.post<any>(
      `${this.baseUrl}api/collections/${myCollectionId}/add-article/${journalArticleId}`,
      null,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  // POST api/collections/{myCollectionId}/remove-article/{journalArticleId}
  removeArticle(myCollectionId: number, journalArticleId: number) {
    return this.http.post<any>(
      `${this.baseUrl}api/collections/${myCollectionId}/remove-article/${journalArticleId}`,
      null,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  //////////////
  // PUT methods

  // PUT api/collections/{myCollectionId}
  update(id: number, newVersion: MyCollection): Observable<MyCollection> {
    return this.http.put<MyCollection>(
      this.baseUrl + "api/collections/" + id,
      newVersion,
      this.auth.generateHttpHeader())
      .pipe(
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  /////////////////
  // DELETE methods

  // DELETE api/collections/{myCollectionId}
  // deleteAsUser() { }

  // DELETE api/all/collections/{myCollectionId}
  // deleteAsAdmin() { }

}
