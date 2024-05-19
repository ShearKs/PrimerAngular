import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoServiceService {
  private intentos: number;
  private perdido: string;

  //public letrasAdivinadas: Set<string> = new Set<string>();
  public letrasAdivinadas: Map<number, string> = new Map<number, string>()


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

  public eliminarIntento(): string {
    let mensajeError = "";
    if (this.intentos === 0) {
      mensajeError = "Te has quedado sin intentos";
    } else {
      this.intentos--;
      this.intentosSubject.next(this.intentos);
    }
    return mensajeError;

  }

  public actualizarAhorcado(): void {





  }


  public saberLetrasAdivinadas(): Map<number, string> {
    return this.letrasAdivinadas;
  }

  public saberIntentos(): number {
    return this.intentos;
  }
}
