import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class VentasService {

  presURL= 'http://localhost:3000/Ventas';
  presURL2= 'http://localhost:3000/Ventas/';
  
  presURL3= 'http://localhost:3000/detalle_ventas';
  presURL4= 'http://localhost:3000/detalle_ventas/';

    constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
    postVentas(ventas: any) {
      const newpres = JSON.stringify(ventas);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.presURL, newpres, {headers}).map(res => { 
          console.log(res.json());
          return res.json();
        })
    }
    getVentas() {
      return this.http.get(this.presURL).map(res => res.json());
    }
    getVenta(ID$: string) {
      const url = this.presURL2 + ID$ + "/1";
      return this.http.get(url) 
      .map( res => res.json());
    }
    getVentasSearch(ID$: string){
      const url = this.presURL2 + ID$ + "/2";
      console.log(url);
      return this.http.get(url) 
      .map( res => res.json());
    }
    putVenta(ventas: any, ID$: string) {
      const newpre = JSON.stringify(ventas);
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const url = this.presURL2 + ID$;
      return this.http.put(url, newpre, {headers}).map(res => {
        console.log(res.json());
        return res.json();
      })
    }
    delVenta(ID$: string) {
      const url = this.presURL2 + ID$;
      return this.http.delete(url)
      .map(res => res.json());
    }

    //DETALLE VENTAS

    postDetalleventas(detalleventas: any) {
      const newpres = JSON.stringify(detalleventas);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.presURL3, newpres, {headers}).map(res => { 
          console.log(res.json());
          return res.json();
        })
    }
    getDetalleventas() {
      return this.http.get(this.presURL3).map(res => res.json());
    }
    getDetalleventa(ID$: string) {
      const url = this.presURL4 + ID$;
      return this.http.get(url) 
      .map( res => res.json());
    }
    
    putDetalleventa(detalleventas: any, ID$: string) {
      const newpre = JSON.stringify(detalleventas);
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const url = this.presURL4 + ID$;
      return this.http.put(url, newpre, {headers}).map(res => {
        console.log(res.json());
        return res.json();
      })
    }
    delDetalleventa(ID$: string) {
      const url = this.presURL4 + ID$;
      return this.http.delete(url)
      .map(res => res.json());
    }
}
