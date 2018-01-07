import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';


import {ButtonModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';


@Component({
  selector: 'app-admin-admin',
  templateUrl: './admin-admin.component.html',
  styleUrls: ['./admin-admin.component.css']
})
export class AdminAdminComponent implements OnInit {

  cargando = true;
  
  constructor(private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute ) { }
  
    ngOnInit() {
    }
   
    isAuth(){
      return this.autService.isAunthenticated();
    }

    isAdmin(){
      return this.autService.isUid();
    }
  
    onLogout(){
      this.autService.logout();
      this.router.navigate(['/inicio'])
    }
}
