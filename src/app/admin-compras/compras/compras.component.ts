import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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


import {Compra} from '../compras/Compras.modelo';
import {DetalleCompra} from '../compras/Detalle-Compras.modelo';
import {Proveedor} from '../../admin-proveedores/proveedores/proveedores.modelo';

import {ProveedoresService} from '../../servicios/proveedores.service';
import {ProductosService} from '../../servicios/productos.service';
import {ComprasService} from '../../servicios/compras.service';
import { element } from 'protractor';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;  
  
  registroCompra : FormGroup;
  loading: boolean;
  
  idcompras: number;
  id_producto: number;
  id_proveedor: number;
  cantidad: number;
  Precio: number = 0;
  fecha: Date;
  iva: number;
  importe: number = 0;
  id_compras2: number;

  status: string;
  subtotal: number = 0;
  

  Compras: any =[];  
  Proveedores: any = [];
  Productos: any = [];

  //VARIABLES CALENDARIO
  date10: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  tr: any;

  msgs: Message[];

  proveedornombre=[];
  productonombre=[];
  productoprecio=[];

  compr: Compra[] =[];
  detalle: DetalleCompra[] = [];

  selected: any;
  edited: boolean = false;

  get_nombre_proveedores(id_proveedor,i){
    this.Proveedores.forEach(element => {
      console.log(id_proveedor);
      console.log(element.Id);
      if (element.Id == id_proveedor) {
        this.proveedornombre[i] = element.nombre;
      }
    });
  }

  get_name_producto(id_producto,i){
    this.Productos.forEach(element => {
      console.log(id_producto);
      console.log(element.ID);
      if (element.ID == id_producto) {
        this.productonombre[i] = element.descripcion;
      }
    });
  }

  get_precio_producto(id_producto,i){
    this.Productos.forEach(element => {
      console.log(id_producto);
      console.log(element.ID);
      if (element.ID == id_producto) {
        this.productoprecio[i] = element.Precio;
      }
    });
    this.get_importe();
    
  }
  

  agregar(event){
    this.importe = this.Precio * this.cantidad;
    if (!this.edited){
    //this.vent.push(new Venta(this.ID, this.id_cliente,this.Total,this.Abono,this.estatus,this.entrega));
    this.detalle.push(new DetalleCompra(this.idcompras, this.id_producto, this.id_proveedor,this.cantidad,this.Precio ,this.fecha,this.iva,this.importe,this.id_compras2));
    console.log(this.compr);
    }else{
      //this.vent[this.selected] = new Venta(this.ID, this.id_cliente,this.Total,this.Abono,this.estatus,this.entrega));      
      this.detalle[this.selected] = new DetalleCompra(this.idcompras, this.id_producto, this.id_proveedor,this.cantidad,this.Precio ,this.fecha,this.iva,this.importe,this.id_compras2);
      this.edited = false;
    }
    this.importe = 0;
    this.detalle.forEach(element => {
      //this.importe += this.importe + element.total; 
    });
    //this.totaliva = this.iva * this.importe;
  }
  df = 0;
  totalpagar = 0;
  abono = 0;
  cambio = 0;
  totaliva = 0;

  get_importe(){
    this.df = 0;
    let i = 0;
    this.detalle.forEach(element => {
      this.df = this.df + (this.productoprecio[i]*element.cantidad) * element.iva + (this.productoprecio[i]*element.cantidad);
      this.totaliva =  (this.productoprecio[i]*element.cantidad) * element.iva;
      console.log(this.productoprecio[i]);
      console.log(i);
      i = i + 1;
      this.totalpagar = this.df + this.totaliva;
     // this.cambio = this.totalpagar - this.abono;
      
    });
  
  }
  select(index){
    this.selected = index;

    this.id_producto = this.detalle[this.selected].id_producto;
    this.id_proveedor = this.detalle[this.selected].id_proveedor;
    this.cantidad = this.detalle[this.selected].cantidad;
    this.Precio = this.detalle[this.selected].Precio;

    
    this.edited = true;
    
  }

  limpiar(event){
    //this.id_cliente = 0;
    //this.entrega = "";
    this.id_producto = 0;
    this.cantidad = 0;
    this.id_proveedor = 0;

  }
  eliminar(){
    if(this.selected!== null){
    this.detalle.splice(this.selected, 1);
    this.selected = null;
    this.edited= false;
    //this.importe = 0;
    this.df = 0;
    let i = 0;
    this.detalle.forEach(element => {
      this.df = this.df + this.productoprecio[i]*element.cantidad;
    });
    this.totaliva = this.iva * this.df;
    }
    this.limpiar(event);
  }

  constructor(private formbuilder: FormBuilder,
    private comprasService: ComprasService,
    private proveedoresService: ProveedoresService,
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 

      this.comprasService.getCompras()
      .subscribe(Compras => {
        for (const idcompras$ in Compras){
          const pro2 = Compras[idcompras$];
          pro2.idcompras$ = idcompras$;
          this.Compras.push(Compras[idcompras$]);
        }
      })

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
      const pror = Productos[ID$];
      pror.ID$ = ID$;
      this.Productos.push(Productos[ID$]);
      }
    })
    }




    
    onTabChange(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }

  //CALENDARIO

  invalidDates: Array<Date>
  
ngOnInit() {
  this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
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
