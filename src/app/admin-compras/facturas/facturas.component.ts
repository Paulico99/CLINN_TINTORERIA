import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';

import {FacturasService} from '../../servicios/facturas.service';
import {Factura} from '../facturas/facturas.modelo';

import {ProveedoresService} from '../../servicios/proveedores.service';
import {ProductosService} from '../../servicios/productos.service';
import {Proveedor} from '../../admin-proveedores/proveedores/proveedores.modelo';
import {Producto} from '../../admin-productos/productos/productos.modelo';



@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  Facturas: any = [];

  Proveedores: any = [];
  Productos: any = [];

  campoBusqueda: FormControl;
  busqueda: string;

  cargando = true;
  resultados = false;
  noresultados = false;

  constructor(private facturasService: FacturasService ,private productoService: ProductosService, private proveedoresService: ProveedoresService
    , private route:Router, private activatedRoute: ActivatedRoute) { 

    this.proveedoresService.getProveedores()
    .subscribe(Proveedores => {
      for ( const Id$ in Proveedores){
      const pro = Proveedores[Id$];
      pro.Id$ = Id$;
      this.Proveedores.push(Proveedores[Id$]);
      }
    })

    this.productoService.getProductos()
    .subscribe(Productos => {
      for ( const ID$ in Productos){
      const pror = Productos[ID$];
      pror.ID$ = ID$;
      this.Productos.push(Productos[ID$]);
      }
    })
    
    }


  eliminarFacturas(ID$) {
    this.facturasService.delFactura(ID$).subscribe(res => {
        this.Facturas = [];
        this.facturasService.getFacturas().subscribe(Facturas => {
            for (const ID$ in Facturas) {
                const p = Facturas[ID$];
                p.ID$ = ID$;
                this.Facturas.push(Facturas[ID$]);
            }
        })
    });
}

ngOnInit() {
    this.campoBusqueda = new FormControl();
    this.campoBusqueda.valueChanges
      .subscribe(termino => {
        this.busqueda = termino;
        this.cargando = true;
        if (this.busqueda.length !== 0){
  
          this.facturasService.getFacturasSearch(this.busqueda).subscribe(Facturas => {
              this.Facturas = [];
            for (const ID$ in Facturas) {
                const p = Facturas[ID$];
                p.ID$ = ID$;
                this.Facturas.push(Facturas[ID$]);
                }
              if (this.Facturas.length < 1 && this.busqueda.length >= 1){
                this.noresultados = true;
              }else{
                this.noresultados = false;
              }
          })
          this.cargando = false;
          this.resultados = true;
        }else{
          this.Facturas = [];
          this.cargando = true;
          this.resultados = false;
  
        }
      });
      console.log(this.Facturas);
      
  }

}
