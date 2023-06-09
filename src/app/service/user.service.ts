import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthData } from '../auth/auth-data.interface';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  utente?: AuthData | null;


  constructor(private http :HttpClient, private srv: AuthService) {
    this.srv.user$.subscribe(utente => {
      this.utente = utente;
    });
  }

  getUser():Observable<User>{

    return this.http.get<User>(`${environment.baseURL}users/${this.utente?.user.id}`)
  }
}
