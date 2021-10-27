import { NgModule } from '@angular/core';

// web
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { AmaCitationComponent } from './components/citation/ama/ama-citation.component';
import { ApaCitationComponent } from './components/citation/apa/apa-citation.component';
import { AppComponent } from './app.component';
import { CitationStyleSwitchComponent } from './components/citation/citation-style-switch/citation-style-switch.component';
import { CiteAllUiComponent } from './components/citation/cite-all-ui/cite-all-ui.component';
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
import { AmaAuthorPipe } from './pipes/ama/author-builder/ama-author.pipe';
import { AmaAuthorsPipe } from './pipes/ama/author-builder/ama-authors.pipe';
import { ApaAuthorPipe } from './pipes/apa/author-builder/apa-author.pipe';
import { ApaAuthorsPipe } from './pipes/apa/author-builder/apa-authors.pipe';
import { ApaCitationDocxPipe } from './pipes/apa/docx-builder/apa-citation-docx.pipe';
import { ApaCitationsDocxPipe } from './pipes/apa/docx-builder/apa-citations-docx.pipe';
import { AmaDocxPipe } from './pipes/ama/docx-builder/ama-docx.pipe';
import { ApaDocxPipe } from './pipes/apa/docx-builder/apa-docx.pipe';
import { AuthorFormatPipe } from './pipes/author-format.pipe';
import { IeeeHtmlPipe } from './pipes/ieee/ieee-html.pipe';
import { FullNlmPipe } from './pipes/nlm/full-nlm.pipe';
import { IeeeAuthorHtmlPipe } from './pipes/ieee/html-builder/ieee-author-html.pipe';
import { IeeeAuthorsHtmlPipe } from './pipes/ieee/html-builder/ieee-authors-html.pipe';
import { NlmAuthorPipe } from './pipes/nlm/nlm-author.pipe';
import { NlmAuthorsPipe } from './pipes/nlm/nlm-authors.pipe';
import { TitleValidatorPipe } from './pipes/validator/title-validator.pipe';
// services
import { AuthService } from './services/auth.service';
import { JournalArticleService } from './services/journal-article.service';

@NgModule({
  declarations: [
    AmaAuthorPipe,
    AmaAuthorsPipe,
    AmaCitationComponent,
    AmaDocxPipe,
    ApaCitationComponent,
    ApaAuthorPipe,
    ApaAuthorsPipe,
    ApaCitationDocxPipe,
    ApaCitationsDocxPipe,
    ApaDocxPipe,
    AppComponent,
    AuthorFormatPipe,
    CitationStyleSwitchComponent,
    CiteAllUiComponent,
    CreateComponent,
    DisplayArticleComponent,
    DisplayAllArticlesComponent,
    DisplayArticlesComponent,
    DownloadDocxComponent,
    FullNlmPipe,
    HomeComponent,
    IeeeAuthorHtmlPipe,
    IeeeAuthorsHtmlPipe,
    IeeeHtmlPipe,
    MyCollectionComponent,
    MyCollectionsComponent,
    NaviComponent,
    NlmAuthorPipe,
    NlmAuthorsPipe,
    NotFoundComponent,
    RegisterComponent,
    SearchComponent,
    ShowArticleComponent,
    SidebarComponent,
    TitleValidatorPipe,
    UserDashboardComponent,
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
