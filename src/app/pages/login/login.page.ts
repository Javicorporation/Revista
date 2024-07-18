import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  formularioLogin: FormGroup; 
  errorMessage: string= "";
  isDisabledPass = true;
  passType = 'password';

  errMessage={
    'auth/user-not-found': 'Usuario no encontrado.',
    'auth/email-already-in-user': 'El correo electrónico ya se encuentra en uso.',
    'auth/wrong-password': 'Contraseña incorrecta.' 
  }

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formularioLogin = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Se requiere Email.' },
      { type: 'pattern', message: 'Ingrese un email válido.' }
    ],
    'password': [
      { type: 'required', message: 'Se require contraseña.' },
      { type: 'minlength', message: 'La contraseña debe ser mayor a 5 caracteres' }
    ]
  };

  showPassword(){
    this.isDisabledPass = false;
    this.passType = 'text'
    
  }

  hidePassword(){ 
    this.isDisabledPass = true;
    this.passType = 'password'
  }

}
