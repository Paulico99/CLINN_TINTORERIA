import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class PrendasService {


  presURL= 'http://localhost:3000/Prendas';
  presURL2= 'http://localhost:3000/Prendas/';
  
    constructor(private http: Http , private route: Router, private activatedroute: ActivatedRoute) { }
    postPrenda(prenda: any) {
      const newpres = JSON.stringify(prenda);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.presURL, newpres, {headers}).map(res => { 
          console.log(res.json());
          return res.json();
        })
    }
    getPrendas() {
      return this.http.get(this.presURL).map(res => res.json());
    }
    getPrenda(idservicio$: string) {
      const url = this.presURL2 + idservicio$ + "/1";
      return this.http.get(url) 
      .map( res => res.json());
    }
    getPrendaSearch(idservicio$: string){
      const url = this.presURL2 + idservicio$ + "/2";
      console.log(url);
      return this.http.get(url) 
      .map( res => res.json());
    }
    putPrenda(prenda: any, idservicio$: string) {
      const newpre = JSON.stringify(prenda);
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const url = this.presURL2 + idservicio$;
      return this.http.put(url, newpre, {headers}).map(res => {
        console.log(res.json());
        return res.json();
      })
    }
    delPrenda(idservicio$: string) {
      const url = this.presURL2 + idservicio$;
      return this.http.delete(url)
      .map(res => res.json());
    }

}
