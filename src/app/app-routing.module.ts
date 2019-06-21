import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [{
  path: 'pedidos', loadChildren: () => import('./pedidos/pedidos.module').then(mod => mod.PedidosModule)
}, {
  path: '', component: ProductosComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
