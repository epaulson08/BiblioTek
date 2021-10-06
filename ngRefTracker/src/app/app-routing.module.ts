import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DisplayAllArticlesComponent } from './components/display-all-articles/display-all-articles.component';
import { DownloadDocxComponent } from './components/download-docx/download-docx.component';
import { HomeComponent } from './components/home/home.component';
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { ShowArticleComponent } from './components/show-article/show-article.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserPreferencesResolverService } from './services/user-preferences-resolver.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent},
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    resolve: {
      chosenPalette: UserPreferencesResolverService
    }
  },
  { path: 'show-article/:articleId', component: ShowArticleComponent },
  { path: 'display-all-articles', component: DisplayAllArticlesComponent },
  { path: 'create', component: CreateComponent },
  { path: 'my-collection/:collId', component: MyCollectionComponent },
  { path: 'my-collections', component: MyCollectionsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:searchTerm', component: SearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'test', component: DownloadDocxComponent},
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
