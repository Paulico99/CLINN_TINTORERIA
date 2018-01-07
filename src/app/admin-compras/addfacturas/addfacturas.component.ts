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
  selector: 'app-addfacturas',
  templateUrl: './addfacturas.component.html',
  styleUrls: ['./addfacturas.component.css']
})
export class AddfacturasComponent implements OnInit {
  Facturas: any = [];
  Proveedores: any = [];
  Productos: any = [];
  
  @ViewChild('formpro') formpro: NgForm;  
  registroFactura : FormGroup;
  factura: any;

  //CALENDARIO

  invalidDates: Array<Date>


   //VARIABLES CALENDARIO
   date10: Date;
   dates: Date[];
   rangeDates: Date[];
   minDate: Date;
   maxDate: Date;
   es: any;
   tr: any;

  saveRegistro(){
    const saveRegistro = {
      id_proveedor: this.registroFactura.get('id_proveedor').value,
      id_producto: this.registroFactura.get('id_producto').value,
      fecha: this.registroFactura.get('fecha').value,
      iva: this.registroFactura.get('iva').value,
      subtotal: this.registroFactura.get('subtotal').value,      
      total: this.registroFactura.get('total').value,
     
    };
    return saveRegistro;
  }
  constructor( private rc: FormBuilder,private proveedorService: ProveedoresService,private productosService: ProductosService, private facturasService: FacturasService, private router: Router , private activatedRoute: ActivatedRoute) { 

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
    
  }

  onSubmit() {
    this.factura = this.saveRegistro();
    this.facturasService.postFacturas(this.factura)
      .subscribe(newpres => { })
    this.registroFactura.reset();
  }

  ngOnInit() {
    this.registroFactura = this.rc.group({
      id_proveedor : ['', Validators.required],
      id_producto: ['', Validators.required],
      fecha: ['', Validators.required],
      iva: ['', Validators.required],      
      subtotal: ['', Validators.required],
      total: ['', Validators.required],
      
    });
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar',
  }

  this.tr = {
    firstDayOfWeek : 1
}

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = (month === 0) ? 11 : month -1;
let prevYear = (prevMonth === 11) ? year - 1 : year;
let nextMonth = (month === 11) ? 0 : month + 1;
let nextYear = (nextMonth === 0) ? year + 1 : year;
this.minDate = new Date();
this.minDate.setMonth(prevMonth);
this.minDate.setFullYear(prevYear);
this.maxDate = new Date();
this.maxDate.setMonth(nextMonth);
this.maxDate.setFullYear(nextYear);


let invalidDate = new Date();
invalidDate.setDate(today.getDate() - 1);
this.invalidDates = [today,invalidDate];
  }
}
