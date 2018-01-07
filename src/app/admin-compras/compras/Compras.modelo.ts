export class Compra {
    public idcompras2: number;
    public status: string;
    public fecha: Date;
    public iva: number;
    public subtotal: number;
    public importe: number;
   
    
    constructor(
        idcompras2?: number,
        status?: string,
        fecha?: Date,
        iva?: number,
        subtotal?: number,
        importe?: number)
        {
            this.idcompras2 = idcompras2;
            this.status = status;
            this.fecha = fecha;
            this.iva = iva;
            this.subtotal = subtotal;
            this.importe = importe;
            
    }
}