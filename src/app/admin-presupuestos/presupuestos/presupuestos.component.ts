import { Component, OnInit } from '@angular/core';
import { PresupuestosService} from '../../servicios/presupuestos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';

import { ProductosService} from '../../servicios/productos.service';
import { ProveedoresService} from '../../servicios/proveedores.service';

import { Presupuesto } from './presupuesto.modelo'

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {
  Presupuesto: any = [];
  presupuestoss = new Presupuesto();

  idpresupuesto: string;

  campoBusqueda: FormControl;
  busqueda: string;

  cargando = true;
  resultados = false;
  noresultados = false;

  Productos: any  = [];
  Proveedores: any = [];

  constructor(private presupuestoService: PresupuestosService ,
              private proveedoresService: ProveedoresService,
              private productosService: ProductosService, 
              private route:Router, 
              private activatedRoute: ActivatedRoute) {
            /*
                this.activatedRoute.params.subscribe(parametros => {
                  this.idpresupuesto = parametros['idpresupuesto'];
                  console.log(this.idpresupuesto);
                  this.presupuestoService.getPresupuesto(this.idpresupuesto)
                    .subscribe(Presupuestos => {
                      this.presupuestoss = Presupuestos[0];
                      console.log(Presupuestos);
                    })
              */    
                  this.proveedoresService.getProveedores().subscribe(Proveedores => {
                    for (const Id$ in Proveedores) {
                        const p = Proveedores[Id$];
                        p.Id$ = Id$;
                        this.Proveedores.push(Proveedores[Id$]);
                        }
                  })
                  console.log(this.Proveedores);
                

                  this.productosService.getProductos().subscribe(Productos => {
                    for (const ID$ in Productos) {
                        const p = Productos[ID$];
                        p.ID$ = ID$;
                        this.Productos.push(Productos[ID$]);
                        }
                  })
                  console.log(this.Productos);
                
                  /*
                });
                  */
               }

 
              eliminarPresupuesto(idpresupuesto$) {
                this.presupuestoService.delPresupuesto(idpresupuesto$).subscribe(res => {
                    this.Presupuesto = [];
                    this.presupuestoService.getPresupuestos().subscribe(Presupuesto => {
                        for (const idpresupuesto$ in Presupuesto) {
                            const p = Presupuesto[idpresupuesto$];
                            p.idpresupuesto$ = idpresupuesto$;
                            this.Presupuesto.push(Presupuesto[idpresupuesto$]);
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
            
                      this.presupuestoService.getPresupuestoSearch(this.busqueda).subscribe(Presupuesto => {
                          this.Presupuesto = [];
                        for (const idpresupuesto$ in Presupuesto) {
                            const p = Presupuesto[idpresupuesto$];
                            p.idpresupuesto$ = idpresupuesto$;
                            this.Presupuesto.push(Presupuesto[idpresupuesto$]);
                            }
                          if (this.Presupuesto.length < 1 && this.busqueda.length >= 1){
                            this.noresultados = true;
                          }else{
                            this.noresultados = false;
                          }
                      })
                      this.cargando = false;
                      this.resultados = true;
                    }else{
                      this.Presupuesto = [];
                      this.cargando = true;
                      this.resultados = false;
            
                    }
                  });
                  console.log(this.Presupuesto);
                  
              }

}
