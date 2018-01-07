export class Producto {
    public ID: number;
    public descripcion?: string;
    public Precio: number;
    public id_proveedor: string;
    public Estatus: string;
    
    constructor(
        ID?: number,
        descripcion?: string,
        Precio?: number,
        id_proveedor?: string,
        Estatus?: string)
        {
            this.ID = ID;
            this.descripcion = descripcion;
            this.Precio = Precio;
            this.id_proveedor = id_proveedor;
            this.Estatus = Estatus;           
    }
}