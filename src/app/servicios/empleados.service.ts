import { Injectable} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';

@Injectable()
export class EmpleadosService {
presURL= 'http://localhost:3000/Empleados';
presURL2= 'http://localhost:3000/Empleados/';

  constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
  postempleado(empleado: any) {
    const newpres = JSON.stringify(empleado);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.presURL, newpres, {headers}).map(res => { 
        console.log(res.json());
        return res.json();
      })
  }
  getempleados() {
    return this.http.get(this.presURL).map(res => res.json());
  }
  getempleado(id$: string) {
    const url = this.presURL2 + id$ + "/1";
    return this.http.get(url) 
    .map( res => res.json());
  }
  getEmpleadoSearch(id$: string){
    const url = this.presURL2 + id$ + "/2";
    console.log(url);
    return this.http.get(url) 
    .map( res => res.json());
  }
  putempleado(empleado: any, id$: string) {
    const newpre = JSON.stringify(empleado);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = this.presURL2 + id$;
    return this.http.put(url, newpre, {headers}).map(res => {
      console.log(res.json());
      return res.json();
    })
  }
  delempleado(id$: string) {
    const url = this.presURL2 + id$;
    return this.http.delete(url)
    .map(res => res.json());
  }

}
