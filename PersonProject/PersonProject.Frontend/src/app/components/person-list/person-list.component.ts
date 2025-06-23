import { Component, OnInit } from '@angular/core';
import { Person, PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // eklenen satır

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [MatTableModule],  // common ngFor için, MatTableModule tablo için
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  displayedColumns: string[] = ['name', 'surname', 'mail'];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.getAllPerson().subscribe(data => {
      this.persons = data;
    });
  }
}
