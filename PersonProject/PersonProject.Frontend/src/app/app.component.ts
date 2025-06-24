import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { PersonListComponent } from './components/person-list/person-list.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { Person } from './services/person.service';
import { UpdatePersonComponent } from './components/update-person/update-person.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PersonListComponent,
    CreatePersonComponent,
    UpdatePersonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PersonProject.Frontend';
  isEditMode = false;
  selectedPerson!: Person;
  
  onEditPerson(person: Person) {
    this.selectedPerson = person;
    this.isEditMode = true;
  }

  onCancelEdit() {
    this.isEditMode = false;
  }

  onUpdateCompleted() {
    this.isEditMode = false;
    this.personList.loadPersons();
  }

  @ViewChild('personList') personList!: PersonListComponent;

  onPersonChanged() {
    this.personList.loadPersons();
  }
}
