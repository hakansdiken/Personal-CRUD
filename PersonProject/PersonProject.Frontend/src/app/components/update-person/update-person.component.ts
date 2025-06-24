import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { PersonService, Person } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-person',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css'],
})
export class UpdatePersonComponent implements OnInit, OnChanges {
  @Input() person!: Person;
  @Output() cancel = new EventEmitter<void>();
  @Output() updatedPerson = new EventEmitter<void>();

  personForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createForm();

    if (this.person) {
      this.personForm.patchValue(this.person);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person'] && this.personForm) {
      this.personForm.patchValue(this.person);
      this.cdr.detectChanges();
    }
  }

  createForm() {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.personForm.valid && this.person?.id) {
      this.personService
        .updatePerson(this.person.id, this.personForm.value)
        .subscribe(
          () => {
            this.updatedPerson.emit();
          },
          (error) => {
            console.error('Güncelleme hatası:', error);
          }
        );
    }
    else {
      this.personForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
