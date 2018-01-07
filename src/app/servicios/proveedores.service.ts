import { Injectable} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';

@Injectable()
export class ProveedoresService {
presURL= 'http://localhost:3000/Proveedores';
presURL2= 'http://localhost:3000/Proveedores/';

  constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
  postProveedor(proveedor: any) {
    const newpres = JSON.stringify(proveedor);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.presURL, newpres, {headers}).map(res => { 
        console.log(res.json());
        return res.json();
      })
  }
  getProveedores() {
    console.log(this.presURL);
    return this.http.get(this.presURL).map(res => res.json());
  }
  getProveedor(id$: string) {
    const url = this.presURL2 + id$ + "/1";
    return this.http.get(url) 
    .map( res => res.json());
  }
  getProveedorSearch(id$: string){
    const url = this.presURL2 + id$ + "/2";
    console.log(url);
    return this.http.get(url) 
    .map( res => res.json());
  }
  putProveedor(proveedor: any, Id$: string) {
    const newpre = JSON.stringify(proveedor);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = this.presURL2 + Id$;
    return this.http.put(url, newpre, {headers}).map(res => {
      console.log(res.json());
      return res.json();
    })
  }
  delProveedor(Id$: string) {
    const url = this.presURL2 + Id$;
    return this.http.delete(url)
    .map(res => res.json());
  }

}

