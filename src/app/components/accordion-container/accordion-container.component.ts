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

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.dataService.getQuestions().subscribe({
      next: (temas) => {
        this.temas = temas;       
      },
      error: (error) => {
        console.error('Error al cargar las preguntas:', error);
      }
  });
  }

}
