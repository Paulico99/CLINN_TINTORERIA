import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class PuestosService {

  presURL= 'http://localhost:3000/Puestos';
  presURL2= 'http://localhost:3000/Puestos/';
  
    constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
    postPuesto(puesto: any) {
      const newpres = JSON.stringify(puesto);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.presURL, newpres, {headers}).map(res => { 
          console.log(res.json());
          return res.json();
        })
    }
    getPuestos() {
      return this.http.get(this.presURL).map(res => res.json());
    }
    getPuesto(id$: string) {
      const url = this.presURL2 + id$;
      return this.http.get(url) 
      .map( res => res.json());
    }
    putPuesto(puesto: any, id$: string) {
      const newpre = JSON.stringify(puesto);
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const url = this.presURL2 + id$;
      return this.http.put(url, newpre, {headers}).map(res => {
        console.log(res.json());
        return res.json();
      })
    }
    delPuesto(id$: string) {
      const url = this.presURL2 + id$;
      return this.http.delete(url)
      .map(res => res.json());
    }

}
