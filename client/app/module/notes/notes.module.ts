// From Style guide item 4-09 - Feature Modules
// https://angular.io/docs/ts/latest/guide/style-guide.html#04-09

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';

import { RestService } from '../../core/services/rest.service';
import { NoteEffects } from '../../core/store/note/note.effects';
import { NoteComponent } from './note/note.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { NotesPage } from './notes.page';
import { NotesRouting } from './notes.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    NotesRouting,
    HttpModule,
    EffectsModule.run(NoteEffects)
  ],
  declarations: [
    NotesPage,
    NoteComponent,
    AddButtonComponent
  ],
  providers: [
    RestService
  ]
})
export class NotesModule { }
