import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoServiceService {
  private intentos: number;
  private perdido: string;

  public intentosSubject: Subject<number> = new Subject<number>();

  constructor() {

    this.intentos = 7;
    this.perdido = '';
  }

  public eliminarIntento() {

    if(this.intentos === 0){
      this.perdido = "Has perdido...";
      return;
    }

    this.intentos--;
    this.intentosSubject.next(this.intentos);
  }

  public saberIntentos(): number {
    return this.intentos;
  }
}
