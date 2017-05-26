import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogPage } from './blog.page';
import { UserRouteAccessService } from '../../shared';

const routes: Routes = [
    {
        path: '', component: BlogPage,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.blog.home.title',
            source: 'https://github.com/gothinkster/angular-realworld-example-app',
            tags: ['pagination']
        },
        canActivate: [UserRouteAccessService]
    }
];

export const routedComponents = [BlogPage];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRouting { }
