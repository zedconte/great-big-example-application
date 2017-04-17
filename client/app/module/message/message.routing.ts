import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../shared/can-deactivate/can-deactivate.guard';
import { SelectivePreloadingStrategy } from '../../shared/selective-preloading-strategy';
import { MessagePage } from './message.page'

const routes: Routes = [
  {
    path: '',
    component: MessagePage
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class MessageRouting { }