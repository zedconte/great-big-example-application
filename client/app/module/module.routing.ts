import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModComponent } from './module.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: '',
    component: ModComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'setting',
        loadChildren: './setting/setting.module#SettingModule'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/index#DashboardModule'
      },
      {
        path: 'message',
        loadChildren: './message/index#MessageModule'
      },
      {
        path: 'user',
        loadChildren: './user/index#UserModule'
      },
      { path: 'bernie', loadChildren: './bernie/bernie.module#BernieModule' },
      { path: 'books', loadChildren: './books/books.module#BooksModule' },
      { path: 'contacts', loadChildren: './contact/contact.module#ContactModule' },
      { path: 'counter', loadChildren: './counter/counter.module#CounterModule' },
      { path: 'heroes', loadChildren: './heroes/heroes.module#HeroesModule' },
      { path: 'notes', loadChildren: './notes/notes.module#NotesModule' },
      { path: 'wiki', loadChildren: './wiki/wiki.module#WikiModule' }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRouting { }