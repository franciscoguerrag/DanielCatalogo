import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../productos/model/producto';

@Injectable()
export class ProductServices {

  private url: string;
  constructor(public http: HttpClient) {
    this.url = 'https://fvwzxk56cg.execute-api.us-east-1.amazonaws.com/mock/productos';
  }

  getProducts() {
    return this.http.get<Producto[]>(this.url).toPromise();
  }
}
