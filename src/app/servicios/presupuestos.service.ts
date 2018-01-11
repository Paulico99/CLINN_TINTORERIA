import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class PresupuestosService {

  presURL= 'http://localhost:3000/Presupuestos';
  presURL2= 'http://localhost:3000/Presupuestos/';

  constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
  
  postPresupuestos(Presupuestos: any) {
    const newpres = JSON.stringify(Presupuestos);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.presURL, newpres, {headers}).map(res => { 
        console.log(res.json());
        return res.json();
      })
  }
  getPresupuestos() {
    return this.http.get(this.presURL).map(res => res.json());
  }
  getPresupuesto(idpresupuesto$: string) {
    const url = this.presURL2 + idpresupuesto$ + "/1";
    return this.http.get(url) 
    .map( res => res.json());
  }
  getPresupuestoSearch(idpresupuesto$: string){
    const url = this.presURL2 + idpresupuesto$ + "/2";
    console.log(url);
    return this.http.get(url) 
    .map( res => res.json());
  }
  putFactura(Presupuestos: any, idpresupuesto$: string) {
    const newpre = JSON.stringify(Presupuestos);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = this.presURL2 + idpresupuesto$;
    return this.http.put(url, newpre, {headers}).map(res => {
      console.log(res.json());
      return res.json();
    })
  }
  delPresupuesto(idpresupuesto$: string) {
    const url = this.presURL2 + idpresupuesto$;
    return this.http.delete(url)
    .map(res => res.json());
  }

}

