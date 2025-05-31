import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <h2>Edit Person</h2>
      <form (ngSubmit)="onSubmit()" *ngIf="person">
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
        <button type="submit" class="btn-primary">Save</button>
        <button type="button" routerLink="/" class="btn-secondary">Cancel</button>
      </form>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; }
    .form-group input { width: 100%; padding: 8px; }
    button { margin: 0 5px; padding: 5px 10px; }
  `]
})
export class PersonEditComponent implements OnInit {
  person?: Person;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.peopleService.getPerson(id).subscribe(person => {
      this.person = person;
    });
  }

  validateForm(): boolean {
    if (!this.person) return false;

    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const phonePattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

    if (!emailPattern.test(this.person.email)) {
      alert('Please enter a valid email address (example@domain.com)');
      return false;
    }

    if (!phonePattern.test(this.person.phone)) {
      alert('Please enter a valid phone number in format: XXX-XXX-XXXX');
      return false;
    }

    return true;
  }

  onSubmit() {
    if (this.person && this.validateForm()) {
      this.peopleService.updatePerson(this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}