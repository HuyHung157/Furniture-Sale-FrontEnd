import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { AboutComponent } from './modules/about/about.component';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { PolicyRegulationComponent } from './modules/policy-regulation/policy-regulation.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'policy-regulation',
        component: PolicyRegulationComponent
      },
      {
        path: 'cart',
        loadChildren: () => import('./modules/cart/cart.module').then((m) => m.CartModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
