import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterList } from '../types';

const API_URL = 'https://rickandmortyapi.com/api/character'
const MAX_PAGES_TO_FETCH = 3

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private apiUrl = API_URL

  constructor(private http: HttpClient) { }

  // Obtiene personajes de una página específica (usando Promesa)
  async getCharacters(page: number): Promise<CharacterList> {
    try {
      const data = await this.http.get<CharacterList>(`${this.apiUrl}?page=${page}`).toPromise()
      return data as CharacterList
    } catch (error) {
      console.log('error api', error)
      return null!
    }
  }
  
  async fetchAllCharacters(): Promise<CharacterList> {    
    const promises: Promise<CharacterList>[] = [];
    for (let page = 1; page <= MAX_PAGES_TO_FETCH; page++) {
      promises.push(this.getCharacters(page));
    }
    
    const pagesData = await Promise.all(promises);
  
    const allCharacters: CharacterList = {
      results: pagesData.flatMap((data) => data.results), // Junta todos los resultados
      info: pagesData[pagesData.length - 1].info, // Usa la info de la última página
    };

    return allCharacters;
  }
}