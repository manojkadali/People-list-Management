import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>People List</h2>
        <button class="btn-primary" routerLink="/add">Add New Person</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let person of people">
            <td>{{person.firstName}} {{person.lastName}}</td>
            <td>{{person.email}}</td>
            <td>{{person.phone}}</td>
            <td class="actions">
              <button class="btn-secondary" [routerLink]="['/edit', person.id]">Edit</button>
              <button class="btn-danger" (click)="deletePerson(person.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .table th, .table td {
      padding: 12px;
      border: 1px solid #ddd;
      text-align: left;
    }
    .table th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
    .actions {
      display: flex;
      gap: 8px;
    }
  `]
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.peopleService.getPeople().subscribe(people => {
      this.people = people;
    });
  }

  deletePerson(id: number) {
    if (confirm('Are you want to delete this person?')) {
      this.peopleService.deletePerson(id).subscribe(() => {
        this.loadPeople();
      });
    }
  }
}