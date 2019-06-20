import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductServices } from '../providers/product-services.service';
import { Producto } from './model/producto';
import { ProgressbarComponent } from '../shared/progressbar/progressbar.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewimageComponent } from '../shared/viewimage/viewimage.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  seleccionados: Producto[];
  @ViewChild('productosSelect', { static: false }) productosSelect;
  constructor(private service: ProductServices,
    public dialog: MatDialog, public dialogImage: MatDialog,
    public router: Router
  ) {
    this.productos = new Array<Producto>();
    this.seleccionados = new Array<Producto>();
  }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.openDialogProgress();
    this.service.getProducts().then((res: Producto[]) => {
      this.productos = res;
      this.dialog.closeAll();
    });
  }

  openImage(item: Producto): void {
    const dialogRefImg = this.dialogImage.open(ViewimageComponent, {
      width: 'auto',
      height: 'auto',
      data: item
    });
  }

  openDialogProgress(): void {
    const dialogRef = this.dialog.open(ProgressbarComponent, {
      width: '250px'
    });
  }

  hacerPedido() {
    this.openDialogProgress();
    this.seleccionados = new Array<Producto>();
    (this.productosSelect.selectedOptions.selected as any[]).forEach(item => {
      this.seleccionados.push((item.value as Producto));
    });

    localStorage.setItem('productosSeleccionados', JSON.stringify(this.seleccionados));
    this.dialog.closeAll();
    this.router.navigateByUrl('/pedidos/lista');
  }

}
