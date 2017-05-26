import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './editable-article-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { EditorRouting } from './editor.routing';

@NgModule({
    imports: [
        EditorRouting,
        SharedModule
    ],
    declarations: [
        EditorComponent
    ],
    providers: [
        EditableArticleResolver
    ]
})
export class EditorModule { }
