import { NgModule } from '@angular/core';
// web
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { DisplayArticleComponent } from './components/display-article/display-article.component';
import { DisplayAllArticlesComponent } from './components/display-all-articles/display-all-articles.component';
import { DisplayArticlesComponent } from './components/display-articles/display-articles.component';
import { DownloadCopyComponent } from './components/download-copy/download-copy.component';
import { HomeComponent } from './components/home/home.component';
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';
import { NaviComponent } from './components/navi/navi.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { ShowArticleComponent } from './components/show-article/show-article.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
// pipes
import { AmaAuthorPipe } from './pipes/ama/ama-author.pipe';
import { AmaAuthorsPipe } from './pipes/ama/ama-authors.pipe';
import { ApaAuthorPipe } from './pipes/apa/apa-author.pipe';
import { ApaAuthorsPipe } from './pipes/apa/apa-authors.pipe';
import { AuthorFormatPipe } from './pipes/author-format.pipe';
// services
import { AuthService } from './services/auth.service';
import { JournalArticleService } from './services/journal-article.service';
import { FullApaPipe } from './pipes/apa/full-apa.pipe';
import { FullAmaPipe } from './pipes/ama/full-ama.pipe';
import { ChicagoAuthorPipe } from './pipes/chicago/chicago-author.pipe';
import { FullChicagoPipe } from './pipes/chicago/full-chicago.pipe';
import { IeeeAuthorPipe } from './pipes/ieee/ieee-author.pipe';
import { IeeeAuthorsPipe } from './pipes/ieee/ieee-authors.pipe';
import { FullIeeePipe } from './pipes/ieee/full-ieee.pipe';
import { ChicagoAuthorsPipe } from './pipes/chicago/chicago-authors.pipe';
import { MlaAuthorPipe } from './pipes/mla/mla-author.pipe';
import { MlaAuthorsPipe } from './pipes/mla/mla-authors.pipe';
import { FullMlaPipe } from './pipes/mla/full-mla.pipe';
import { NlmAuthorPipe } from './pipes/nlm/nlm-author.pipe';
import { NlmAuthorsPipe } from './pipes/nlm/nlm-authors.pipe';
import { FullNlmPipe } from './pipes/nlm/full-nlm.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AmaAuthorPipe,
    AmaAuthorsPipe,
    ApaAuthorPipe,
    ApaAuthorsPipe,
    AppComponent,
    AuthorFormatPipe,
    CreateComponent,
    DisplayAllArticlesComponent,
    DisplayArticlesComponent,
    HomeComponent,
    MyCollectionsComponent,
    NaviComponent,
    NotFoundComponent,
    RegisterComponent,
    SearchComponent,
    ShowArticleComponent,
    FullApaPipe,
    FullAmaPipe,
    DownloadCopyComponent,
    UserDashboardComponent,
    DisplayArticleComponent,
    MyCollectionComponent,
    ChicagoAuthorPipe,
    FullChicagoPipe,
    IeeeAuthorPipe,
    IeeeAuthorsPipe,
    FullIeeePipe,
    ChicagoAuthorsPipe,
    MlaAuthorPipe,
    MlaAuthorsPipe,
    FullMlaPipe,
    NlmAuthorPipe,
    NlmAuthorsPipe,
    FullNlmPipe,
    SidebarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    JournalArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
