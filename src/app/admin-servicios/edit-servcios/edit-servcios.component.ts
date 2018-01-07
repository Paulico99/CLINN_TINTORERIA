import { Component, OnInit,ViewChild,OnChanges } from '@angular/core';
import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

import { ServiciossService } from '../../servicios/servicioss.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Servicios } from '../servcios/servicios.modelo';

@Component({
  selector: 'app-edit-servcios',
  templateUrl: './edit-servcios.component.html',
  styleUrls: ['./edit-servcios.component.css']
})
export class EditServciosComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;
  registroServicio: FormGroup;
  Servicioss: any = [];
  servicioo = new Servicios();
  ID: string;

  Estatus: SelectItem[];
  SelectEstatus: string;

  Precio : number;

  constructor(private fb: FormBuilder,private servicioService: ServiciossService, private router: Router, private activatedRouter: ActivatedRoute) { 
    this.activatedRouter.params.subscribe(parametros => {
      this.ID = parametros['ID'];
      console.log(this.ID);
      this.servicioService.getServicio(this.ID)
        .subscribe(Servicios => {
          this.servicioo = Servicios[0];
          console.log(Servicios);
        })

        this.Estatus = [];
        this.Estatus.push({label:'Seleccione Status del Servicio', value:null});
        this.Estatus.push({label:'ACTIVO',value:'A'});
        this.Estatus.push({label:'INACTIVO',value:'I'});
    });
  }

  saveRegistro(){
    const saveRegistro = {
      Nombre: this.registroServicio.get('Nombre').value,
      Estatus: this.registroServicio.get('Estatus').value,
      Precio: this.registroServicio.get('Precio').value,    
     
    };
    return saveRegistro;
  }

  onSubmit(){
    this.Servicioss = this.saveRegistro();
    this.servicioService.putServicio(this.Servicioss, this.ID).subscribe(newpres => {this.router.navigate(['admin-servicios/servicios'])})
  }

  ngOnInit() {
    this.registroServicio = this.fb.group({
      Nombre : ['', Validators.required],
      Estatus: ['', Validators.required],
      Precio: ['', Validators.required],
    });
  }
}
