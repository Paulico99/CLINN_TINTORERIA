import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private navigate:ActivatedRoute,private route:Router, private auth: AutenticacionService) {
  /*  
    if (this.auth.isAunthenticated())  {
      this.route.navigate(['/administrador/admin-admin']);
    }
   */
  }

  ngOnInit() {
  }
  isAuth(){
    return this.auth.isAunthenticated();
  }

  isAdmin(){
    return this.auth.isUid();
  }


  onLogout(){
    this.auth.logout();
    this.route.navigate(['/inicio'])
  }
}
