import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ServiciossService {

  presURL= 'http://localhost:3000/Servicios';
  presURL2= 'http://localhost:3000/Servicios/';
  
    constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
    postServicio(servicios: any) {
      const newpres = JSON.stringify(servicios);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.presURL, newpres, {headers}).map(res => { 
          console.log(res.json());
          return res.json();
        })
    }
    getservicios() {
      return this.http.get(this.presURL).map(res => res.json());
    }
    getServicio(ID$: string) {
      const url = this.presURL2 + ID$ + "/1";
      return this.http.get(url) 
      .map( res => res.json());
    }
    getServiciosSearch(ID$: string){
      const url = this.presURL2 + ID$ + "/2";
      console.log(url);
      return this.http.get(url) 
      .map( res => res.json());
    }
    putServicio(servicios: any, ID$: string) {
      const newpre = JSON.stringify(servicios);
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const url = this.presURL2 + ID$;
      return this.http.put(url, newpre, {headers}).map(res => {
        console.log(res.json());
        return res.json();
      })
    }
    delServicio(ID$: string) {
      const url = this.presURL2 + ID$;
      return this.http.delete(url)
      .map(res => res.json());
    }


}
