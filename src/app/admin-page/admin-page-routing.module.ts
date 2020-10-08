import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // {
      //   path: 'auth',
      //   component:
      // },
      // {
      //   path: 'order',
      //   component:
      // },
      {
        path: '',
        component: AdminPageComponent
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
      },
      // {
      //   path: 'category',
      //   component:
      // }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
