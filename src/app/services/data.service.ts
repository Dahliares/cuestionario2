import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { Tema } from '../models/tema.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'assets/data/examen.json'; // Ajusta la URL de tu API o ruta local

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.apiUrl);
  }
}
