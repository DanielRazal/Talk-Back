import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HelpComponent } from './components/help/help.component';
import { DefaultLayoutSiteComponent } from './components/default-layout-site/default-layout-site.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GameComponent } from './components/game/game.component';
import { DefaultLayoutLoginComponent } from './components/default-layout-login/default-layout-login.component';
import { BoardComponent } from './components/board/board.component';
import { ContactComponent } from './components/contact/contact.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MatSliderModule } from '@angular/material/slider';
import { ChatsingleComponent } from './components/chatsingle/chatsingle.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HelpComponent,
    DefaultLayoutSiteComponent,
    NotFoundComponent,
    GameComponent,
    DefaultLayoutLoginComponent,
    BoardComponent,
    ContactComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ChatsingleComponent
    ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSliderModule
  ],
  providers: [
    FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
