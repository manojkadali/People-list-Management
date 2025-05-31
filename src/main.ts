import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { PeopleListComponent } from './app/components/people-list/people-list.component';
import { PersonEditComponent } from './app/components/person-edit/person-edit.component';
import { PersonAddComponent } from './app/components/person-add/person-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>People Management</h1>
    <router-outlet></router-outlet>
  `
})
export class App {
  name = 'People Management';
}

const routes = [
  { path: '', component: PeopleListComponent },
  { path: 'add', component: PersonAddComponent },
  { path: 'edit/:id', component: PersonEditComponent }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});