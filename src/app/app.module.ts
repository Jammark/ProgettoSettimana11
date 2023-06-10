import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { MoviedetailComponent } from './components/moviedetail/moviedetail.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    UserComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    MoviedetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
