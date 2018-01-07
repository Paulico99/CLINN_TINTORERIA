import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';

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
  selector: 'app-abono',
  templateUrl: './abono.component.html',
  styleUrls: ['./abono.component.css']
})
export class AbonoComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;  
  registroVenta : FormGroup;
  Ventas: any = [];
  
  Clientes: any = [];
  

  ventaa = new Venta();
  ID: string;
  Abono : number;
  
  clientenombre=[];

  constructor(private rc: FormBuilder, private ventaService: VentasService, private router: Router , private activatedRoute: ActivatedRoute, private clientesService: ClientesService) { 
    
    this.activatedRoute.params.subscribe(parametros => {
      this.ID = parametros['ID'];
      console.log(this.ID);
      this.ventaService.getVenta(this.ID)
        .subscribe(Ventas => {
          this.ventaa = Ventas[0];
          console.log(Ventas);
        })

    });
    this.clientesService.getClientes()
    .subscribe(Clientes => {
      for ( const id$ in Clientes){
      const pro = Clientes[id$];
      pro.id$ = id$;
      this.Clientes.push(Clientes[id$]);
      }
    })
  }

  saveRegistro(){
    const saveRegistro = {
      id_cliente: this.registroVenta.get('id_cliente').value,
      Total: this.registroVenta.get('Total').value,
      Abono: this.registroVenta.get('Abono').value,    
     
    };
    return saveRegistro;
  }

  onSubmit(){
    this.Ventas = this.saveRegistro();
    this.ventaService.putVenta(this.Ventas, this.ID).subscribe(newpres => {this.router.navigate(['/administrador/admin-pedidos'])})
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
  
  ngOnInit() {
    this.registroVenta = this.rc.group({
      id_cliente : ['', Validators.required],
      Total: ['', Validators.required],
      Abono: ['', Validators.required],
    });
  }
}