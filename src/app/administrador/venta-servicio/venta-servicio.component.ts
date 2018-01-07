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

import { Router, ActivatedRoute } from '@angular/router';

import {ClientesService} from '../../servicios/clientes.service';
import {ServiciossService} from '../../servicios/servicioss.service';
import {PrendasService} from '../../servicios/prendas.service';
import { VentasService } from '../../servicios/ventas.service';

import { Venta } from '../venta-servicio/venta-servicio.modelo';
import { Detalle_Venta } from '../venta-servicio/detalle-venta.modelo';

import { Servicios } from '../../admin-servicios/servcios/servicios.modelo';
import { Prenda } from '../../administrador/venta-servicio/prenda.modelo';

import { Route } from '@angular/router/src/config';
import { log } from 'util';


@Component({
  selector: 'app-venta-servicio',
  templateUrl: './venta-servicio.component.html',
  styleUrls: ['./venta-servicio.component.css']
})
export class VentaServicioComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;  
  
  registroVenta : FormGroup;
  loading: boolean;
  
 ID: number;
 id_cliente: number;
 Total: number;
 Abono: number = 0;
 estatus: string = "ABONO";
 entrega: string;

 id_servicio: number;
 Precio: number;
 cantidad: number;
 total: number = 0;
 t_prenda: number;
 id_venta: number;

  correos: any;
  servicios: any;

 importe: number = 0;
 iva: number = 0.16;
 totaliva: number;

  cols: any[];

  servicio: SelectItem[];
  persona: SelectItem[];
  correo: SelectItem[];

  val4: string;
      //selectedValue: string = 'val1';      
  val1: string;
  selectServicio: string;
  Selectpersona: string;
  SelectCorreo: string;
    
  vent: Venta[] =[];
  detalle: Detalle_Venta[] = [];


  selected: any;
  edited: boolean = false;
  
  Ventas: any =[];  
  Clientes: any = [];
  Servicios: any = [];
  Prendas: any = [];

  servicionombre=[];
  servicioprecio=[];
  prendanombre=[];
  prendadescuento=[];
  clientenombre=[];

agregar(event){
    this.total = this.Precio * this.cantidad;
    if (!this.edited){
    this.vent.push(new Venta(this.ID, this.id_cliente,this.Total,this.Abono,this.estatus,this.entrega));
    this.detalle.push(new Detalle_Venta(this.ID, this.id_servicio, this.t_prenda,this.Precio,this.cantidad ,this.id_venta,this.total));
    console.log(this.vent);
    }else{
      this.vent[this.selected] = new Venta(this.ID, this.id_cliente,this.Total,this.Abono,this.estatus,this.entrega);      
      this.detalle[this.selected] = new Detalle_Venta(this.ID,this.id_servicio, this.t_prenda,this.Precio,this.cantidad ,this.id_venta,this.total);
      this.edited = false;
    }
    this.importe = 0;
    this.detalle.forEach(element => {
      //this.importe += this.importe + element.total; 
    });
    //this.totaliva = this.iva * this.importe;
  }
  get_prenda(t_prenda,i){
    this.Prendas.forEach(element => {
      if (element.idservicio == t_prenda){
        this.prendanombre[i] = element.nombre;

      }
      
    });
  }

  get_prenda_descuento(t_prenda,i){
    this.Prendas.forEach(element => {
      if (element.idservicio == t_prenda){
        this.prendadescuento[i] = element.descuento * 10 ;

      }
      
    });
  }

  get_name(id_servicio,i) {
    this.Servicios.forEach(element => {
      console.log(id_servicio);
      console.log(element.ID);
      if (element.ID == id_servicio) {
        this.servicionombre[i] = element.Nombre;
      }
    });
  }

  get_precio(id_servicio,i) {
    this.Servicios.forEach(element => {
      if (element.ID == id_servicio) {
        this.servicioprecio[i] = element.Precio;

      }
    });
    this.get_importe();
  }
df = 0;
totalpagar = 0;
abono = 0;
cambio = 0;

get_importe(){
  this.df = 0;
  let i = 0;
  this.detalle.forEach(element => {
    this.df = this.df + ((this.servicioprecio[i]*element.cantidad) * this.prendadescuento[i]) / 10;
    this.totaliva = this.iva * this.df;
    console.log(this.servicioprecio[i]);
    console.log(i);
    i = i + 1;
    this.totalpagar = this.df + this.totaliva;
   // this.cambio = this.totalpagar - this.abono;
    
  });

}

get_nombre_cliente(id_cliente,i){
  this.Clientes.forEach(element => {
    console.log(id_cliente);
    console.log(element.id);
    if (element.id == id_cliente) {
      this.clientenombre[i] = element.nombre;
    }
  });
}

get_pagar(){
  this.cambio = this.totalpagar - this.abono;

  this.get_importe();
}

  select(index){
    this.selected = index;
    //this.id_cliente =  this.vent[this.selected].id_cliente;
    //this.Total = this.vent[this.selected].Total;
    //this.Abono = this.vent[this.selected].Abono;
    //this.estatus = this.vent[this.selected].estatus;
    //this.entrega = this.vent[this.selected].entrega;

    this.id_servicio = this.detalle[this.selected].id_servicio;
    this.Precio = this.detalle[this.selected].Precio;
    this.cantidad = this.detalle[this.selected].cantidad;
    this.t_prenda = this.detalle[this.selected].t_prenda;

    //this.entrega = this.vent[this.selected].entrega;    
    
    this.edited = true;
    
  }

  limpiar(event){
    //this.id_cliente = 0;
    //this.entrega = "";
    this.id_servicio = 0;
    this.cantidad = 0;
    this.Precio = 0;
    this.t_prenda = 0;
    this.total = 0;

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
      this.df = this.df + this.servicioprecio[i]*element.cantidad;
    });
    this.totaliva = this.iva * this.df;
    }
    this.limpiar(event);
  }

  saveVenta(){
    const saveVenta = {
      id_cliente: this.registroVenta.get('id_cliente').value,
      Total: this.registroVenta.get('Total').value,
      Abono: this.registroVenta.get('Abono').value,
      estatus: this.registroVenta.get('estatus').value,
      entrega: this.registroVenta.get('entrega').value

    };
    return saveVenta;
  }

  onSubmit(event){
    //this.Ventas = this.saveVenta();
    this.ventasService.postDetalleventas(this.detalle)
    this.ventasService.postVentas(this.vent)
  }

  AgregarServicio(ID$){
    this.ventasService.postVentas(ID$).subscribe(res => {
      this.Ventas = [];
      this.ventasService.getVentas().subscribe(Ventas => {
          for (const ID$ in Ventas) {
              const p = Ventas[ID$];
              p.ID$ = ID$;
              this.Ventas.push(Ventas[ID$]);
          }
      })
  });
  }

      constructor(private formbuilder: FormBuilder,private prendasService: PrendasService,private ventasService: VentasService,private clientesService: ClientesService,private servicioService: ServiciossService,private router: Router,private activatedRoute: ActivatedRoute) {
        
        this.ventasService.getDetalleventas()
          .subscribe(Ventas => {
            for (const ID$ in Ventas){
              const pro2 = Ventas[ID$];
              pro2.ID$ = ID$;
              this.Ventas.push(Ventas[ID$]);
            }
          })

        this.clientesService.getClientes()
        .subscribe(Clientes => {
          for ( const id$ in Clientes){
          const pro = Clientes[id$];
          pro.id$ = id$;
          this.Clientes.push(Clientes[id$]);
          }
        })

        this.servicioService.getservicios()
        .subscribe(Servicios => {
          for ( const ID$ in Servicios){
          const pror = Servicios[ID$];
          pror.ID$ = ID$;
          this.Servicios.push(Servicios[ID$]);
          }
        })

        this.prendasService.getPrendas()
        .subscribe(Prendas => {
          for ( const idservicio$ in Prendas){
          const prorr = Prendas[idservicio$];
          prorr.idservicio$ = idservicio$;
          this.Prendas.push(Prendas[idservicio$]);
          }
        })
        /*
          this.servicio = [];
          this.servicio.push({label:'Seleccione el servicio', value:null});
          this.servicio.push({label:'Lavado Seco', value:{id:1, name: 'Lavado Seco', code: 'LS'}});
          this.servicio.push({label:'Lavado Express', value:{id:2, name: 'Lavado Express', code: 'LEX'}});
          this.servicio.push({label:'Lavado De edredones', value:{id:3, name: 'Lavado de edredones', code: 'LE'}});
          this.servicio.push({label:'Servicio de planchado', value:{id:4, name: 'Planchado', code: 'P'}});
        */
          this.persona= [];
          this.persona.push({label: 'Selecciona tipo de prenda',value:null});
          this.persona.push({label:'Playera',value:{id:1,name: 'Playera'}});
          this.persona.push({label:'Camisa',value:{id:2,name: 'Camisa'}});
          this.persona.push({label:'Pantalon',value:{id:3,name: 'Pantalon'}});
          this.persona.push({label:'Abrigos',value:{id:4,name: 'Abrigos'}});
          this.persona.push({label:'Edredon',value:{id:5,name: 'Edredon'}});
          this.persona.push({label:'Cortina',value:{id:6,name: 'Cortina'}});
          this.persona.push({label:'Chamarra',value:{id:7,name: 'Chamarra'}});
          this.persona.push({label:'Cobija',value:{id:8,name: 'Cobija'}});
          
          
          
          
          
          
      }
  
  ngOnInit() {

    this.loading = true;
    /*
    this.registroVenta = this.formbuilder.group({
      id_cliente : ['', Validators.required],
      id_servicio: ['', Validators.required],
      cantidad: ['', Validators.required],
      entrega: ['', Validators.required],
      t_prenda: ['', Validators.required],
    });
  */
  }
  

}
