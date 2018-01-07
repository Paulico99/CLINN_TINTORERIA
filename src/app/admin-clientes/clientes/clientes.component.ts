import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  Clientes: any = [];
  campoBusqueda: FormControl;
  busqueda: string;

  cargando = true;
  resultados = false;
  noresultados = false;



  constructor(private clientesService: ClientesService , private route:Router, private activatedRoute: ActivatedRoute) {  
    /*
    this.clientesService.getClientes().subscribe(Clientes => {
      for (const id$ in Clientes) {
          const p = Clientes[id$];
          p.id$ = id$;
          this.Clientes.push(Clientes[id$]);
          }
    })
    console.log(this.Clientes);
    */
  }

  eliminarCliente(id$) {
    this.clientesService.delCliente(id$).subscribe(res => {
        this.Clientes = [];
        this.clientesService.getClientes().subscribe(Clientes => {
            for (const id$ in Clientes) {
                const p = Clientes[id$];
                p.id$ = id$;
                this.Clientes.push(Clientes[id$]);
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

          this.clientesService.getClienteSearch(this.busqueda).subscribe(Clientes => {
              this.Clientes = [];
            for (const id$ in Clientes) {
                const p = Clientes[id$];
                p.id$ = id$;
                this.Clientes.push(Clientes[id$]);
                }
              if (this.Clientes.length < 1 && this.busqueda.length >= 1){
                this.noresultados = true;
              }else{
                this.noresultados = false;
              }
          })
          this.cargando = false;
          this.resultados = true;
        }else{
          this.Clientes = [];
          this.cargando = true;
          this.resultados = false;

        }
      });
      console.log(this.Clientes);
      
  }

}
