export class DetalleCompra {
    public idcompras: number;
    public id_producto: number;
    public id_proveedor: number;
    public cantidad: number;
    public Precio: number;
    public fecha: Date;
    public iva: number;
    public importe: number;
    public id_compras2: number;
   
    
    constructor(
        idcompras?: number,
        id_producto?: number,
        id_proveedor?: number,
        cantidad?: number,
        Precio?: number,
        fecha?: Date,
        iva?:number,
        importe?: number,
        id_compras2?:number)
        {
            this.idcompras = idcompras;
            this.id_producto = id_producto;
            this.id_proveedor = id_proveedor;
            this.cantidad = cantidad;
            this.Precio = Precio;
            this.fecha = fecha;
            this.iva = iva;
            this.importe = importe;
            this.id_compras2 = id_compras2;
            
    }
}