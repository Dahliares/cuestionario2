import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {

  @Input() title: string = '';
  isOpen: boolean = false;

  toggleSection(): void {
    this.isOpen = !this.isOpen;
  }

}
