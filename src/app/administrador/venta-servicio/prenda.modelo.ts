export class Prenda {
    public idservicio: number;    
    public nombre: string;
    public descuento: number;
    public estatus: string;
    
  
    constructor(
        idservicio?: number,
        nombre?: string,
        descuento?: number,
        estatus?: string)
        {
            this.idservicio = idservicio;
            this.nombre = nombre;
            this.descuento = descuento;
            this.estatus = estatus;
            
    }
}