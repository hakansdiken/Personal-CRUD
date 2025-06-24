import { Component, OnInit } from '@angular/core';
import { Person, PersonService } from '../../services/person.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  displayedColumns: string[] = ['name', 'surname', 'mail', 'actions'];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.getAllPerson().subscribe({
      next: (data) => {
        this.persons = data;
      },
      error: (err) => {
        console.error('Kişiler listelenemedi:', err);
      }
    });
  }

  deletePerson(id: string | undefined): void {
    if (!id) return;

    this.personService.deletePerson(id).subscribe({
      next: () => {
        this.loadPersons();
      },
      error: (err) => {
        console.error('Silme başarısız:', err);
      }
    });
  }
}
