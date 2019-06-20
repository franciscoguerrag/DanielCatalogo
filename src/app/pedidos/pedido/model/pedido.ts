import { Producto } from 'src/app/productos/model/producto';

export class Pedido {
    id: number;
    cedula: number;
    nombre: string;
    direccion: string;
    fecha: string;
    ciudad: string;
    pdfBase64: string;
    productos: Producto[]
}
