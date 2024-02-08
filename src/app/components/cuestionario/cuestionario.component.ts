import { Component, Input } from '@angular/core';
import { Question } from '../../models/question.model';
import { DataService } from '../../services/data.service';
import { Tema } from '../../models/tema.model';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent {

  @Input() questions: Question[] = [];

  selectedAnswers: { [key: string]: string } = {};

  
  ngOnInit(): void {

    this.sortAnswers(this.questions);
    
  }
  

  selectAnswer(questionId: string, answer: string): void {
    this.selectedAnswers[questionId] = answer;
  }

  sortAnswers(questions: Question[]): void{

    questions.forEach(element => {

       element.respuestas.sort(function() {return Math.random() - 0.5});       
      
    });

  }
}
