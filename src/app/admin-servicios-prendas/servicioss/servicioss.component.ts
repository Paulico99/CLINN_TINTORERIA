import { Component, OnInit } from '@angular/core';

import { PrendasService } from '../../servicios/prendas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Prenda } from '../../administrador/venta-servicio/prenda.modelo';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';

@Component({
  selector: 'app-servicioss',
  templateUrl: './servicioss.component.html',
  styleUrls: ['./servicioss.component.css']
})
export class ServiciossComponent implements OnInit {

  
  Prendas: any = [];
  campoBusqueda: FormControl;
  busqueda: string;

  cargando = true;
  resultados = false;
  noresultados = false;

  constructor(private prendaService: PrendasService , private route:Router, private activatedRoute: ActivatedRoute) {  
    /*this.servicioService.getservicios().subscribe(Servicios => {
      for (const idservicio$ in Servicios) {
          const p = Servicios[idservicio$];
          p.idservicio$ = idservicio$;
          this.Servicios.push(Servicios[idservicio$]);
          }
    })
    console.log(this.Servicios);
    */
  }

  eliminarServicios(idservicio$) {
    this.prendaService.delPrenda(idservicio$).subscribe(res => {
        this.Prendas = [];
        this.prendaService.getPrendas().subscribe(Prendas => {
            for (const idservicio$ in Prendas) {
                const p = Prendas[idservicio$];
                p.idservicio$ = idservicio$;
                this.Prendas.push(Prendas[idservicio$]);
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

        this.prendaService.getPrendaSearch(this.busqueda).subscribe(Prendas => {
            this.Prendas = [];
          for (const idservicio$ in Prendas) {
              const p = Prendas[idservicio$];
              p.idservicio$ = idservicio$;
              this.Prendas.push(Prendas[idservicio$]);
              }
            if (this.Prendas.length < 1 && this.busqueda.length >= 1){
              this.noresultados = true;
            }else{
              this.noresultados = false;
            }
        })
        this.cargando = false;
        this.resultados = true;
      }else{
        this.Prendas = [];
        this.cargando = true;
        this.resultados = false;

      }
    });
    console.log(this.Prendas);
    
}
}
