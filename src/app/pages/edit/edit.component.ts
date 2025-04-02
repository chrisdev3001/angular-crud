import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../services/local-storage.service';
import { Character, CharacterList } from '../../types';
import { CommonModule } from '@angular/common';

const SNACKBAR_DURATION = 2 * 1000; // 3 seconds

@Component({
  selector: 'app-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  character = {} as unknown as Character

  nameControl = new FormControl('', [Validators.required]);
  raceControl = new FormControl('', [Validators.required]);

  private _snackBar = inject(MatSnackBar);

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const apiData = this.localStorageService.getItem('api-data') as unknown as CharacterList
    const characterFound = apiData.results.find(character => character.id === Number(this.route.snapshot.paramMap.get('id')))

    if (!characterFound) {
      this.router.navigate(['/'])
    }

    this.character = characterFound!
    this.nameControl.setValue(this.character.name);
    this.raceControl.setValue(this.character.species);
  }

  onSubmit() {
    const updatedCharacter: Character = {
      ...this.character,
      name: this.nameControl.value!,
      species: this.raceControl.value!
    };

    const apiData = this.localStorageService.getItem('api-data') as unknown as CharacterList
    const updatedCharacters = apiData.results.map(character => character.id === this.character.id ? updatedCharacter : character);
    this.localStorageService.setItem('api-data', { ...apiData, results: updatedCharacters })

    this._snackBar.open('Personaje actualizado', 'Operación exitosa', { duration: SNACKBAR_DURATION });

    setTimeout(() => {
      this.router.navigate(['/']);
    }, SNACKBAR_DURATION);
  }

}
