
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, PokemonListCallResponse } from './pokedex.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PokedexApiCallService {

  public api: string = 'https://pokeapi.co/api/v2/';
  public pokemonEndPoint: string = 'pokemon';

  constructor(
    private readonly _http: HttpClient,
  ) {}

  public getPokemon(id: number): Observable<any> {
    return this._http.get<Pokemon>(`${this.api}${this.pokemonEndPoint}/${id}`)
  }

  public getPokemonList(page: number = 0, pagesize: number = 5): Observable<PokemonListCallResponse> {
    return this._http.get<PokemonListCallResponse>(`${this.api}${this.pokemonEndPoint}/?limit=${pagesize}&offset=${page * pagesize}`);
  }
}
