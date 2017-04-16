import { LoginComponent } from './login/login.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component'
import { PageNotFoundComponent } from './404/404.component'
import { ModuleModule } from './module'
import { AuthGuard } from './core/services/auth.guard'
import { CanDeactivateGuard } from './shared/can-deactivate/can-deactivate.guard';
import { SelectivePreloadingStrategy } from './shared/selective-preloading-strategy';


function loadModModule() {
  return ModuleModule
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'module',
    loadChildren: loadModModule,
    canActivate: [AuthGuard]
  },
  {
    path: '404-page',
    component: PageNotFoundComponent,
  },
  { path: '**', redirectTo: '/404-page' }
]


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: SelectivePreloadingStrategy,
        useHash: true    // TODO: fix this. If this is false, the only page that works is the root
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRouting { };