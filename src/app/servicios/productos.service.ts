import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';


@Injectable()
export class ProductosService {

  presURL= 'http://localhost:3000/Productos';
  presURL2= 'http://localhost:3000/Productos/';
  
    constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
    postProducto(producto: any) {
      const newpres = JSON.stringify(producto);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.presURL, newpres, {headers}).map(res => { 
          console.log(res.json());
          return res.json();
        })
    }
    getProductos() {
      return this.http.get(this.presURL).map(res => res.json());
    }
    getProducto(ID$: string) {
      const url = this.presURL2 + ID$ + "/1";
      return this.http.get(url) 
      .map( res => res.json());
    }
    getProductosSearch(ID$: string){
      const url = this.presURL2 + ID$ + "/2";
      console.log(url);
      return this.http.get(url) 
      .map( res => res.json());
    }
    putProducto(producto: any, ID$: string) {
      const newpre = JSON.stringify(producto);
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const url = this.presURL2 + ID$;
      return this.http.put(url, newpre, {headers}).map(res => {
        console.log(res.json());
        return res.json();
      })
    }
    delproducto(ID$: string) {
      const url = this.presURL2 + ID$;
      return this.http.delete(url)
      .map(res => res.json());
    }
}
