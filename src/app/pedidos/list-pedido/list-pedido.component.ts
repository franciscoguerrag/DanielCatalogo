import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PedidoService } from '../pedido/services/pedidos.service';
import { Pedido } from '../pedido/model/pedido';

@Component({
  selector: 'app-list-pedido',
  templateUrl: './list-pedido.component.html',
  styleUrls: ['./list-pedido.component.scss']
})
export class ListPedidoComponent implements OnInit {

  dataSource: MatTableDataSource<Pedido>;
  displayedColumns: string[] = ['id', 'nombre', 'ciudad', 'fecha', 'CantProductos'];
  allData: Pedido[];
  constructor(public router: Router, private pedidoService: PedidoService) { }

  ngOnInit() {
    this.allData = this.pedidoService.obtenerListaPedidos();
    this.dataSource = new MatTableDataSource(this.allData);
  }

  crearPedido() {
    this.router.navigateByUrl('/pedidos/pedido');
  }

  applyFilter(filterValue: any) {
    if (filterValue !== '') {
      this.dataSource = new MatTableDataSource(this.allData.filter(item => {
        return item.id === Number(filterValue);
      }));
    } else {
      this.dataSource = new MatTableDataSource(this.allData);
    }
  }
  getCantidad(item: Pedido) {
    return item.productos.length;
  }
}
