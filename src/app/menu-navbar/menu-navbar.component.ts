import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SplitButtonModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-menu-navbar',
  templateUrl: './menu-navbar.component.html',
  styleUrls: ['./menu-navbar.component.css']
})
export class MenuNavbarComponent implements OnInit {
  msgs: Message[] = [];
  
  items: MenuItem[];
  items2: MenuItem[]; 
  
  constructor(private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute ) { }
  
  
    ngOnInit() {
        this.items = [
          {label: 'Inicio', icon: 'fa-home', command: () => {
            this.inicio();
           }},  
          {label: 'Menu', icon: 'fa-refresh', command: () => {
               this.menu();
            }},
            {label: 'Configurar', icon: 'fa-cogs', command: () => {
                //this.delete();
        
            }},
            {label: 'Cerrar sesion', icon: 'fa-close', command: () => {
              this.onLogout();
            }},
           /* {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/']}*/
        ];

        this.items2 = [
          {label: 'Inicio', icon: 'fa-home', command: () => {
            this.inicio();
         }},
          {label: 'Menu', icon: 'fa-refresh', command: () => {
             this.menu2();
          }},
          {label: 'Datos', icon: 'fa-cogs', command: () => {
              this.datos();
      
          }},
          {label: 'Cerrar sesion', icon: 'fa-close', command: () => {
            this.onLogout();
          }},
         /* {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/']}*/
      ];
    }
    inicio(){
      this.router.navigate(['/#'])
    }
    datos(){
       this.router.navigate(['/Usuarios/datos-usuario'])
    }
    save() {
  
    }
    
    update() {
        /*this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Data Updated'});
      */
      }
    
    delete() {
        /*
        this.msgs = [];
        this.msgs.push({routerLink="/Usuarios/iniciosesion"});
        */
      }
    isAuth(){
      return this.autService.isAunthenticated();
    }

    isAdmin(){
      return this.autService.isUid();
    }

  menu(){
    this.router.navigate(['/administrador/admin-admin'])
    
  }
  menu2(){
    this.router.navigate(['/Usuarios/admin-usuario'])
  }
    onLogout(){
      this.autService.logout();
      this.router.navigate(['/inicio'])
    }

}
