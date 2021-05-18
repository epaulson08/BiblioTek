import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JournalArticleService } from './services/journal-article.service';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorFormatPipe } from './pipes/author-format.pipe';
import { NaviComponent } from './components/navi/navi.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateComponent } from './components/create/create.component';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';
import { SearchComponent } from './components/search/search.component';
import { DisplayArticleSearchResultsPipe } from './pipes/display-article-search-results.pipe';
import { ShowArticleComponent } from './components/show-article/show-article.component';
import { ShowCollectionComponent } from './components/show-collection/show-collection.component';
import { ApaCitationPipe } from './pipes/apa-citation.pipe';
import { ApaCitationAuthorsPipe } from './pipes/apa-citation-authors.pipe';
import { ApaCitationAuthorPipe } from './pipes/apa-citation-author.pipe';
import { AuthorEtAlHandlerPipe } from './pipes/author-et-al-handler.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListArticlesComponent,
    AuthorFormatPipe,
    NaviComponent,
    NotFoundComponent,
    CreateComponent,
    MyCollectionsComponent,
    SearchComponent,
    DisplayArticleSearchResultsPipe,
    ShowArticleComponent,
    ShowCollectionComponent,
    ApaCitationPipe,
    ApaCitationAuthorsPipe,
    ApaCitationAuthorPipe,
    AuthorEtAlHandlerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    JournalArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
