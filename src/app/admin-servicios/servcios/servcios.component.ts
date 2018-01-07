import { Component, OnInit } from '@angular/core';
import { ServiciossService } from '../../servicios/servicioss.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Servicios } from './servicios.modelo';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';


@Component({
  selector: 'app-servcios',
  templateUrl: './servcios.component.html',
  styleUrls: ['./servcios.component.css']
})
export class ServciosComponent implements OnInit {

  Servicios: any = [];
  campoBusqueda: FormControl;
  busqueda: string;

  cargando = true;
  resultados = false;
  noresultados = false;

  constructor(private servicioService: ServiciossService , private route:Router, private activatedRoute: ActivatedRoute) {  
    /*this.servicioService.getservicios().subscribe(Servicios => {
      for (const ID$ in Servicios) {
          const p = Servicios[ID$];
          p.ID$ = ID$;
          this.Servicios.push(Servicios[ID$]);
          }
    })
    console.log(this.Servicios);
    */
  }

  eliminarServicios(ID$) {
    this.servicioService.delServicio(ID$).subscribe(res => {
        this.Servicios = [];
        this.servicioService.getservicios().subscribe(Servicios => {
            for (const ID$ in Servicios) {
                const p = Servicios[ID$];
                p.ID$ = ID$;
                this.Servicios.push(Servicios[ID$]);
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

        this.servicioService.getServiciosSearch(this.busqueda).subscribe(Servicios => {
            this.Servicios = [];
          for (const ID$ in Servicios) {
              const p = Servicios[ID$];
              p.ID$ = ID$;
              this.Servicios.push(Servicios[ID$]);
              }
            if (this.Servicios.length < 1 && this.busqueda.length >= 1){
              this.noresultados = true;
            }else{
              this.noresultados = false;
            }
        })
        this.cargando = false;
        this.resultados = true;
      }else{
        this.Servicios = [];
        this.cargando = true;
        this.resultados = false;

      }
    });
    console.log(this.Servicios);
    
}
}
