import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PersonListComponent } from './components/person-list/person-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PersonListComponent], 
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'PersonProject.Frontend';
}
