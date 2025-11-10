import { Component } from '@angular/core';
import { Tema } from '../../models/tema.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-accordion-container',
  templateUrl: './accordion-container.component.html',
  styleUrl: './accordion-container.component.css'
})
export class AccordionContainerComponent {
  temas: Tema[] = [];
  isCorregido: boolean = false;
  totalAciertos: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.dataService.getQuestions().subscribe({
      next: (temas) => (this.temas = temas),
      error: (error) => console.error('Error al cargar las preguntas:', error),
    });
  }

  corregirCuestionarios(): void {
    this.isCorregido = true;
    this.totalAciertos = 0; // Reinicia antes de acumular los aciertos de cada tema
  }

  actualizarAciertos(aciertosTema: number): void {
  setTimeout(() => {
    this.totalAciertos += aciertosTema;
  });
}
}