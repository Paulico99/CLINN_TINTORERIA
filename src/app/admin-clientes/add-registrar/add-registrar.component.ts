import { Component, OnInit,ViewChild,OnChanges } from '@angular/core';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

import { AutenticacionService } from '../../servicios/autenticacion.service';
import { onValueChanged } from '@angular/cli';
//import {PasswordModule} from 'primeng/primeng';

import { ClientesService } from '../../servicios/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../clientes/clientes.modelo';


@Component({
  selector: 'app-add-registrar',
  templateUrl: './add-registrar.component.html',
  styleUrls: ['./add-registrar.component.css']
})
export class AddRegistrarComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;  
  registroCliente : FormGroup;
  cliente: any;

  tipo_persona: SelectItem[];
  estatus: SelectItem[];

  SelectPersona: string;
  Selectestatus: string;

  userdata : any;
  

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
/*
  password : PasswordModule;
  contrasena: PasswordModule;
  

  passwordMatch(){
    if(this.password !== this.contrasena)
          this.contrasena.info('Las contraseñas no coinciden.');
      else
          this.contrasena
  }
  */

  saveRegistro(){
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

  onSubmit(){
    this.cliente = this.saveRegistro();
    this.userdata = this.saveRegistro();
    this.autenticacion.registroUsuario(this.userdata); 
    this.clienteService.postCliente(this.cliente).subscribe(newpres => {this.router.navigate(['/admin-clientes/clientes'])})
  }

  constructor( private rc: FormBuilder,private clienteService: ClientesService, private router: Router , private activatedRoute: ActivatedRoute, private autenticacion: AutenticacionService) {
    this.tipo_persona = [];
    this.tipo_persona.push({label: 'Selecciona tipo de persona',value:null});
    this.tipo_persona.push({label:'Moral',value:'Moral'});
    this.tipo_persona.push({label:'Fisica',value:'Fisica'});

    this.estatus = [];
    this.estatus.push({label:'Seleccione status del cliente', value:null});
    this.estatus.push({label:'Activo',value:'Activo'});
    this.estatus.push({label:'Inactivo',value:'Inactivo'});
    
  }

  ngOnInit() {
    this.registroCliente = this.rc.group({
      'email':['',[
        Validators.required,
        Validators.email]
      ],
      'password':['',[
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ] ]
    });

    this.registroCliente.valueChanges.subscribe(data =>
        this.onValueChanged(data));
      this.onValueChanged();

    this.registroCliente = this.rc.group({
      nombre : ['', Validators.required],
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

  onValueChanged(data?:any){
    if (!this.registroCliente){ return; }
    const form = this.registroCliente;
    for (const field in this.erroresForm){
      this.erroresForm[field]= '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid){
        const messages = this.mensajesValidacion[field];
        for (const key in control.errors)
         this.erroresForm[field] += messages[key] + ' ' ;
      }
    }
  }

}
