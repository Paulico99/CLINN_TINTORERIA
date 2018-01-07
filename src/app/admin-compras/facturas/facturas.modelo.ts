export class Factura {
    public ID: number;
    public id_proveedor: number;
    public id_producto: number;
    public fecha: Date;
    public iva: number;
    public subtotal: number;
    public total: number;
    
   
    
    constructor(
        ID?: number,
        id_proveedor?: number,
        id_producto?: number,
        fecha?: Date,
        iva?: number,
        subtotal?: number,
        total?: number)
        {
            this.ID = ID;
            this.id_proveedor = id_proveedor;
            this.id_producto = id_producto;
            this.fecha = fecha;
            this.iva = iva;
            this.subtotal = subtotal;
            this.total = total;
            
            
    }
}