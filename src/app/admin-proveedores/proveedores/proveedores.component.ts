import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  Proveedores: any = [];
  campoBusqueda: FormControl;
  busqueda: string;

  cargando = true;
  resultados = false;
  noresultados = false;
  
  constructor(private ProveedoresService: ProveedoresService , private route:Router, private activatedRoute: ActivatedRoute) {  
    /*
    this.ProveedoresService.getProveedores().subscribe(Proveedores => {
      for (const Id$ in Proveedores) {
          let p = Proveedores[Id$];
          p.Id$ = Id$;
          this.Proveedores.push(Proveedores[Id$]);
          }
    })
    console.log(this.Proveedores);
    */
  }

  eliminarProveedores(Id$) {
    this.ProveedoresService.delProveedor(Id$).subscribe(res => {
        this.Proveedores = [];
        this.ProveedoresService.getProveedores().subscribe(Proveedores => {
            for (const Id$ in Proveedores) {
                const p = Proveedores[Id$];
                p.Id$ = Id$;
                this.Proveedores.push(Proveedores[Id$]);
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
  
          this.ProveedoresService.getProveedorSearch(this.busqueda).subscribe(Proveedores => {
              this.Proveedores = [];
            for (const id$ in Proveedores) {
                const p = Proveedores[id$];
                p.id$ = id$;
                this.Proveedores.push(Proveedores[id$]);
                }
              if (this.Proveedores.length < 1 && this.busqueda.length >= 1){
                this.noresultados = true;
              }else{
                this.noresultados = false;
              }
          })
          this.cargando = false;
          this.resultados = true;
        }else{
          this.Proveedores = [];
          this.cargando = true;
          this.resultados = false;
  
        }
      });
      console.log(this.Proveedores);
      
  }

}
