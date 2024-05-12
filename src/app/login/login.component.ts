import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public userForm: string | null = '';
  public passForm: string | null = '';


  public formularioControlEjer = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
  });



  public enviarFormulario() {

    const divSalida: any = document.getElementById('salida');
    console.log('Valido? ', this.formularioControlEjer.valid)

    console.log(divSalida)

    this.userForm = "Usuario: " + this.formularioControlEjer.controls.usuario.value;
    this.passForm = "Contraseña: " + this.formularioControlEjer.controls.password.value;

    if (!this.formularioControlEjer.valid) {
      divSalida.style.backgroundColor = "#cc3300";
    } else {
      divSalida.style.backgroundColor = "#009933";
    }

    //Salida
    console.log(this.formularioControlEjer.controls.usuario.value)
    console.log(this.formularioControlEjer.controls.password.value)
  }

}
