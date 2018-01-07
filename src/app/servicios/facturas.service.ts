import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';


@Injectable()
export class FacturasService {

  presURL= 'http://localhost:3000/Facturas';
  presURL2= 'http://localhost:3000/Facturas/';

  constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
  
  postFacturas(Facturas: any) {
    const newpres = JSON.stringify(Facturas);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.presURL, newpres, {headers}).map(res => { 
        console.log(res.json());
        return res.json();
      })
  }
  getFacturas() {
    return this.http.get(this.presURL).map(res => res.json());
  }
  getFactura(ID$: string) {
    const url = this.presURL2 + ID$ + "/1";
    return this.http.get(url) 
    .map( res => res.json());
  }
  getFacturasSearch(ID$: string){
    const url = this.presURL2 + ID$ + "/2";
    console.log(url);
    return this.http.get(url) 
    .map( res => res.json());
  }
  putFactura(Facturas: any, ID$: string) {
    const newpre = JSON.stringify(Facturas);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = this.presURL2 + ID$;
    return this.http.put(url, newpre, {headers}).map(res => {
      console.log(res.json());
      return res.json();
    })
  }
  delFactura(ID$: string) {
    const url = this.presURL2 + ID$;
    return this.http.delete(url)
    .map(res => res.json());
  }

}
