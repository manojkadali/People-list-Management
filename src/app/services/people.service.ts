import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private people: Person[] = [
    { id: 1, firstName: 'manoj', lastName: 'kadali', email: 'kmanoj@gmail.com', phone: '123-456-7890' },
    { id: 2, firstName: 'rakesh', lastName: 'kumar', email: 'rakesh@mail.com', phone: '098-765-4321' }
  ];

  private getNextId(): number {
    return Math.max(...this.people.map(p => p.id), 0) + 1;
  }

  getPeople(): Observable<Person[]> {
    return of(this.people);
  }

  getPerson(id: number): Observable<Person | undefined> {
    return of(this.people.find(person => person.id === id));
  }

  addPerson(person: Person): Observable<Person> {
    person.id = this.getNextId();
    this.people.push({...person});
    return of(person);
  }

  updatePerson(person: Person): Observable<Person> {
    const index = this.people.findIndex(p => p.id === person.id);
    if (index !== -1) {
      this.people[index] = person;
    }
    return of(person);
  }

  deletePerson(id: number): Observable<void> {
    this.people = this.people.filter(person => person.id !== id);
    return of(void 0);
  }
}