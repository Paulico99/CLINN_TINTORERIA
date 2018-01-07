import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { ProductosComponent } from '../../admin-Productos/Productos/Productos.component';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  Productos: any = [];
  campoBusqueda: FormControl;
  busqueda: string;

  cargando = true;
  resultados = false;
  noresultados = false;

  constructor(private productosService: ProductosService , private route:Router, private activatedRoute: ActivatedRoute) {  
    /*this.productosService.getProductos().subscribe(Productos => {
      for (const ID$ in Productos) {
          const p = Productos[ID$];
          p.ID$ = ID$;
          this.Productos.push(Productos[ID$]);
          }
    })
    console.log(this.Productos);
    */
  }

  eliminarProducto(ID$) {
    this.productosService.delproducto(ID$).subscribe(res => {
        this.Productos = [];
        this.productosService.getProductos().subscribe(Productos => {
            for (const ID$ in Productos) {
                const p = Productos[ID$];
                p.ID$ = ID$;
                this.Productos.push(Productos[ID$]);
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

        this.productosService.getProductosSearch(this.busqueda).subscribe(Productos => {
            this.Productos = [];
          for (const ID$ in Productos) {
              const p = Productos[ID$];
              p.ID$ = ID$;
              this.Productos.push(Productos[ID$]);
              }
            if (this.Productos.length < 1 && this.busqueda.length >= 1){
              this.noresultados = true;
            }else{
              this.noresultados = false;
            }
        })
        this.cargando = false;
        this.resultados = true;
      }else{
        this.Productos = [];
        this.cargando = true;
        this.resultados = false;

      }
    });
    console.log(this.Productos);
    
}
}
