import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'
import './app.global.scss'

import { StoreLogMonitorModule } from '@ngrx/store-log-monitor'

import { ROUTES } from './app.routes'

/** TODO: remove when work-around is not needed*/
import 'hammerjs';

/* App Root */
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './404/404.component'

/* Core Module */
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    StoreLogMonitorModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true    // TODO: fix this. If this is false, the only page that works is the root
    })
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
