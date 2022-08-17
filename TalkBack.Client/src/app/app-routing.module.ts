import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsingleComponent } from './components/chatsingle/chatsingle.component';
import { ContactComponent } from './components/contact/contact.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';

export const routes : Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login' , component:LoginComponent, canActivate:[LoginGuard]},
  {path:'signup', component:SignupComponent, canActivate:[LoginGuard]},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'help', component:HelpComponent,canActivate:[AuthGuard]},
  {path:'contact',component:ContactComponent,canActivate:[AuthGuard]},
  {path:'changePassword',component:ChangePasswordComponent, canActivate:[LoginGuard]},
  {path:'forgotPassword',component:ForgotPasswordComponent, canActivate:[LoginGuard]},
  {path:'room',component:ChatsingleComponent,canActivate:[AuthGuard]},
  {path:'**' , component:NotFoundComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
