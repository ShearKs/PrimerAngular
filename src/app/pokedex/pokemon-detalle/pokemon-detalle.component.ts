import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokedexApiCallService } from '../pokedex-api-call.service';
import { tap } from 'rxjs';
import { Pokemon } from '../pokedex.interface';
import { NgIf } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-pokemon-detalle',
  standalone: true,
  imports: [NgIf, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './pokemon-detalle.component.html',
  styleUrl: './pokemon-detalle.component.scss',
  providers: [PokedexApiCallService],
})
export class PokemonDetalleComponent implements OnInit {
  public id!: number;
  public pokemon!: Pokemon;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _pokedexApiCallService: PokedexApiCallService,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data: any,
    @Optional() private readonly _dialogRef:
      MatDialogRef<PokemonDetalleComponent>,

  ) {

    if (this.data) {
      this.pokemon = this.data.pokemon;
    }
  }

  ngOnInit(): void {
    //Coge la ruta actual
    this.id = this._route.snapshot.params['id'];

    if (this.id) {
      this._pokedexApiCallService.getPokemon(this.id)
        .pipe(
          tap((respuesta: Pokemon) => {
            this.pokemon = respuesta;
            console.log(this.pokemon)
          }),
        )
        .subscribe();
    }

  }

  public cerrarModal() {
    this._dialogRef.close({ correcto: true });
  }


  // public cerrarModal( correcto: boolean ) {
  //   this._dialogRef.close({ correcto });
  // }
}
