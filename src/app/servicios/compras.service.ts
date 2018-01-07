import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ComprasService {
  presURL= 'http://localhost:3000/Compras';
  presURL2= 'http://localhost:3000/Compras/';

  presURL3= 'http://localhost:3000/Compras2';
  presURL4= 'http://localhost:3000/Compras2/';
  
    constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
    //DETALLE COMPRAS
    postCompras(Compras: any) {
      const newpres = JSON.stringify(Compras);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.presURL, newpres, {headers}).map(res => { 
          console.log(res.json());
          return res.json();
        })
    }
    getCompras() {
      return this.http.get(this.presURL).map(res => res.json());
    }
    getCompra(idcompras$: string) {
      const url = this.presURL2 + idcompras$;
      return this.http.get(url) 
      .map( res => res.json());
    }
    putVenta(Compras: any, idcompras$: string) {
      const newpre = JSON.stringify(Compras);
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const url = this.presURL2 + idcompras$;
      return this.http.put(url, newpre, {headers}).map(res => {
        console.log(res.json());
        return res.json();
      })
    }
    delCompra(idcompras$: string) {
      const url = this.presURL2 + idcompras$;
      return this.http.delete(url)
      .map(res => res.json());
    }

    //COMPRAS

    postcompras2(compras2: any) {
      const newpres = JSON.stringify(compras2);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.presURL3, newpres, {headers}).map(res => { 
          console.log(res.json());
          return res.json();
        })
    }
    getcompras2() {
      return this.http.get(this.presURL3).map(res => res.json());
    }
    getCompras2(idcompras2$: string) {
      const url = this.presURL4 + idcompras2$;
      return this.http.get(url) 
      .map( res => res.json());
    }
    
    putcompras2(compras2: any, idcompras2$: string) {
      const newpre = JSON.stringify(compras2);
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const url = this.presURL4 + idcompras2$;
      return this.http.put(url, newpre, {headers}).map(res => {
        console.log(res.json());
        return res.json();
      })
    }
    delcompras2(idcompras2$: string) {
      const url = this.presURL4 + idcompras2$;
      return this.http.delete(url)
      .map(res => res.json());
    }

}
