export class Proveedor {
    public Id: number;
    public nombre?: string;    
    public RFC: string;
    public Direccion: string;
    public Telefono: string;
    public correo: string;
    public Localidad: string;
    public Estado: string;
    public Estatus: string;
    
    constructor(
        Id?: number,
        nombre?: string,
        RFC?: string,
        Direccion?: string,  
        Telefono?: string,
        correo?: string,
        Localidad?: string,
        Estado?: string,
        Estatus?: string)
        {
            this.Id = Id;
            this.nombre = nombre;
            this.RFC = RFC;
            this.Direccion = Direccion;
            this.Telefono = Telefono;
            this.correo = correo;
            this.Localidad = Localidad;
            this.Estado = Estado;
            this.Estatus = Estatus;
            
    }
}