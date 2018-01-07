import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { Cliente } from '../clientes/clientes.modelo';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SelectItem } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';

import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;
  registroCliente: FormGroup;
  cliente: any = [];
  client = new Cliente();

  tipo_persona: SelectItem[];
  estatus: SelectItem[];

  userdata : any;
  
  id: string;
  telefono:  string =  "";
  password: string = "";
  contrasena: string = "";

  erroresForm = {
    'email' : '',
    'password': ''
  }
  mensajesValidacion = {
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca una direccion de email correcta'
    },
    'password':{
      'required': 'Contraseña Obligatoria',
      'pattern' : ' La contraseña debe tener al menos una letra,  un numero',
      'minlength': ' y debe de ser de mas 6 caracteres'
    }
  }

  constructor(private pf: FormBuilder, private clienteService: ClientesService, private router: Router, private activatedRouter: ActivatedRoute, private autenticacion: AutenticacionService) {
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      console.log(this.id);
      this.clienteService.getCliente(this.id)
        .subscribe(cliente => {
          this.client = cliente[0];
          
        })
        
     
     this.tipo_persona = [];
     this.tipo_persona.push({label: 'Selecciona tipo de persona',value:null});
     this.tipo_persona.push({label:'Moral',value:'Moral'});
     this.tipo_persona.push({label:'Fisica',value:'Fisica'});
 
     this.estatus = [];
     this.estatus.push({label:'Seleccione status del cliente', value:null});
     this.estatus.push({label:'Activo',value:'Activo'});
     this.estatus.push({label:'Inactivo',value:'Inactivo'});
    
    });
  }

  onSubmit() {
    this.cliente = this.saveRegistro();
    //this.autenticacion.registroUsuario(this.userdata);  
    console.log(this.client.email);   
    this.clienteService.putCliente(this.cliente, this.id).subscribe(newpres => { this.router.navigate(['/admin-clientes/clientes']) })
  }
  saveRegistro() {
    const saveRegistro = {
      nombre: this.registroCliente.get('nombre').value,
      apellidos: this.registroCliente.get('apellidos').value,
      telefono: this.registroCliente.get('telefono').value,
      direccion: this.registroCliente.get('direccion').value,
      email: this.registroCliente.get('email').value,
      password: this.registroCliente.get('password').value,      
      contrasena: this.registroCliente.get('contrasena').value,
      tipo_persona: this.registroCliente.get('tipo_persona').value,
      estatus: this.registroCliente.get('estatus').value,

    };
    return saveRegistro;

  }

  ngOnInit() {
    this.registroCliente = this.pf.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],      
      contrasena: ['', Validators.required],
      tipo_persona: ['', Validators.required],
      estatus: ['', Validators.required],
    });
  }

}
