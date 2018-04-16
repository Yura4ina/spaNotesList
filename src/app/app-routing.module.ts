import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesFormComponent } from './controllers/notes-form/notes-form.component';
import { SpanotesComponent } from './controllers/spanotes/spanotes.component';
import { EditFormComponent } from './controllers/edit-form/edit-form.component';
import { SingleQueryComponent } from './controllers/single-query/single-query.component';

const routes: Routes = [
    { path: 'addForm', component: NotesFormComponent },
    { path: 'editForm/:id', component: EditFormComponent },
    { path: 'singleNote/:id', component: SingleQueryComponent },
    { path: 'viewList', component: SpanotesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{
    
}
export const routingComponents = [NotesFormComponent, EditFormComponent, SpanotesComponent]