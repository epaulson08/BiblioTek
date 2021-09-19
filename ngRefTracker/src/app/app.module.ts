import { NgModule } from '@angular/core';
// web
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// components
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { DisplayArticleComponent } from './components/display-article/display-article.component';
import { DisplayAllArticlesComponent } from './components/display-all-articles/display-all-articles.component';
import { DisplayArticlesComponent } from './components/display-articles/display-articles.component';
import { DownloadDocxComponent } from './components/download-docx/download-docx.component';
import { HomeComponent } from './components/home/home.component';
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';
import { NaviComponent } from './components/navi/navi.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { ShowArticleComponent } from './components/show-article/show-article.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
// pipes
import { AmaAuthorPipe } from './pipes/ama/ama-author.pipe';
import { AmaAuthorsPipe } from './pipes/ama/ama-authors.pipe';
import { ApaAuthorHtmlPipe } from './pipes/apa/html-builder/apa-author-html.pipe';
import { ApaAuthorsHtmlPipe } from './pipes/apa/html-builder/apa-authors-html.pipe';
import { ApaDocxPipe } from './pipes/apa/apa-docx.pipe';
import { ApaHtmlPipe } from './pipes/apa/apa-html.pipe';
import { AuthorFormatPipe } from './pipes/author-format.pipe';
import { ChicagoAuthorsPipe } from './pipes/chicago/chicago-authors.pipe';
import { FullAmaPipe } from './pipes/ama/full-ama.pipe';
import { FullIeeePipe } from './pipes/ieee/full-ieee.pipe';
import { FullMlaPipe } from './pipes/mla/full-mla.pipe';
import { FullNlmPipe } from './pipes/nlm/full-nlm.pipe';
import { ChicagoAuthorPipe } from './pipes/chicago/chicago-author.pipe';
import { FullChicagoPipe } from './pipes/chicago/full-chicago.pipe';
import { IeeeAuthorPipe } from './pipes/ieee/ieee-author.pipe';
import { IeeeAuthorsPipe } from './pipes/ieee/ieee-authors.pipe';
import { MlaAuthorPipe } from './pipes/mla/mla-author.pipe';
import { MlaAuthorsPipe } from './pipes/mla/mla-authors.pipe';
import { NlmAuthorPipe } from './pipes/nlm/nlm-author.pipe';
import { NlmAuthorsPipe } from './pipes/nlm/nlm-authors.pipe';
// services
import { AuthService } from './services/auth.service';
import { JournalArticleService } from './services/journal-article.service';
import { ApaCitationDocxPipe } from './pipes/apa/docx-builder/apa-citation-docx.pipe';
import { ApaCitationsDocxPipe } from './pipes/apa/docx-builder/apa-citations-docx.pipe';

@NgModule({
  declarations: [
    AmaAuthorPipe,
    AmaAuthorsPipe,
    ApaAuthorHtmlPipe,
    ApaAuthorsHtmlPipe,
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
    ApaHtmlPipe,
    FullAmaPipe,
    DownloadDocxComponent,
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
    SidebarComponent,
    ApaDocxPipe,
    ApaCitationDocxPipe,
    ApaCitationsDocxPipe
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
