import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CharacterList } from '../../types';
import { LocalStorageService } from '../../services/local-storage.service';
import { CardComponent } from '../../components/card/card.component';
import { ApiDataService } from '../../services/api-data.service';

const API_DATA_KEY_STATE = 'api-data'

@Component({
  selector: 'app-list',
  imports: [CommonModule, MatCardModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  data = [] as unknown as CharacterList

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private apiDataService: ApiDataService
  ) { }

  setCharacters(freshData: CharacterList) {
    this.data = freshData
    this.localStorageService.setItem(API_DATA_KEY_STATE, freshData)
  }

  async fetchAndSetCharacters() {
    try {
      const allCharacters = await this.apiDataService.fetchAllCharacters()  
      this.setCharacters(allCharacters)
    } catch (error) {
      console.log('error service api', error)
    }
  }

  onClickCharacter(id: number) {
    this.router.navigate(['/edit', id]);
  }

  ngOnInit() {
    if (this.localStorageService.getItem(API_DATA_KEY_STATE)) {
      this.data = this.localStorageService.getItem(API_DATA_KEY_STATE) as unknown as CharacterList
    } else {
      this.fetchAndSetCharacters()
    }
  }
}
