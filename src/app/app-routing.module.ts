import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './components/user/user.component';
import { LoggedGuard } from './auth/logged.guard';

const rotte: Routes = [
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
  },
  {
      path: 'movies',
      component: MoviesComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'login',
      component: LoginComponent,
      canActivate: [LoggedGuard]
  },
  {
      path: 'register',
      component: RegisterComponent,
      canActivate: [LoggedGuard]
  },
  {
      path: 'profile',
      component: UserComponent,
      canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(rotte)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
