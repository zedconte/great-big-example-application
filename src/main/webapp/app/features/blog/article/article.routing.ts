import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './article.component';
import { UserRouteAccessService } from '../../../shared';

const routes: Routes = [
    {
        path: 'article/:slug',
        component: ArticleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.bernie.home.title',
            source: 'https://angular2.realworld.io',
            tags: []
        },
        canActivate: [UserRouteAccessService]
    }
];

export const routedComponents = [ArticleComponent];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRouting { }
