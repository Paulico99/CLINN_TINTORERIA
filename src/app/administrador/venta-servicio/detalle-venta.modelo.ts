export class Detalle_Venta {
    public ID?: number;
    public id_servicio?: number;
    public t_prenda?: number;
    public Precio?: number;
    public cantidad?: number;
    public id_venta?: number;
    public total?: number;
   
    
    constructor(
        ID?: number,
        id_servicio?: number,
        t_prenda?: number,
        Precio?: number,
        cantidad?: number,
        id_venta?: number,
        total?: number)
        {
            this.ID = ID;
            this.id_servicio = id_servicio;
            this.t_prenda = t_prenda;
            this.Precio = Precio;
            this.cantidad = cantidad;
            this.id_venta = id_venta;
            this.total = total;
            
    }
}