import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DownloadCopyComponent } from './components/download-copy/download-copy.component';
import { HomeComponent } from './components/home/home.component';
import { ListAllComponent } from './components/list-all/list-all.component';
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';
import { NaviComponent } from './components/navi/navi.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { ShowArticleComponent } from './components/show-article/show-article.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent},
  { path: 'nav', component: NaviComponent },
  { path: 'show-article/:articleId', component: ShowArticleComponent },
  { path: 'list-articles', component: ListAllComponent },
  { path: 'create', component: CreateComponent },
  { path: 'my-collection/:collId', component: MyCollectionComponent },
  { path: 'my-collections', component: MyCollectionsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'test', component: DownloadCopyComponent},
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
