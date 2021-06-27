import { NgModule } from '@angular/core';
import { CartComponent } from './components/cart.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'detail'
      },
      {
        path: 'detail',
        component: CartDetailComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // providers: [AuthenticatedGuard],
  exports: [RouterModule],
})
export class CartRoutingModule { }
