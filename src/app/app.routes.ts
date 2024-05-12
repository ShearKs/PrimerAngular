import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TablaComponent } from './tabla/tabla.component';
import { LoginComponent } from './login/login.component';
import { AhorcadoGameComponent } from './ahorcado/ahorcado-game/ahorcado-game.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonDetalleComponent } from './pokedex/pokemon-detalle/pokemon-detalle.component';


export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'tabla',
        component: TablaComponent,
    },
    {
        path: 'ahorcado-game',
        component: AhorcadoGameComponent,
    },
    {
        path: 'pokedex',
        component: PokedexComponent,
    },
    {
        path: 'pokedex/pokemon-detalle/:id',
        component: PokemonDetalleComponent,
    },

];
