import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PersonService } from '../../services/person.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-person',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css'],
})
export class CreatePersonComponent {
  personForm: FormGroup;

  constructor(private fb: FormBuilder, private personService: PersonService) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
    });
  }
  @Output() personCreated = new EventEmitter<void>();
  onSubmit() {

    if (this.personForm.valid) {
      this.personService.createPerson(this.personForm.value).subscribe(() => {
        console.log('Kişi başarıyla eklendi');
        this.personForm.reset();
        this.personCreated.emit(); //parent component'e bildirim gönder
        this.personForm.reset(); //formu sıfırla
      });
    } else {
      this.personForm.markAllAsTouched();
      console.log('Form geçerli değil');
    }
  }
}
