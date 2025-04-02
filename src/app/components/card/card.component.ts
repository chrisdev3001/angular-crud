import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() race: string = '';
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
