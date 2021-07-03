import { NgModule } from '@angular/core';
// web
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { DisplayArticlesComponent } from './components/display-articles/display-articles.component';
import { DownloadCopyComponent } from './components/download-copy/download-copy.component';
import { HomeComponent } from './components/home/home.component';
import { ListAllComponent } from './components/list-all/list-all.component';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';
import { NaviComponent } from './components/navi/navi.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { ShowArticleComponent } from './components/show-article/show-article.component';
import { ShowCollectionComponent } from './components/show-collection/show-collection.component';
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

@NgModule({
  declarations: [
    AmaAuthorPipe,
    AmaAuthorsPipe,
    ApaAuthorPipe,
    ApaAuthorsPipe,
    AppComponent,
    AuthorFormatPipe,
    CreateComponent,
    DisplayArticlesComponent,
    HomeComponent,
    ListAllComponent,
    MyCollectionsComponent,
    NaviComponent,
    NotFoundComponent,
    RegisterComponent,
    SearchComponent,
    ShowArticleComponent,
    ShowCollectionComponent,
    FullApaPipe,
    FullAmaPipe,
    DownloadCopyComponent,
    UserDashboardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    JournalArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
