export class Venta {
    public ID: number;
    public id_cliente: number;
    public Total: number;
    public Abono: number;
    public estatus: string;
    public entrega: string;
    public estatus_servicio: string;
   
    
    constructor(
        ID?: number,
        id_cliente?: number,
        Total?: number,
        Abono?: number,
        estatus?: string,
        entrega?: string,
        estatus_servicio?: string)
        {
            this.ID = ID;
            this.id_cliente = id_cliente;
            this.Total = Total;
            this.Abono = Abono;
            this.estatus = estatus;
            this.entrega = entrega;
            this.estatus_servicio = estatus_servicio;
    }
}