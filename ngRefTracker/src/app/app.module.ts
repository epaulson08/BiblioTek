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
import { ShowArticleComponent } from './components/show-article/show-article.component';
import { ShowCollectionComponent } from './components/show-collection/show-collection.component';
import { HomeComponent } from './components/home/home.component';
import { DisplayArticlesComponent } from './components/display-articles/display-articles.component';
import { ApaAuthorPipe } from './pipes/apa/apa-author.pipe';
import { ApaAuthorsPipe } from './pipes/apa/apa-authors.pipe';
import { AmaAuthorPipe } from './pipes/ama/ama-author.pipe';
import { AmaAuthorsPipe } from './pipes/ama/ama-authors.pipe';

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
    ShowArticleComponent,
    ShowCollectionComponent,
    HomeComponent,
    DisplayArticlesComponent,
    ApaAuthorPipe,
    ApaAuthorsPipe,
    AmaAuthorPipe,
    AmaAuthorsPipe
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
