import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveService } from '../../services/active.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = ''
  @Input() timeZone: string = ''
  @Input() isCurrent: boolean = false;
  @Input() isSearchActive: boolean = true;
  @Input() localTime: string = '';
  @Input() searchTerm: string = '';

  @Output() update = new EventEmitter<void>();
  @Output() makeCurrent = new EventEmitter<{timeZone: string, localTime: string}>();

  constructor(public activeService: ActiveService){}

  onUpdate(_event: MouseEvent): void{
    this.update.emit();
  }
  onMakeCurrent(_event: MouseEvent): void{
    this.makeCurrent.emit({timeZone: this.timeZone, localTime: this.localTime});
  }
}
