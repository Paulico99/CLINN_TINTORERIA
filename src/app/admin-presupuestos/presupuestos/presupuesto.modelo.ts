export class Presupuesto {
    public idpresupuesto: number;
    public id_proveedor: number;
    public fecha: string;
    public id_producto: number;
    public base: number;
    public t_iva: number;
    public importe_iva: number;
    public total_importe: number;
    
    constructor(
        idpresupuesto?: number,
        id_proveedor?: number,
        fecha?: string,
        id_producto?: number,
        base?: number,
        t_iva?: number,
        importe_iva?:number,
        total_importe?: number)
        {
            this.idpresupuesto = idpresupuesto;
            this.id_proveedor = id_proveedor;
            this.id_producto = id_producto;
            this.base = base;
            this.t_iva = t_iva;
            this.importe_iva = importe_iva;
            this.total_importe = total_importe;
            
            
    }
}