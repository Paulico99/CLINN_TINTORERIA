export class Empleado {
    public id: number;
    public RFC: string;
    public IDPuesto: string;
    public Direccion: string;
    public NSS: string;
    public Telefono: string;
    public Estatus: string;
    public email: string;
    public password: string;
    public contrasena: string;


    
    constructor(
        id?: number,
        RFC?: string,
        IDPuesto?: string,
        Direccion?: string,
        NSS?: string,
        Telefono?: string,
        Estatus?: string,
        email?: string,
        password?: string,
        contrasena?: string)
        {
            this.id = id;
            this.RFC = RFC;
            this.IDPuesto = IDPuesto;
            this.Direccion = Direccion;
            this.NSS = NSS;
            this.Telefono = Telefono;
            this.Estatus = Estatus;
            this.email = email;
            this.password = password;
            this.contrasena = contrasena;
                       
            
    }
}