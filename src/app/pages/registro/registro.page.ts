import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  validar_form: FormGroup;
  errorMensaje: String='';
  passType = 'password'
  successMessage: string = '';
  nombre: string;
  apellido: string;
  email: string;
  password: string;

  constructor(public formBuilder: FormBuilder) { }

  validation_messages = {
    'nombre': [
      {type: 'required', message: 'Se requiere nombre de usuario'}
    ],
    'apellido': [
      {type: 'required', message: 'Se requiere apellido'}
    ],
    'email': [
      {type: 'required', message: 'Se requiere email'},
      {type: 'pattern', message: 'Ingrese un email válido'}
    ],
    'password': [
      { type: 'required', message: 'Se requiere contraseña.' },
      { type: 'minlength', message: 'La contraseña debe ser mayor a 5 digitos.' }
    ]
  }

  errMessage={
    'auth/user-not-found': 'Usuario no encontrado.',
    'auth/email-already-in-user': 'El correo electrónico ya se encuentra en uso.',
    'auth/wrong-password': 'Contraseña incorrecta.' 
  }

  ngOnInit() {
    this.validar_form = this.formBuilder.group ({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      apellido: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    })
  }

  onSubmit() {
    if (this.validar_form.valid) {
      const formData = this.validar_form.value;
      console.log('Formulario válido', formData);
      this.successMessage = 'Registro exitoso';
      this.errorMensaje = '';
    } else {
      console.log('Formulario inválido');
      this.successMessage = '';
      this.errorMensaje = 'Por favor, complete todos los campos correctamente.';
    }
  }


}
