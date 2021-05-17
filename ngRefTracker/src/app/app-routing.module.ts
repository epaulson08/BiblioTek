import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';
import { NaviComponent } from './components/navi/navi.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchComponent } from './components/search/search.component';
import { ShowArticleComponent } from './components/show-article/show-article.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list-articles' },
  { path: 'nav', component: NaviComponent },
  { path: 'list-articles', component: ListArticlesComponent },
  { path: 'show-article/:articleId', component: ShowArticleComponent },
  { path: 'create', component: CreateComponent },
  { path: 'my-collections', component: MyCollectionsComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: NotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
