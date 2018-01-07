import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HOLA CABRONES';
  
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyA8NvAsc-8Jq-N8-Kthy-rkVSFx48giAyI",
      authDomain: "tintoreriaapp.firebaseapp.com"
    });
  }
}
