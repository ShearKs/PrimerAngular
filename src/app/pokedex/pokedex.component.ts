
import { Component, OnInit } from '@angular/core';
import { concatMap, filter, tap } from 'rxjs';
import { PokedexApiCallService } from './pokedex-api-call.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { Pokemon, PokemonListElement } from './pokedex.interface';
import { MatIconModule } from '@angular/material/icon'
import { PokemonDetalleComponent } from "./pokemon-detalle/pokemon-detalle.component";
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip'


@Component({
  selector: 'app-pokedex',
  standalone: true,
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  providers: [PokedexApiCallService],
  imports: [MatTooltipModule, MatIconButton, MatTableModule, MatIconModule, PokemonDetalleComponent, RouterLink, MatCardModule, MatButtonModule]
})
export class PokedexComponent implements OnInit {

  public listaPokemon: PokemonListElement[] = [];
  public displayedColumns: String[] = ['name', 'url', 'a'];

  constructor(
    private readonly _pokedexCallService: PokedexApiCallService,
    private readonly _dialog: MatDialog,

  ) { }

  ngOnInit(): void {

    this._pokedexCallService.getPokemonList()
      .pipe(
        tap((v: any) => {
          console.log(v);
          this.listaPokemon = v.results;
        }),
      )
      .subscribe();
  }

  public obtenerIdUrl(url: string) {
    return  url.split('/')[6];

  }
 


  public obtenerEnlacePokemon(url: string, modal: boolean) {

    let rutaDevuelta = "";

    modal == true ? rutaDevuelta = this.obtenerIdUrl('/pokemon-detalle/' + url) : rutaDevuelta = this.obtenerIdUrl(url)

    return [rutaDevuelta];
  }


  public verPokemonModal(url: string) {
    const pokemonId: string = this.obtenerIdUrl(url);

    this._pokedexCallService.getPokemon(+pokemonId).
      pipe(
        concatMap((pokemon: Pokemon) => {
          const data = {
            //Es igual
            //pokemon: pokemon,
            pokemon,
          };
          const dialogo = this._dialog.open(
            PokemonDetalleComponent, { data });
          return dialogo.afterClosed();
        }),
        tap(v => {
          console.log('Se ha cerrado')
          console.log(v)
        }),
        filter(v => !!v),
        tap(v => console.log('Correcto', v))

      ).subscribe()
  }
}
