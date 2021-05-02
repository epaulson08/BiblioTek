import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JournalArticleService } from './services/journal-article.service';
import { ListAllComponent } from './components/list-all/list-all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorFormatPipe } from './pipes/author-format.pipe';
import { NaviComponent } from './components/navi/navi.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateComponent } from './components/create/create.component';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';
import { SearchComponent } from './components/search/search.component';
import { DisplayArticleSearchResultsPipe } from './pipes/display-article-search-results.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListAllComponent,
    AuthorFormatPipe,
    NaviComponent,
    NotFoundComponent,
    CreateComponent,
    MyCollectionsComponent,
    SearchComponent,
    DisplayArticleSearchResultsPipe
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
