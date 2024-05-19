import { NgFor, NgIf,NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AhorcadoServiceService } from '../ahorcado-service.service';

@Component({
  selector: 'app-ahorcado-game',
  standalone: true,
  imports: [NgFor,NgClass, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './ahorcado-game.component.html',
  styleUrl: './ahorcado-game.component.scss'
})
export class AhorcadoGameComponent implements OnInit {

  //@ViewChild('letras') palabras!: ElementRef;

  //public palabraAdivinar: string = "palabra";
  public palabraAdivinar: Array<string> = ['p', 'a', 'l', 'a', 'b', 'r', 'a'];
  public letrasAdivinadas: string[] = [];

  public letraSele: FormControl;

  public juegoActivo: boolean = false;
  public botonActivo:boolean = false;
  public intentos: number;
  public mensajeFinal: string;

  constructor(private ahorcadoService: AhorcadoServiceService) {
    this.letraSele = new FormControl('', Validators.maxLength(1))
    this.intentos = ahorcadoService.saberIntentos();
    this.mensajeFinal = "";
  }

  ngOnInit(): void {

    for (let i = 0; i < this.palabraAdivinar.length; i++) {
      this.letrasAdivinadas[i] = "";
    }

    this.ahorcadoService.intentosSubject.subscribe((nuevoIntentos: number) => {
      this.intentos = nuevoIntentos;
    })
  }
  public mostrarLetra() {
    const letra = this.letraSele.value;
    console.log(letra);
  }

  public comenzarJuego(): void {
    this.juegoActivo = true;
    this.botonActivo = true;
  }

  private terminado(): void {

    const sonIguales = this.palabraAdivinar.length === this.letrasAdivinadas.length 
      && this.palabraAdivinar.every((value, index) => value === this.letrasAdivinadas[index]);

    if (sonIguales) {
      //console.log("FELICIDADEEEES HAS GANADO")
      this.mensajeFinal = "Felicidades has GANADO";
      this.botonActivo = false;
    }

  }

  public consultarLetra() {

    const letra = (this.letraSele.value).toLowerCase();

    for (let i = 0; i < this.palabraAdivinar.length; i++) {

      if (letra == this.palabraAdivinar[i]) {

        console.log("Has adivinado una letra en el ahoracado")
        console.log("Has adivinado la letra: " + letra + " en la posición: " + i)

        this.ahorcadoService.letrasAdivinadas.set(i, letra);
      }
    }
    this.ahorcadoService.letrasAdivinadas.forEach((valor, clave) => {
      console.log(`Clave: ${clave}, Valor: ${valor}`);
      this.letrasAdivinadas[clave] = valor;
    })

    if (this.ahorcadoService.eliminarIntento() !== ""){

      this.mensajeFinal = this.ahorcadoService.eliminarIntento();
      this.botonActivo = false;
      return;
    }
    console.log("Intentos que hay: " + this.ahorcadoService.saberIntentos())
    console.log("Letras Adivinadas: " + Array.from(this.ahorcadoService.saberLetrasAdivinadas()));
    this.terminado();

  }
}
