import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  id?: string;
  name: string;
  surname: string;
  mail: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = 'http://localhost:5073/api/person'; 

  constructor(private http: HttpClient) { }

  getAllPerson(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }
}
