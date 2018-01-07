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

import { ProductosService } from '../../servicios/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../productos/productos.modelo';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-addproductos',
  templateUrl: './addproductos.component.html',
  styleUrls: ['./addproductos.component.css']
})
export class AddproductosComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;  
  registroProducto : FormGroup;
  producto: any;

  proveedor: SelectItem[];
  Estatus: SelectItem[];

  SelectProveedor: string;
  SelectEstatus: string;
  Proveedores : any = [];
 
  saveRegistro(){
    const saveRegistro = {
      descripcion: this.registroProducto.get('descripcion').value,
      Precio: this.registroProducto.get('Precio').value,
      id_proveedor: this.registroProducto.get('id_proveedor').value,
      Estatus: this.registroProducto.get('Estatus').value,
    
     
    };
    return saveRegistro;
  }

  onSubmit(){
    this.producto = this.saveRegistro();
    this.productosService.postProducto(this.producto).subscribe(newpres => {this.router.navigate(['admin-productos/productos'])})
  }

  constructor( private rc: FormBuilder,private proveedoresService : ProveedoresService, private productosService: ProductosService, private router: Router , private activatedRoute: ActivatedRoute) {
    
    this.proveedoresService.getProveedores()
    .subscribe(Proveedores => {
      for ( const Id$ in Proveedores){
      const pro = Proveedores[Id$];
      pro.Id$ = Id$;
      this.Proveedores.push(Proveedores[Id$]);
      }
    })

    this.Estatus = [];
    this.Estatus.push({label:'Seleccione Status del producto', value:null});
    this.Estatus.push({label:'ACTIVO',value:'A'});
    this.Estatus.push({label:'INACTIVO',value:'I'});
    /*
    this.Estado = [];
    this.Estado.push({label:'Seleccione Estado del Proveedor', value:null});
    this.Estado.push({label:'Fisico',value:'FISICO'});
    this.Estado.push({label:'Moral',value:'MORAL'});
    */
  }

  ngOnInit() {
    this.registroProducto = this.rc.group({
      descripcion : ['', Validators.required],
      Precio: ['', Validators.required],
      id_proveedor: ['', Validators.required],
      Estatus: ['', Validators.required],
    });
  }

}
