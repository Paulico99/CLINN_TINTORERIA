import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../servicios/empleados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  Empleados: any = [];
  
  campoBusqueda: FormControl;
  busqueda: string;

  cargando = true;
  resultados = false;
  noresultados = false;

  constructor(private EmpleadosService: EmpleadosService , private route:Router, private activatedRoute: ActivatedRoute) {  
    /*
    this.EmpleadosService.getempleados().subscribe(Empleados => {
      for (const id$ in Empleados) {
          const p = Empleados[id$];
          p.id$ = id$;
          this.Empleados.push(Empleados[id$]);
          }
    })
    */
  }

  eliminarEmpleado(id$) {
    this.EmpleadosService.delempleado(id$).subscribe(res => {
        this.Empleados = [];
        this.EmpleadosService.getempleados().subscribe(Empleados => {
            for (const id$ in Empleados) {
                const p = Empleados[id$];
                p.id$ = id$;
                this.Empleados.push(Empleados[id$]);
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

        this.EmpleadosService.getEmpleadoSearch(this.busqueda).subscribe(Empleados => {
            this.Empleados = [];
          for (const id$ in Empleados) {
              const p = Empleados[id$];
              p.id$ = id$;
              this.Empleados.push(Empleados[id$]);
              }
            if (this.Empleados.length < 1 && this.busqueda.length >= 1){
              this.noresultados = true;
            }else{
              this.noresultados = false;
            }
        })
        this.cargando = false;
        this.resultados = true;
      }else{
        this.Empleados = [];
        this.cargando = true;
        this.resultados = false;

      }
    });
    console.log(this.Empleados);
    
}
}