import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

import { EmpleadosService } from '../../servicios/empleados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Empleado } from '../empleados/empleados.modelo';

import {PuestosService} from '../../servicios/puestos.service';

@Component({
  selector: 'app-editempleados',
  templateUrl: './editempleados.component.html',
  styleUrls: ['./editempleados.component.css']
})
export class EditempleadosComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;
  registroEmpleado: FormGroup;
  empleados: any = [];
  eempleado = new Empleado();

  id: string;
  Puestos: any[] = [];

  
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

  constructor(private pf: FormBuilder,private puestosService: PuestosService ,private empleadosService: EmpleadosService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      console.log(this.id);
      this.empleadosService.getempleado(this.id)
        .subscribe(empleados => {
          this.eempleado = empleados[0];
          
        })

        this.puestosService.getPuestos()
        .subscribe(Puestos => {
          for ( const ID$ in Puestos){
          const pro = Puestos[ID$];
          pro.ID$ = ID$;
          this.Puestos.push(Puestos[ID$]);
          }
        })
        /*
     this.Estatus = [];
     this.Estatus.push({label:'Seleccione status del empleado', value:null});
     this.Estatus.push({label:'ACTIVO',value:'ACTIVO'});
     this.Estatus.push({label:'INACTIVO',value:'INACTIVO'});  
        
        */
      });
    }
    onSubmit() {
      this.empleados = this.saveRegistro();
      this.empleadosService.putempleado(this.empleados, this.id).subscribe(newpres => { this.router.navigate(['/admin-empleados/empleados']) })
    }
    saveRegistro(){
      const saveRegistro = {
        Nombre: this.registroEmpleado.get('Nombre').value,
        RFC: this.registroEmpleado.get('RFC').value,
        IDPuesto: this.registroEmpleado.get('IDPuesto').value,
        Direccion: this.registroEmpleado.get('Direccion').value,
        NSS: this.registroEmpleado.get('NSS').value,      
        Telefono: this.registroEmpleado.get('Telefono').value,      
        Estatus: this.registroEmpleado.get('Estatus').value,
        email: this.registroEmpleado.get('email').value,
        password: this.registroEmpleado.get('password').value,
        contrasena: this.registroEmpleado.get('contrasena').value,
        
      
      };
      return saveRegistro;
    }
  
    ngOnInit() {
      this.registroEmpleado = this.pf.group({
        Nombre : ['', Validators.required],
        RFC: ['', Validators.required],
        IDPuesto: ['', Validators.required],
        Direccion: ['', Validators.required],      
        NSS: ['', Validators.required],
        Telefono: ['', Validators.required],
        Estatus: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        contrasena: ['', Validators.required],
      });
    }
  }