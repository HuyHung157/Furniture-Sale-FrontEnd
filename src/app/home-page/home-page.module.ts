import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { HomeComponent } from './modules/home/home.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductDetailComponent } from './modules/product-detail/product-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { PolicyRegulationComponent } from './modules/policy-regulation/policy-regulation.component';
import { InfrastructureModule } from 'src/infrastructure/modules/infrastructure.module';


@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    ShoppingCartComponent,
    NavbarComponent,
    ProductDetailComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    PolicyRegulationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule,
    InfrastructureModule
  ]
})
export class HomePageModule { }
