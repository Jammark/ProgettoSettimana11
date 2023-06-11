import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { environment } from 'src/environments/environment';
import { Favourite } from '../model/favourite';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Genere } from '../model/genere';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movieSubj = new BehaviorSubject<null | Movie>(null);
  movie$ = this.movieSubj.asObservable();

  userId?: number;

  constructor(private http: HttpClient,private srv: AuthService) {
      this.srv.user$.subscribe(user => this.userId = user?.user.id);
  }

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${environment.baseURL}movie/popular`);
  }

  getFavorites():Observable<Favourite[]>{
    let userId = this.userId ? this.userId : -1;
    return this.http.get<Favourite[]>(`${environment.baseURL}movie/favourite?userId=${userId}`)
  }

  getGeneri():Observable<Genere[]>{
    return this.http.get<Genere[]>(`${environment.baseURL}genres`);
  }

  addFavourite(item: Movie):Observable<boolean>{
    let fav = {
      userId: this.userId,
      movieId: item.id
    };
    return this.http.post<boolean>(`${environment.baseURL}movie/favourite`, fav);
  }

  removeFavourite(item: Favourite):Observable<boolean>{
    return this.http.delete<boolean>(`${environment.baseURL}movie/favourite/${item.id}`);
  }

  register(item: Movie){
    this.movieSubj.next(item);
  }

  deregister(){
    this.movieSubj.next(null);
  }
}
