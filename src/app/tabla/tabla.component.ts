import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent implements OnInit {

  //Parámetro que se le pasa sin tener que hacer un servicio
  @Input() pruebaEntrada: string = '';

  @Output() pruebaSalida = new EventEmitter<any>();

  public tituloTabla: string = 'Prueba Tabla';
  public numeroColumnas: number = 0;
  public arrayFilas: number[] = [];
  constructor(public comunicacionService: ComunicacionService) { }

  ngOnInit(): void {

    console.log('Valor old en Tabla', this.comunicacionService.numeroColumnas)

    this.numeroColumnas = this.comunicacionService.numeroColumnas === 0 ?
      6 :
      this.comunicacionService.numeroColumnas;

    for (let x = 0; x < this.numeroColumnas; x++) {
      this.arrayFilas.push(x);
    }

    console.log('Array Filas', this.arrayFilas)

    console.log('Valor nuevo en Tabla', this.numeroColumnas)

  }

  public emitirEvento(){
    this.pruebaSalida.emit('SALIDA EVENTO');
  }

}
