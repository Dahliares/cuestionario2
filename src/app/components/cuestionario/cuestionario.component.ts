import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent implements OnChanges {

  @Input() questions: Question[] = [];
  @Input() enunciadoTema: string = "";
  @Input() isCorregido: boolean = false;
  @Output() onAciertos = new EventEmitter<number>();

  selectedAnswers: { [key: string]: string } = {};
  aciertos: number = 0;

  ngOnInit(): void {
    this.sortAnswers(this.questions);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isCorregido'] && this.isCorregido) {
      this.calcularAciertos();
    }
  }

  selectAnswer(questionId: string, answer: string): void {
    // Evita cambiar respuestas una vez corregido
    if (this.isCorregido) return;
    this.selectedAnswers[questionId] = answer;
  }

  sortAnswers(questions: Question[]): void {
    questions.forEach(q => q.respuestas.sort(() => Math.random() - 0.5));
  }

  calcularAciertos(): void {
    this.aciertos = 0;
    this.questions.forEach(q => {
      const seleccion = this.selectedAnswers[q.id];
      if (seleccion === q.respuestaCorrecta) {
        this.aciertos++;
      }
    });
    this.onAciertos.emit(this.aciertos);
  }

  getColor(question: Question, option: string): string {
  const seleccionada = this.selectedAnswers[question.id] === option;

  // Antes de corregir → gris si está seleccionada
  if (!this.isCorregido) {
    return seleccionada ? 'lightgray' : 'white';
  }

  // Después de corregir:
  const respuestaCorrecta = question.respuestaCorrecta;
  const seleccionUsuario = this.selectedAnswers[question.id];

  // Caso 1: opción seleccionada y correcta ✅
  if (seleccionada && option === respuestaCorrecta) return 'darkturquoise';

  // Caso 2: opción seleccionada pero incorrecta ❌
  if (seleccionada && option !== respuestaCorrecta) return 'red';

  // Caso 3: opción correcta no seleccionada 🟨 (solo si el usuario no la marcó)
  if (!seleccionada && option === respuestaCorrecta && seleccionUsuario !== respuestaCorrecta)
    return 'khaki';

  // Caso 4: las demás → blancas
  return 'white';
}

}