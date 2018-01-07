import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

import { ProductosService } from '../../servicios/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../productos/productos.modelo';
import { ProveedoresService} from '../../servicios/proveedores.service';

@Component({
  selector: 'app-editproductos',
  templateUrl: './editproductos.component.html',
  styleUrls: ['./editproductos.component.css']
})
export class EditproductosComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;
  registroProducto: FormGroup;
  Productos: any = [];
  productoo = new Producto();

  Estatuss: SelectItem[];
  Estatus: string;
  
  ID: string;

  Precio : number;
  id_proveedors: SelectItem[];
  id_proveedor: string;

  Proveedores: any = [];

  constructor(private pf: FormBuilder,private proveedoresService: ProveedoresService ,private productosService: ProductosService, private router: Router, private activatedRouter: ActivatedRoute) {
    
    this.activatedRouter.params.subscribe(parametros => {
      this.ID = parametros['ID'];
      console.log(this.ID);
      this.productosService.getProducto(this.ID)
        .subscribe(Productos => {
          this.productoo = Productos[0];
          console.log(Productos);
        })
    
        this.proveedoresService.getProveedores()
        .subscribe(Proveedores => {
          for ( const Id$ in Proveedores){
          const pro = Proveedores[Id$];
          pro.Id$ = Id$;
          this.Proveedores.push(Proveedores[Id$]);
          }
        })

     this.Estatuss = [];
     this.Estatuss.push({label:'Seleccione status del empleado', value:null});
     this.Estatuss.push({label:'ACTIVO',value:'A'});
     this.Estatuss.push({label:'INACTIVO',value:'I'});  
    
      
      });
    }
    onSubmit() {
      this.Productos = this.saveRegistro();
      this.productosService.putProducto(this.Productos, this.ID).subscribe(newpres => { this.router.navigate(['/admin-productos/productos']) })
    }
    saveRegistro(){
      const saveRegistro = {
        descripcion: this.registroProducto.get('descripcion').value,
        Precio: this.registroProducto.get('Precio').value,
        id_proveedor: this.registroProducto.get('id_proveedor').value,     
        Estatus: this.registroProducto.get('Estatus').value,
      
      };
      return saveRegistro;
    }
  
    ngOnInit() {
      this.registroProducto = this.pf.group({
        descripcion : ['', Validators.required],
        Precio: ['', Validators.required],
        id_proveedor: ['', Validators.required],
        Estatus: ['', Validators.required],
      });
    }

}
