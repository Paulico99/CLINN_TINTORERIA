import { Component, OnInit,ViewChild } from '@angular/core';
import { VentasService } from '../../servicios/ventas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Venta } from '../venta-servicio/venta-servicio.modelo';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';


@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.css']
})
export class AdminPedidosComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;
  
  registroVenta: FormGroup;
  ventaa = new Venta();
  Ventas: any = [];
  ID: string;

  Abono: any;
  Total: any;


  campoBusqueda: FormControl;
  busqueda: string;

  cargando = true;
  resultados = false;
  noresultados = false;

  constructor(private pf: FormBuilder,private ventasService: VentasService , private route:Router, private activatedRouter: ActivatedRoute) { 
    this.activatedRouter.params.subscribe(parametros => {
      this.ID = parametros['ID'];
      console.log(this.ID);
      this.ventasService.getVenta(this.ID)
        .subscribe(Ventas => {
          this.ventaa = Ventas[0];
          console.log(Ventas);
        })
      
      this.ventasService.getVentas().subscribe(Ventas => {
        for (const ID$ in Ventas) {
            const p = Ventas[ID$];
            p.ID$ = ID$;
            this.Ventas.push(Ventas[ID$]);
            }
      })
      console.log(this.Ventas);
    
      
    });
  
  } 

  ngOnInit() {
    this.registroVenta = this.pf.group({
      email : ['', Validators.required],
      t_prenda: ['', Validators.required],
      Total: ['', Validators.required],
      estatus_servicio: ['', Validators.required],
      Abono: this.Abono,
    });
    this.onChanges();


     

  this.campoBusqueda = new FormControl();
  this.campoBusqueda.valueChanges
    .subscribe(termino => {
      this.busqueda = termino;
      this.cargando = true;
      if (this.busqueda.length !== 0){

        this.ventasService.getVentasSearch(this.busqueda).subscribe(Ventas => {
            this.Ventas = [];
          for (const ID$ in Ventas) {
              const p = Ventas[ID$];
              p.ID$ = ID$;
              this.Ventas.push(Ventas[ID$]);
              }
            if (this.Ventas.length < 1 && this.busqueda.length >= 1){
              this.noresultados = true;
            }else{
              this.noresultados = false;
            }
        })
        this.cargando = false;
        this.resultados = true;
      }else{
        this.Ventas = [];
        this.cargando = true;
        this.resultados = false;

      }
    });
    console.log(this.Ventas);
    
    
  }
  onChanges(): void {
    this.registroVenta.valueChanges.subscribe(valor=>{
      this.Abono = valor.Abono;
      this.registroVenta.value.Total = this.Total - this.Abono;
    });
  }

  savePresupuesto(){
    const savePresupuesto = {
      email: this.registroVenta.get('email').value,
      entrega: this.registroVenta.get('entrega').value,
      Total: this.registroVenta.get('Total').value,
      Abono: this.registroVenta.get('Abono').value,
      estatus_servicio: this.registroVenta.get('estatus_servicio').value,
      
    };
    return savePresupuesto;
  }
  onSubmit(){
    this.Ventas = this.savePresupuesto();
    this.ventasService.putVenta(this.Ventas , this.ID )
      .subscribe(newpres => {
        this.route.navigate(['/admin-ventas/ventas'])
       });
    //this.presupuestoForm.reset();
  }
 
}
