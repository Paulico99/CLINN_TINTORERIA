import { Injectable} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';

@Injectable()
export class ClientesService {
presURL= 'http://localhost:3000/Clientes';
presURL2= 'http://localhost:3000/Clientes/';

  constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
  postCliente(cliente: any) {
    const newpres = JSON.stringify(cliente);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.presURL, newpres, {headers}).map(res => { 
        console.log(res.json());
        return res.json();
      })
  }
  getClientes() {
    return this.http.get(this.presURL).map(res => res.json());
  }
  getCliente(id$: string) {
    const url = this.presURL2 + id$ + "/1";
    console.log(url);
    return this.http.get(url) 
    .map( res => res.json());
  }

  getClienteSearch(id$: string){
    const url = this.presURL2 + id$ + "/2";
    console.log(url);
    return this.http.get(url) 
    .map( res => res.json());
  }

  putCliente(cliente: any, id$: string) {
    const newpre = JSON.stringify(cliente);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = this.presURL2 + id$;
    return this.http.put(url, newpre, {headers}).map(res => {
      console.log(res.json());
      return res.json();
    })
  }
  delCliente(id$: string) {
    const url = this.presURL2 + id$;
    return this.http.delete(url)
    .map(res => res.json());
  }

}