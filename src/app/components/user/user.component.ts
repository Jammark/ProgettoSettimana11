import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.interface';
import { Movie } from 'src/app/model/movie';
import { MoviesService } from 'src/app/service/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {


  user?: User | null;
  movies: Movie[] =[];
  imgUrl = environment.imageURL;

  constructor(private srv: UserService, private msrv: MoviesService) {}

  ngOnInit(): void {
      this.srv.getUser().subscribe(user => {
        this.user = user;

        this.msrv.getFavorites().subscribe(lista => {
          this.msrv.getMovies().subscribe(movies => {
            this.movies = movies.filter(m => lista.find(f => f.userId == user.id && f.movieId == m.id));
          });
      });
      });

  }
}
