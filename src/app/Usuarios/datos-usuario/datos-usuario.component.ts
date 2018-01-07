import { Component, OnInit } from '@angular/core';
import { FormControl ,FormGroup, FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  registroCliente : FormGroup;
  registrarCliente: any;
  telefono: any ;
  direccion: any;
  correo: any;
  contrasena: any;
  recontrasena: any;
  saveRegistro(){
    const saveRegistro = {
      nombres: this.registroCliente.get('nombres').value,
      apellidos: this.registroCliente.get('apellidos').value,
      telefono: this.registroCliente.get('telefono').value,
      direccion: this.registroCliente.get('direccion').value,
      correo: this.registroCliente.get('correo').value,      
      contrasena: this.registroCliente.get('contrasena').value,
      recontrasena: this.registroCliente.get('recontrasena').value,
    };
    return saveRegistro;
  }

  onSubmit(){
    this.registrarCliente = this.saveRegistro();
  }

  onChanges(){
    this.registroCliente.valueChanges.subscribe(valor=>{
      this.telefono = valor.telefono;
      this.direccion = valor.direccion;
      this.correo = valor.correo;
      this.contrasena = valor.contrasena;
      this.recontrasena = valor.recontrasena;
    });
  }
  constructor( private rc: FormBuilder) {
  }

  ngOnInit() {
    this.registroCliente = this.rc.group({
      nombres : ['Pulsoro', Validators.required],
      apellidos: ['Soto', Validators.required],
      telefono: ['6681018321', Validators.required],
      direccion: ['bachoco 1780 jiji', Validators.required],      
      correo: ['pul123456@hotmail.com', Validators.required],
      contrasena: ['*********', Validators.required],
      recontrasena: ['*********', Validators.required],
    });
    this.onChanges();
  }
}
