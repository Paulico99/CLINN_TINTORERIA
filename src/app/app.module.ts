import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuNavbarComponent } from './menu-navbar/menu-navbar.component';
import { AdminUsuarioComponent } from './Usuarios/admin-usuario/admin-usuario.component';
import { GaleriaFotosComponent } from './galeria-fotos/galeria-fotos.component';
import { AddRegistrarComponent } from './admin-clientes/add-registrar/add-registrar.component';

import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AccesarUsuarioComponent } from './Usuarios/accesar-usuario/accesar-usuario.component';
import { DatosUsuarioComponent } from './Usuarios/datos-usuario/datos-usuario.component';
import { PedidosComponent } from './Usuarios/pedidos/pedidos.component';
import { VentaServicioComponent } from './administrador/venta-servicio/venta-servicio.component';
import { AdminAdminComponent } from './administrador/admin-admin/admin-admin.component';
import { AdminPedidosComponent } from './administrador/admin-pedidos/admin-pedidos.component';

//import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
//import {MenuItem} from 'primeng/primeng';  

import {AccordionModule} from 'primeng/components/accordion/accordion';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FieldsetModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';

import { ProveedoresComponent } from './admin-proveedores/proveedores/proveedores.component';
import { AddproveedoresComponent } from './admin-proveedores/addproveedores/addproveedores.component';

import { ProveedoresService } from './servicios/proveedores.service';
import { EmpleadosComponent } from './admin-empleados/empleados/empleados.component';
import { AddempleadosComponent } from './admin-empleados/addempleados/addempleados.component';
import { EmpleadosService } from './servicios/empleados.service';
import { ClientesComponent } from './admin-clientes/clientes/clientes.component';
import { ClientesService } from './servicios/clientes.service';
import { ProductosService } from './servicios/productos.service';
import { ServiciossService } from './servicios/servicioss.service';

import { HttpModule } from '@angular/http';

import { IniciosesionComponent } from './autenticacion/iniciosesion/iniciosesion.component';
import { EditClienteComponent } from './admin-clientes/edit-cliente/edit-cliente.component';
import { EditproveedoresComponent } from './admin-proveedores/editproveedores/editproveedores.component';
import { EditempleadosComponent } from './admin-empleados/editempleados/editempleados.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { GuardService } from './servicios/guard.service';
import { ProductosComponent } from './admin-productos/productos/productos.component';
import { AddproductosComponent } from './admin-productos/addproductos/addproductos.component';
import { EditproductosComponent } from './admin-productos/editproductos/editproductos.component';
import { ComprasComponent } from './admin-compras/compras/compras.component';
import { EditcomprasComponent } from './admin-compras/editcompras/editcompras.component';
import { AddcomprasComponent } from './admin-compras/addcompras/addcompras.component';
import { PuestosService } from './servicios/puestos.service';
import { PreciosComponent } from './Usuarios/precios/precios.component';
import { AddServciosComponent } from './admin-servicios/add-servcios/add-servcios.component';
import { EditServciosComponent } from './admin-servicios/edit-servcios/edit-servcios.component';
import { ServciosComponent } from './admin-servicios/servcios/servcios.component';

import { VentasService } from './servicios/ventas.service';
import { PrendasService } from './servicios/prendas.service';
import { ServiciossComponent } from './admin-servicios-prendas/servicioss/servicioss.component';
import { AddserviciossComponent } from './admin-servicios-prendas/addservicioss/addservicioss.component';
import { EditserviciossComponent } from './admin-servicios-prendas/editservicioss/editservicioss.component';
import { AbonoComponent } from './administrador/abono/abono.component';
import { ComprasService } from './servicios/compras.service';
import { FacturasComponent } from './admin-compras/facturas/facturas.component';
import { AddfacturasComponent } from './admin-compras/addfacturas/addfacturas.component';
import { EditfacturasComponent } from './admin-compras/editfacturas/editfacturas.component';
import { FacturasService } from './servicios/facturas.service';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'add-registrar', component: AddRegistrarComponent },
  { path: 'Usuarios/accesar-usuario', component: AccesarUsuarioComponent},
  { path: 'Usuarios/precio',component: PreciosComponent},  
  { path: 'Usuarios/iniciosesion', component: IniciosesionComponent},
  { path: 'Usuarios/admin-usuario', component: AdminUsuarioComponent, canActivate: [GuardService]},
  { path: 'Usuarios/datos-usuario', component: DatosUsuarioComponent,canActivate: [GuardService]},
  { path: 'Usuarios/pedidos', component: PedidosComponent,canActivate: [GuardService]},
  { path: 'administrador/venta-servicio', component: VentaServicioComponent,canActivate: [GuardService]},
  { path: 'administrador/admin-admin', component: AdminAdminComponent, canActivate: [GuardService]},
  { path: 'administrador/admin-pedidos', component: AdminPedidosComponent, canActivate: [GuardService]},
  { path: 'admin-proveedores/proveedores', component: ProveedoresComponent, canActivate: [GuardService]},
  { path: 'addproveedores', component: AddproveedoresComponent, canActivate: [GuardService]},
  { path: 'admin-empleados/empleados', component: EmpleadosComponent, canActivate: [GuardService]},
  { path: 'addempleados', component: AddempleadosComponent, canActivate: [GuardService]},
  { path: 'admin-clientes/clientes', component: ClientesComponent, canActivate: [GuardService]},
  { path: 'editclientes/:id', component: EditClienteComponent, canActivate: [GuardService]},
  { path: 'admin-proveedores/editproveedores/:Id', component: EditproveedoresComponent, canActivate: [GuardService]},
  { path: 'admin-empleados/editempleados/:id', component: EditempleadosComponent, canActivate: [GuardService]},
  { path: 'admin-productos/productos', component: ProductosComponent, canActivate: [GuardService]},
  { path: 'admin-productos/addproductos', component: AddproductosComponent, canActivate: [GuardService]},
  { path: 'admin-productos/editproductos/:ID',component: EditproductosComponent, canActivate: [GuardService]},
  { path: 'admin-compras/editcompras/:id',component: EditproductosComponent, canActivate: [GuardService]},
  { path: 'admin-compras/addcompras',component: AddcomprasComponent, canActivate: [GuardService]},
  { path: 'admin-compras/compras',component: ComprasComponent},
  { path: 'admin-servicios/servicios',component: ServciosComponent, canActivate: [GuardService]},
  { path: 'admin-servicios/addservicios',component: AddServciosComponent, canActivate: [GuardService]},
  { path: 'admin-servicios/editservicios/:ID',component: EditServciosComponent, canActivate: [GuardService]},
  { path: 'admin-ventas/addventas',component: VentaServicioComponent},
  { path: 'admin-ventas/editventas/:ID',component: AbonoComponent},
  
  { path: 'admin-servicios-prenda/servicios', component: ServiciossComponent, canActivate: [GuardService]},
  { path: 'admin-servicios-prenda/addservicios', component: AddserviciossComponent, canActivate: [GuardService]},
  { path: 'admin-servicios-prenda/editservicios/:idservicio', component: EditserviciossComponent, canActivate: [GuardService]},
  
  { path: 'admin-compras/facturas', component: FacturasComponent, canActivate: [GuardService]},
  { path: 'admin-compras/addfacturas', component: AddfacturasComponent, canActivate: [GuardService]},
  { path: 'admin-compras/editfacturas/:ID',component: EditfacturasComponent, canActivate: [GuardService]},
  
  
  { path: '**', component: InicioComponent},
  
 

];

@NgModule({
  declarations: [
    AppComponent,
    MenuNavbarComponent,
    AdminUsuarioComponent,
    GaleriaFotosComponent,
    AddRegistrarComponent,
    InicioComponent,
    AccesarUsuarioComponent,
    DatosUsuarioComponent,
    PedidosComponent,
    VentaServicioComponent,
    AdminAdminComponent,
    AdminPedidosComponent,
    ProveedoresComponent,
    AddproveedoresComponent,
    EmpleadosComponent,
    AddempleadosComponent,
    ClientesComponent,
    IniciosesionComponent,
    EditClienteComponent,
    EditproveedoresComponent,
    EditempleadosComponent,
    ProductosComponent,
    AddproductosComponent,
    EditproductosComponent,
    ComprasComponent,
    EditcomprasComponent,
    AddcomprasComponent,
    PreciosComponent,
    AddServciosComponent,
    EditServciosComponent,
    ServciosComponent,
    ServiciossComponent,
    AddserviciossComponent,
    EditserviciossComponent,
    AbonoComponent,
    FacturasComponent,
    AddfacturasComponent,
    EditfacturasComponent

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    RadioButtonModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PanelModule,
    AccordionModule,
    FieldsetModule,
    InputMaskModule,
    SharedModule,
    DataTableModule,
    HttpModule,
    PasswordModule,
    CalendarModule,
    TabViewModule

  ],
  providers: [ProveedoresService,
    EmpleadosService,
    ClientesService, 
    AutenticacionService,
    GuardService,
    ProductosService,
    PuestosService,
    ServiciossService,
    VentasService,
    PrendasService,
    ComprasService,
    FacturasService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
