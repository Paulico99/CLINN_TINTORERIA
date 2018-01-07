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

import { EmpleadosService } from '../../servicios/empleados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Empleado } from '../empleados/empleados.modelo';

import { AutenticacionService } from '../../servicios/autenticacion.service';
import { onValueChanged } from '@angular/cli';
import { PuestosService} from '../../servicios/puestos.service';


@Component({
  selector: 'app-addempleados',
  templateUrl: './addempleados.component.html',
  styleUrls: ['./addempleados.component.css']
})
export class AddempleadosComponent implements OnInit {

  @ViewChild('formpro') formpro: NgForm;  
  registroEmpleado : FormGroup;
  empleado: any;

  Estatus: SelectItem[];
  Selectestatus : string;

  IDPuesto: SelectItem[];
  SelectPuesto: string;

  userdata2 : any;
  
  Puestos : any[] = [];


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

  onSubmit(){
    this.empleado = this.saveRegistro();
    this.userdata2 = this.saveRegistro();
    this.autenticacion.registroUsuario(this.userdata2); 
    this.empleadoService.postempleado(this.empleado).subscribe(newpres => {this.router.navigate(['/admin-empleados/empleados'])})
  }

  constructor( private autenticacion: AutenticacionService ,private puestosService: PuestosService,private rc: FormBuilder,private empleadoService: EmpleadosService, private router: Router , private activatedRoute: ActivatedRoute) {
    

    this.puestosService.getPuestos()
    .subscribe(Puestos => {
      for ( const ID$ in Puestos){
      const pro = Puestos[ID$];
      pro.ID$ = ID$;
      this.Puestos.push(Puestos[ID$]);
      }
    })
    
    this.Estatus = [];
    this.Estatus.push({label:'Seleccione Status del empleado', value:null});
    this.Estatus.push({label:'ACTIVO',value:'ACTIVO'});
    this.Estatus.push({label:'INACTIVO',value:'INACTIVO'});

    /*
    this.IDPuesto = [];
    this.IDPuesto.push({label:'Seleccione Puesto del empleado', value:null});
    this.IDPuesto.push({label:'CAJERO',value:'CAJERO'});
    this.IDPuesto.push({label:'CONSERJE',value:'CONSERJE'});
    this.IDPuesto.push({label:'LAVADO',value:'LAVADO'});
    this.IDPuesto.push({label:'PLANCHADOR',value:'PLANCHADOR'});
    
    */
    
  }

  ngOnInit() {

    this.registroEmpleado = this.rc.group({
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

    this.registroEmpleado.valueChanges.subscribe(data =>
        this.onValueChanged(data));
      this.onValueChanged();

    this.registroEmpleado = this.rc.group({
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

  onValueChanged(data?:any){
    if (!this.registroEmpleado){ return; }
    const form = this.registroEmpleado;
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
