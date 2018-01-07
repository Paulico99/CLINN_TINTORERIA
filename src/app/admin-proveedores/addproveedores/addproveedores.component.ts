import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';


import {SelectItem} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

import { Router, ActivatedRoute } from '@angular/router';
import { Proveedor } from '../proveedores/proveedores.modelo';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-addproveedores',
  templateUrl: './addproveedores.component.html',
  styleUrls: ['./addproveedores.component.css']
})
export class AddproveedoresComponent implements OnInit {

  @ViewChild('formpro') formpro: NgForm;  
  ProveedoresForm : FormGroup;
  proveedor: any;

  //Estatus: SelectItem[];
  //Estado: SelectItem[];
  //status: SelectItem[];
  
  //Selectestatus: string;
  //Selectestado: string;
  
  Estatu : string[] = [
    'ACTIVO','INACTIVO'
   ]
   estados : string[] = [
     'MORAL','FISICA'
   ]

  saveRegistro(){
    const saveRegistro = {
      nombre: this.ProveedoresForm.get('nombre').value,
      RFC: this.ProveedoresForm.get('RFC').value,
      Direccion: this.ProveedoresForm.get('Direccion').value,
      Telefono: this.ProveedoresForm.get('Telefono').value,
      correo: this.ProveedoresForm.get('correo').value,      
      Localidad: this.ProveedoresForm.get('Localidad').value,
      Estado: this.ProveedoresForm.get('Estado').value,
      Estatus: this.ProveedoresForm.get('Estatus').value,
    
     
    };
    return saveRegistro;
  }

  onSubmit(){
    this.proveedor = this.saveRegistro();
    this.proveedorService.postProveedor(this.proveedor).subscribe(newpres => {this.router.navigate(['admin-proveedores/proveedores'])})
  }

  constructor( private rc: FormBuilder,private proveedorService: ProveedoresService, private router: Router , private activatedRoute: ActivatedRoute) {
    /*
    this.Estatus = [];
    this.Estatus.push({label:'Seleccione Status del Proveedor', value:null});
    this.Estatus.push({label:'Activo',value:'ACTIVO'});
    this.Estatus.push({label:'Inactivo',value:'INACTIVO'});
    
    this.Estado = [];
    this.Estado.push({label:'Seleccione Estado del Proveedor', value:null});
    this.Estado.push({label:'Fisico',value:'FISICO'});
    this.Estado.push({label:'Moral',value:'MORAL'});
    */
  }

  ngOnInit() {
    this.ProveedoresForm = this.rc.group({
      nombre : ['', Validators.required],
      RFC: ['', Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required],      
      correo: ['', Validators.required],
      Localidad: ['', Validators.required],
      Estado: ['', Validators.required],
      Estatus: ['', Validators.required],
    });
  }

}
 