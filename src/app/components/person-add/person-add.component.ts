import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <h2>Add New Person</h2>
      <form (ngSubmit)="onSubmit()" #personForm="ngForm">
        <div class="form-group">
          <label>First Name:</label>
          <input type="text" [(ngModel)]="person.firstName" name="firstName" required>
        </div>
        <div class="form-group">
          <label>Last Name:</label>
          <input type="text" [(ngModel)]="person.lastName" name="lastName" required>
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" [(ngModel)]="person.email" name="email" required 
                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
        </div>
        <div class="form-group">
          <label>Phone:</label>
          <input type="tel" [(ngModel)]="person.phone" name="phone" required
                 pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
        </div>
        <div class="button-group">
          <button type="submit" class="btn-primary">Add Person</button>
          <button type="button" routerLink="/" class="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    .button-group {
      display: flex;
      gap: 10px;
      justify-content: flex-start;
    }
  `]
})
export class PersonAddComponent {
  person: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  constructor(
    private router: Router,
    private peopleService: PeopleService
  ) {}

  validateForm(): boolean {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const phonePattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

    if (!emailPattern.test(this.person.email)) {
      alert('Please enter  valid email(example@domain.com)');
      return false;
    }

    if (!phonePattern.test(this.person.phone)) {
      alert('Please enter phone number in format: XXX-XXX-XXXX');
      return false;
    }

    return true;
  }

  onSubmit() {
    if (this.validateForm()) {
      this.peopleService.addPerson(this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}