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

import { ServiciossService } from '../../servicios/servicioss.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Servicios } from '../servcios/servicios.modelo';

@Component({
  selector: 'app-add-servcios',
  templateUrl: './add-servcios.component.html',
  styleUrls: ['./add-servcios.component.css']
})
export class AddServciosComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;  
  registroServicio : FormGroup;
  servicio: any;
  Estatus: SelectItem[];
  SelectEstatus: string;
  


  saveRegistro(){
    const saveRegistro = {
      Nombre: this.registroServicio.get('Nombre').value,
      Estatus: this.registroServicio.get('Estatus').value,
      Precio: this.registroServicio.get('Precio').value,    
     
    };
    return saveRegistro;
  }

  onSubmit(){
    this.servicio = this.saveRegistro();
    this.servicioService.postServicio(this.servicio).subscribe(newpres => {this.router.navigate(['admin-servicios/servicios'])})
  }
  constructor(private rc: FormBuilder,private proveedoresService : ServiciossService, private servicioService: ServiciossService, private router: Router , private activatedRoute: ActivatedRoute) { 

    this.Estatus = [];
    this.Estatus.push({label:'Seleccione Status del Servicio', value:null});
    this.Estatus.push({label:'ACTIVO',value:'A'});
    this.Estatus.push({label:'INACTIVO',value:'I'});
  }

  ngOnInit() {
    this.registroServicio = this.rc.group({
      Nombre : ['', Validators.required],
      Estatus: ['', Validators.required],
      Precio: ['', Validators.required],
    });
  }

}
