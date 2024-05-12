import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { clearInterval } from 'timers';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public numeroColumnas: number = 5;
  public usuario: string = '';
  public password: string = '';

  public contador: number = 0;

  public formulario = { usuario: '', password: '' }

  public formularioControl = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public observablePalabras = new BehaviorSubject<string>('');

  constructor(
    public comunicacionService: ComunicacionService,
    public router: Router,
  ) { }

  //Inicio del componente
  ngOnInit(): void {
    // console.log('Valor Tabla', this.comunicacionService.numeroColumnas)
    // this.comunicacionService.numeroColumnas = this.numeroColumnas;
    // console.log('Valor nuevo Tabla', this.comunicacionService.numeroColumnas)

    // this.observablePalabras
    //   .pipe(
    //     tap((cambio =>       
    //       console.log(cambio) 
    //     )),
    //     finalize(() => console.log('final')))
    //   .subscribe();

    // setInterval(() => {
    //   this.contador++;
    //   this.observablePalabras.next(`Contador: ${this.contador}`);
    // }, 2000);

  }

  public enviarFormulario() {

    console.log('Valido? ', this.formularioControl.valid)
    // console.log(this.usuario);
    // console.log(this.password);
    //console.log(this.formularioControl)
    console.log(this.formularioControl.controls.usuario.value)
    console.log(this.formularioControl.controls.password.value)
  }
}
