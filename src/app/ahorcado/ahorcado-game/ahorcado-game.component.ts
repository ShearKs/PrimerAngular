import { NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AhorcadoServiceService } from '../ahorcado-service.service';

@Component({
  selector: 'app-ahorcado-game',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './ahorcado-game.component.html',
  styleUrl: './ahorcado-game.component.scss'
})
export class AhorcadoGameComponent implements OnInit, AfterViewInit {

  @ViewChild('letras') palabras!: ElementRef;


  //public palabraAdivinar: string = "palabra";
  public palabraAdivinar: Array<string> = ['p', 'a', 'l', 'a', 'b', 'r', 'a'];

  public letraSele: FormControl;

  public intentos: number;

  public perdido: string;

  constructor(private ahorcadoService: AhorcadoServiceService,private cdr: ChangeDetectorRef) {
    this.letraSele = new FormControl('', Validators.maxLength(1))
    this.intentos = ahorcadoService.saberIntentos();
    this.perdido = "";
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.ahorcadoService.intentosSubject.subscribe((nuevoIntentos: number) => {
      this.intentos = nuevoIntentos;
    })
    //console.log(this.palabras)
  }
  public mostrarLetra() {
    const letra = this.letraSele.value;
    console.log(letra);
  }

  public consultarLetra() {
    const hijos = this.palabras.nativeElement.children;
    const letra = this.letraSele.value;

    for (let i = 0; i < this.palabraAdivinar.length; i++) {

      if (letra == this.palabraAdivinar[i]) {
        hijos[i].textContent = letra;
        console.log("Has adiviniado una letra en el ahoracado")
        break;
      }
    }

    this.cdr.detectChanges();

    this.ahorcadoService.eliminarIntento();
    console.log("Intentos que hay: " + this.ahorcadoService.saberIntentos)
  }
}
