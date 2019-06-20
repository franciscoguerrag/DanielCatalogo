import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { Producto } from 'src/app/productos/model/producto';

@Injectable()
export class PedidoService {

  constructor() { }


  public async GuardarPedido(pedido: Pedido) {
    const pedidosGuardados = this.obtenerListaPedidos();
    if (this.validarPedido(pedido.cedula)) {
      pedido.id = pedidosGuardados.length + 1;
      pedido.productos = this.obtenerProductosSeleccionados();
      localStorage.removeItem('productosSeleccionados');
      pedidosGuardados.push(pedido);
      localStorage.setItem('pedidos', JSON.stringify(pedidosGuardados));
    } else {
      throw new Error('Error en el pedido');
    }
  }

  validarPedido(cedula: number) {
    return this.obtenerListaPedidos().filter(item => {
      return item.cedula === cedula;
    }).length === 0;
  }

  public obtenerListaPedidos(): Pedido[] {
    return localStorage.getItem('pedidos') != null ? (JSON.parse(localStorage.getItem('pedidos')) as any[]) : [];
  }

  public obtenerProductosSeleccionados(): Producto[] {
    const productos = localStorage.getItem('productosSeleccionados') != null ?
      (JSON.parse(localStorage.getItem('productosSeleccionados')) as Producto[]) : ([] as Producto[]);

    return productos;
  }
}
