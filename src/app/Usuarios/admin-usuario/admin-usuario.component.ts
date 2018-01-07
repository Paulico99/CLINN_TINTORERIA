import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent implements OnInit {

  constructor(private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute ) { }
  
    ngOnInit() {
    }
   
    isAuth(){
      return this.autService.isAunthenticated();
    }
  
    onLogout(){
      this.autService.logout();
      this.router.navigate(['/inicio'])
    }
}
