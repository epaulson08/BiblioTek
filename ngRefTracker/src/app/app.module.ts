import { NgModule } from '@angular/core';

// web
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { AmaComponent } from './components/citation/ama/ama.component';
import { ApaComponent } from './components/citation/apa/apa.component';
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
import { AmaAuthorHtmlPipe } from './pipes/ama/html-builder/ama-author-html.pipe';
import { AmaAuthorsHtmlPipe } from './pipes/ama/html-builder/ama-authors-html.pipe';
import { ApaAuthorHtmlPipe } from './pipes/apa/html-builder/apa-author-html.pipe';
import { ApaAuthorsHtmlPipe } from './pipes/apa/html-builder/apa-authors-html.pipe';
import { ApaDocxPipe } from './pipes/apa/apa-docx.pipe';
import { ApaHtmlPipe } from './pipes/apa/apa-html.pipe';
import { AuthorFormatPipe } from './pipes/author-format.pipe';
import { ChicagoAuthorsPipe } from './pipes/chicago/chicago-authors.pipe';
import { FullAmaPipe } from './pipes/ama/ama-html.pipe';
import { IeeeHtmlPipe } from './pipes/ieee/ieee-html.pipe';
import { FullMlaPipe } from './pipes/mla/full-mla.pipe';
import { FullNlmPipe } from './pipes/nlm/full-nlm.pipe';
import { ChicagoAuthorPipe } from './pipes/chicago/chicago-author.pipe';
import { FullChicagoPipe } from './pipes/chicago/full-chicago.pipe';
import { IeeeAuthorHtmlPipe } from './pipes/ieee/html-builder/ieee-author-html.pipe';
import { IeeeAuthorsHtmlPipe } from './pipes/ieee/html-builder/ieee-authors-html.pipe';
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
    AmaAuthorHtmlPipe,
    AmaAuthorsHtmlPipe,
    ApaAuthorHtmlPipe,
    ApaAuthorsHtmlPipe,
    ApaCitationDocxPipe,
    ApaCitationsDocxPipe,
    ApaDocxPipe,
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
    SidebarComponent,
    ApaHtmlPipe,
    FullAmaPipe,
    DownloadDocxComponent,
    UserDashboardComponent,
    DisplayArticleComponent,
    MyCollectionComponent,
    ChicagoAuthorPipe,
    FullChicagoPipe,
    IeeeAuthorHtmlPipe,
    IeeeAuthorsHtmlPipe,
    IeeeHtmlPipe,
    ChicagoAuthorsPipe,
    MlaAuthorPipe,
    MlaAuthorsPipe,
    FullMlaPipe,
    NlmAuthorPipe,
    NlmAuthorsPipe,
    FullNlmPipe,
    AmaComponent,
    ApaComponent,
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
