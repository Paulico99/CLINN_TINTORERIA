import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit {

  loginForm: FormGroup;
  userdata : any;
  userdata2: any;


  erroresForm = {
    'email' : '',
    'password': ''
  }
  mensajesValidacion = {
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca una direccion de correo correcta'
    },
    'password':{
      'required': 'Contraseña Obligatoria',
      'pattern' : ' La contraseña debe tener al menos una letra,  un numero',
      'minlength': ' y debe de ser de mas 6 caracteres'
    }
  }

  mensaje : boolean;
  autenticando = false;


  constructor(private formBuilder: FormBuilder,
  private autService: AutenticacionService,
  private router: Router,
  private activatedroute: ActivatedRoute ) { }

  
  ngOnInit() {
    
        this.loginForm = this.formBuilder.group({
          'email':['',[
            Validators.required,
            Validators.email]
          ],
          'password':['',[
            Validators.required,
            Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(a-zA-Z0-9]+)$'),
            Validators.minLength(6)
          ] ]
        });
      }

      onSubmit(){
        this.autenticando = true;        
        this.userdata = this.saveUserdata();
        this.userdata2 = this.saveUserdata2();
       if (this.autService.iniciosesion(this.userdata)){
        setTimeout(() => {
          if (this.isAuth() && this.isAdmin() === false ){
            this.mensaje = true;
            this.autenticando = false;
          }
        },2500);
      }
       else if (this.autService.iniciosesion2(this.userdata2)){
        setTimeout(() => {
          if (this.isAuth() === false ){
            this.mensaje = true;
            this.autenticando = false;
            
          }
        },2500);
      }

    }
      saveUserdata(){
        const saveUserdata = {
          email: this.loginForm.get('email').value,
          password: this.loginForm.get('password').value,
        };
        return saveUserdata;
      }

      saveUserdata2(){
        const saveUserdata2 = {
          email: this.loginForm.get('email').value,
          password: this.loginForm.get('password').value,
        };
        return saveUserdata2;
      }

      onValueChanged(data?:any){
        if (!this.loginForm){ return; }
        const form = this.loginForm;
        for (const field in this.erroresForm){
          this.erroresForm[field]= '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid){
            const messages = this.mensajesValidacion[field];
            for (const key in control.errors)
             this.erroresForm[field] += messages[key] + ' ' ;
          }
        }
      }

      isAuth(){
        return this.autService.isAunthenticated();
      }
      
      isAdmin(){
        return this.autService.isUid();
      }

}
