import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoServiceService {
  private intentos: number;
  private perdido: string;

  public letrasAdivinadas: Set<string> = new Set<string>();


  public intentosSubject: Subject<number> = new Subject<number>();
  private letrasAdivinadas$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {

    this.intentos = 7;
    this.perdido = '';
  }

  //Método para obtener las letras adivinadas..
  get obtenerLetrasAdivinadas(): Observable<string[]> {
    return this.letrasAdivinadas$.asObservable();
  }

  //Método que se encarga de actualizar la letras 
  public actualizarLetrasObservable(letras: string[]) {
    this.letrasAdivinadas$.next(letras);
  }

  public eliminarIntento(): void {

    this.intentos--;
    this.intentosSubject.next(this.intentos);
  }

  public actualizarAhorcado(): void {

    
  }


  public saberLetrasAdivinadas(): Set<String> {
    return this.letrasAdivinadas;
  }

  public saberIntentos(): number {
    return this.intentos;
  }
}
