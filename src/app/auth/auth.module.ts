import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { InfrastructureModule } from 'src/infrastructure/modules/infrastructure.module';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { UserService } from './services/user.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthResolver } from './resolvers/auth.resolver';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    InfrastructureModule
  ],
  declarations: [
    SignInComponent, 
    SignUpComponent,
    UserProfileComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
  ],
  providers: [
    ErrorInterceptor,
    UserService,
    AuthResolver
  ]
})
export class AuthModule { }
