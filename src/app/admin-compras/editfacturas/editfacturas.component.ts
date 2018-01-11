import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';

import {SelectItem} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

import {TabViewModule} from 'primeng/primeng';
import {Message} from 'primeng/primeng';


import {FacturasService} from '../../servicios/facturas.service';
import {Factura} from '../facturas/facturas.modelo';

import {ProveedoresService} from '../../servicios/proveedores.service';
import {ProductosService} from '../../servicios/productos.service';
import {Proveedor} from '../../admin-proveedores/proveedores/proveedores.modelo';
import {Producto} from '../../admin-productos/productos/productos.modelo';

@Component({
  selector: 'app-editfacturas',
  templateUrl: './editfacturas.component.html',
  styleUrls: ['./editfacturas.component.css']
})
export class EditfacturasComponent implements OnInit {
  Proveedores: any = [];
  Productos: any = [];
  
  @ViewChild('formpro') formpro: NgForm;  
  registroFactura : FormGroup;
  Facturas: any = [];  
  facturaa = new Factura();

  costo: any;
  iva: any;
  subtotal: any = 0;
  total: any = 0;
  ID: string;
  
  saveRegistro(){
    const saveRegistro = {
      id_proveedor: this.registroFactura.get('id_proveedor').value,
      id_producto: this.registroFactura.get('id_producto').value,
      fecha: this.registroFactura.get('fecha').value,
      iva: this.registroFactura.get('iva').value,
      costo: this.registroFactura.get('costo').value,
      subtotal: this.registroFactura.get('subtotal').value,      
      total: this.registroFactura.get('total').value,
     
    };
    return saveRegistro;
  }
  constructor( private rc: FormBuilder,private proveedorService: ProveedoresService,private productosService: ProductosService, private facturasService: FacturasService, private router: Router , private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.params.subscribe(parametros => {
      this.ID = parametros['ID'];
      console.log(this.ID);
      this.facturasService.getFactura(this.ID)
        .subscribe(Facturas => {
          this.facturaa = Facturas[0];
          console.log(Facturas);
        })


    this.proveedorService.getProveedores()
    .subscribe(Proveedores => {
      for ( const Id$ in Proveedores){
      const pro = Proveedores[Id$];
      pro.Id$ = Id$;
      this.Proveedores.push(Proveedores[Id$]);
      }
    })

    this.productosService.getProductos()
    .subscribe(Productos => {
      for ( const ID$ in Productos){
      const pror = Productos[ID$];
      pror.ID$ = ID$;
      this.Productos.push(Productos[ID$]);
      }
    })
  });
  }

  onSubmit() {
    this.Facturas = this.saveRegistro();
    this.facturasService.putFactura(this.Facturas, this.ID).subscribe(newpres => { this.router.navigate(['/admin-compras/facturas']) })
  }

  ngOnInit() {
    this.registroFactura = this.rc.group({
      id_proveedor : ['25', Validators.required],
      id_producto: ['', Validators.required],
      fecha: ['', Validators.required],
      costo: ['', Validators.required],
      iva: ['', Validators.required],      
      subtotal: this.subtotal,
      total: this.total,
      
    });
    this.onChanges();
  
}

onChanges() {
  this.registroFactura.valueChanges.subscribe(valor => {
    this.costo = valor.costo;
    this.iva = valor.iva;
    this.registroFactura.value.subtotal = this.costo * this.iva;
    this.registroFactura.value.total = this.costo + (this.costo * this.iva);
  });
}

}
