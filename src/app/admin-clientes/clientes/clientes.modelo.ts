export class Cliente {
    public id: number;
    public nombre?: string;
    public apellidos: string;
    public direccion: string;
    public telefono: string;
    public email: string;
    public password: string;
    public contrasena: string;    
    public tipo_persona: string;
    public estatus: string;
    
    constructor(
        id?: number,
        nombre?: string,
        apellidos?: string,
        direccion?: string,
        telefono?: string,
        email?: string,
        password?:string,
        contrasena?: string,        
        tipo_persona?: string,
        estatus?: string)
        {
            this.id = id;
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.direccion = direccion;
            this.telefono = telefono;
            this.email = email;
            this.password = password;
            this.contrasena = contrasena;
            this.tipo_persona = tipo_persona;
            this.estatus = estatus;
            
    }
}