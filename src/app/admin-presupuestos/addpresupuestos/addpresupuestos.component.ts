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
import { Presupuesto } from '../presupuestos/Presupuesto.modelo';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-addpresupuestos',
  templateUrl: './addpresupuestos.component.html',
  styleUrls: ['./addpresupuestos.component.css']
})
export class AddpresupuestosComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;  
  registroPresupuesto : FormGroup;
  Presupuestos: any;

  proveedor: SelectItem[];
  productos: SelectItem[];

  SelectProveedor: string;
  SelectProductos: string;
  
  Proveedores : any = [];
  Productos: any =[];

  fecha:string;


  base: any;
  t_iva: any;
  importe_iva: any = 0;
  total_importe: any = 0;

  saveRegistro(){
    const saveRegistro = {
      id_proveedor: this.registroPresupuesto.get('id_proveedor').value,      
      fecha: this.registroPresupuesto.get('fecha').value,
      id_producto: this.registroPresupuesto.get('id_producto').value,
      base: this.registroPresupuesto.get('base').value,
      t_iva: this.registroPresupuesto.get('t_iva').value,
      importe_iva: this.registroPresupuesto.get('importe_iva').value,
      total_importe: this.registroPresupuesto.get('total_importe').value,
      
     
    };
    return saveRegistro;
  }

  onSubmit(){
    this.Presupuestos = this.saveRegistro();
    this.presupuestoService.postPresupuestos(this.Presupuestos).subscribe(newpres => {this.router.navigate(['/admin-presupuesto/presupuesto'])})
  }
  constructor(private presupuestoService: PresupuestosService,
              private proveedoresService: ProveedoresService,
              private productosService: ProductosService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private rc: FormBuilder) {

  this.proveedoresService.getProveedores()
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
      const pro = Productos[ID$];
      pro.ID$ = ID$;
      this.Productos.push(Productos[ID$]);
      }
    })
              }

  ngOnInit() {

    this.registroPresupuesto = this.rc.group({
      id_proveedor: ['', Validators.required],
      fecha: ['',Validators.required],      
      id_producto : ['', Validators.required],
      base: ['', Validators.required],
      t_iva: ['', Validators.required],

      importe_iva: this.importe_iva,
      total_importe: this.total_importe,
    });
    this.onChanges();
  } 

  onChanges() {
    this.registroPresupuesto.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.t_iva = valor.t_iva;
      this.registroPresupuesto.value.importe_iva = this.base * this.t_iva;
      this.registroPresupuesto.value.total_importe = this.base + (this.base * this.t_iva);
    });
  }
}



