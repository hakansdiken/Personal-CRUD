import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PersonListComponent } from './components/person-list/person-list.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PersonListComponent, CreatePersonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})

export class AppComponent {
  title = 'PersonProject.Frontend';
}
