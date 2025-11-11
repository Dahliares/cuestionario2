import { Component, OnDestroy } from '@angular/core';
import { Tema } from '../../models/tema.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-accordion-container',
  templateUrl: './accordion-container.component.html',
  styleUrl: './accordion-container.component.css'
})
export class AccordionContainerComponent implements OnDestroy {
  temas: Tema[] = [];
  isStarted: boolean = false;
  isCorregido: boolean = false;
  totalAciertos: number = 0;

  // Temporizador
  tiempoRestante: number = 100 * 60; // 1h 40min en segundos
  tiempoFormateado: string = '01:40:00'; // valor inicial visible
  minutosRestantes: number = 100;
  segundosRestantes: number = 0;
  private timerInterval: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  loadQuestions(): void {
    this.dataService.getQuestions().subscribe({
      next: (temas) => (this.temas = temas),
      error: (error) => console.error('Error al cargar las preguntas:', error),
    });
  }

  empezarExamen(): void {

     this.isStarted = true;
  this.isCorregido = false;
  this.totalAciertos = 0;
  this.tiempoRestante = 100 * 60; // 1h 40min
  this.tiempoFormateado = this.formatearTiempo(this.tiempoRestante);
    
  this.timerInterval = setInterval(() => {
  if (this.tiempoRestante > 0) {
    this.tiempoRestante--;
    this.tiempoFormateado = this.formatearTiempo(this.tiempoRestante);
  } else {
    clearInterval(this.timerInterval);
    if (!this.isCorregido) {
      this.corregirCuestionarios();
    }
  }
}, 1000);
}


  corregirCuestionarios(): void {
    if (this.isCorregido) return;

    this.isCorregido = true;
    clearInterval(this.timerInterval);
    this.totalAciertos = 0;
  }

  actualizarAciertos(aciertosTema: number): void {
    setTimeout(() => {
      this.totalAciertos += aciertosTema;
    });
  }

  private formatearTiempo(totalSegundos: number): string {
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  const h = horas.toString().padStart(2, '0');
  const m = minutos.toString().padStart(2, '0');
  const s = segundos.toString().padStart(2, '0');

  return `${h}:${m}:${s}`;
}
}