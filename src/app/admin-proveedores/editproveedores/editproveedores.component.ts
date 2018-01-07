import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Proveedor } from '../proveedores/proveedores.modelo';
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

@Component({
  selector: 'app-editproveedores',
  templateUrl: './editproveedores.component.html',
  styleUrls: ['./editproveedores.component.css']
})
export class EditproveedoresComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;
  
  ProveedoresForm: FormGroup;
  proveedores: any = [];
  provedor = new Proveedor();

  Id : string;

  //Estado : SelectItem[];
  //Estatus: SelectItem[];
  
  Estatu : string[] = [
   'ACTIVO','INACTIVO'
  ]
  estados : string[] = [
    'MORAL','FISICO'
  ]

  Telefono : string = '';
  correo : string = '';

  constructor(private pf: FormBuilder, private proveedoresService: ProveedoresService, private router: Router,
  private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(parametros => {
      this.Id = parametros['Id'];
      this.proveedoresService.getProveedor(this.Id).subscribe(proveedores => {
          this.provedor = proveedores[0];
          console.log(this.provedor);
        })
    });
    /*
    this.Estado = [];
    this.Estado.push({label: 'Selecciona tipo de persona',value:null});
    this.Estado.push({label:'Moral',value:'Moral'});
    this.Estado.push({label:'Fisica',value:'Fisica'});
    
    this.Estatus = [];
    this.Estatus.push({label:'Seleccione status del cliente', value:null});
    this.Estatus.push({label:'Activo',value:'Activo'});
    this.Estatus.push({label:'Inactivo',value:'Inactivo'});
    */
  }

   onSubmit() {
    this.proveedores = this.saveUnidad();
    this.proveedoresService.putProveedor(this.proveedores, this.Id).subscribe(newpre => { this.router.navigate(['/admin-proveedores/proveedores'])})
  }
  saveUnidad() {
    const saveUnidad = {
      nombre: this.ProveedoresForm.get('nombre').value,
      RFC: this.ProveedoresForm.get('RFC').value,
      Direccion: this.ProveedoresForm.get('Direccion').value,
      Telefono: this.ProveedoresForm.get('Telefono').value,
      correo: this.ProveedoresForm.get('correo').value,
      Localidad: this.ProveedoresForm.get('Localidad').value,
      Estado: this.ProveedoresForm.get('Estado').value,
      Estatus: this.ProveedoresForm.get('Estatus').value,
      
    };
    return saveUnidad;
  }
  ngOnInit() {
    this.ProveedoresForm = this.pf.group({
      nombre: ['', Validators.required ],
      RFC: ['', Validators.required ],
      Direccion: ['', Validators.required ],
      Telefono: ['', Validators.required ],
      correo: ['', Validators.required ],
      Localidad: ['', Validators.required ],
      Estado: ['', Validators.required ],
      Estatus: ['', Validators.required ]    
    })
  }
}
