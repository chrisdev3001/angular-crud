import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

import { CharacterList } from '../../types';
import { LocalStorageService } from '../../services/local-storage.service';
import { CardComponent } from '../../components/card/card.component';
import * as dummyResponseAPI from '../../../dummy/data.json';

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
    private router: Router
  ) {}

  setCharacters(freshData: CharacterList) {
    this.data = freshData
    this.localStorageService.setItem(API_DATA_KEY_STATE, freshData)
  }

  ngOnInit() {
    if (this.localStorageService.getItem(API_DATA_KEY_STATE)){
      this.data = this.localStorageService.getItem(API_DATA_KEY_STATE) as unknown as CharacterList
    }else{
      // call the api
      // ... TODO: call the api
      this.setCharacters(dummyResponseAPI as unknown as CharacterList)
    }    

    console.log(this.data, 'this.data')
  }

  onClickCharacter(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
