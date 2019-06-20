import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { ProgressbarComponent } from 'src/app/shared/progressbar/progressbar.component';
import { Pedido } from './model/pedido';
import { PedidoService } from './services/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})

export class PedidoComponent implements OnInit {

  constructor(public router: Router, public dialog: MatDialog, private pedidoServices: PedidoService) { }
  Nombre: string;
  fileBase64: string;
  user: Pedido;
  ngOnInit() {
    this.user = new Pedido();
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 1000000) {
        this.openDialogAlert({
          title: '¡ATENCIÓN!',
          message: 'El tamaño del archivo es demasiado grande'
        });
        event.target.value = '';
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.user.pdfBase64 = String(reader.result);
      };
    }
  }

  openDialogAlert(alert: { title: string, message: string }): void {
    const dialogRefImg = this.dialog.open(AlertComponent, {
      width: '250px',
      data: alert
    });
  }

  guardarPedido() {
    // tslint:disable-next-line: triple-equals
    if (this.user.cedula != -1 && this.user.nombre != ''
      // tslint:disable-next-line: triple-equals
      && this.user.fecha != null && this.user.pdfBase64 != '' && this.user.ciudad != '') {
      this.openDialogProgress();
      this.pedidoServices.GuardarPedido(this.user).then(() => {
        this.dialog.closeAll();
        this.router.navigateByUrl('/pedidos/lista');
      }).catch(error => {
        this.openDialogAlert({
          title: '¡ATENCIÓN!',
          message: error.message
        });
      });
    } else {
      this.openDialogAlert({
        title: '¡ATENCIÓN!',
        message: 'Por favor ingrese los datos requeridos'
      });
    }
  }

  openDialogProgress(): void {
    const dialogRef = this.dialog.open(ProgressbarComponent, {
      width: '250px'
    });
  }

}
