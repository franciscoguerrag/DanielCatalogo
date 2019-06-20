import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/productos/model/producto';

@Component({
  selector: 'app-verimagen',
  templateUrl: './viewimage.component.html',
  styleUrls: ['./viewimage.component.scss']
})
export class ViewimageComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ViewimageComponent>,
              @Inject(MAT_DIALOG_DATA) public item: Producto) { }

  ngOnInit() {
  }

}
