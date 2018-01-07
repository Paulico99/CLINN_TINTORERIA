import { Component, OnInit,ViewChild,OnChanges} from '@angular/core';

import { FormControl ,FormGroup, FormBuilder,Validators , NgForm} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

import { PrendasService } from '../../servicios/prendas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Prenda } from '../../administrador/venta-servicio/prenda.modelo';

@Component({
  selector: 'app-addservicioss',
  templateUrl: './addservicioss.component.html',
  styleUrls: ['./addservicioss.component.css']
})
export class AddserviciossComponent implements OnInit {
  @ViewChild('formpro') formpro: NgForm;  
  registroServicioo : FormGroup;
  servicioo: any;

  estatus: SelectItem[];
  SelectEstatus: string;
  
  saveRegistro(){
    const saveRegistro = {
      nombre: this.registroServicioo.get('nombre').value,
      descuento: this.registroServicioo.get('descuento').value,
      estatus: this.registroServicioo.get('estatus').value,    
     
    };
    return saveRegistro;
  }

  onSubmit(){
    this.servicioo = this.saveRegistro();
    this.prendaService.postPrenda(this.servicioo).subscribe(newpres => {this.router.navigate(['admin-servicios-prenda/servicios'])})
  }
  constructor(private rc: FormBuilder, private prendaService: PrendasService, private router: Router , private activatedRoute: ActivatedRoute) { 
    this.estatus = [];
    this.estatus.push({label:'Seleccione Status del Servicio', value:null});
    this.estatus.push({label:'ACTIVO',value:'A'});
    this.estatus.push({label:'INACTIVO',value:'I'});
  
  }

  ngOnInit() {
    this.registroServicioo = this.rc.group({
      nombre : ['', Validators.required],
      descuento: ['', Validators.required],
      estatus: ['', Validators.required],
    });
  }

}
