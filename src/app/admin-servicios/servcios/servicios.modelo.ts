export class Servicios {
    public ID: number;
    public Nombre?: string;    
    public Estatus: string;
    public Precio: number;
    
    constructor(
        ID?: number,
        Nombre?: string,
        Estatus?: string,
        Precio?: number)
        {
            this.ID = ID;
            this.Nombre = Nombre;
            this.Estatus = Estatus;
            this.Precio = Precio;
            
    }
}