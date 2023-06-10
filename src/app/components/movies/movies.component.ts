import { Component, OnInit , AfterViewChecked, AfterContentChecked} from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/model/movie';
import { Favourite } from 'src/app/model/favourite';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, AfterContentChecked{

  movies: Movie[] = [];
  favourites : Favourite[] = [];
  imgUrl = environment.imageURL;
  charging: number[];
  favoriteUpdate: boolean = false;

  constructor(private srv: MoviesService, private router: Router){
    this.charging = [];
  }

  ngAfterContentChecked(): void {
    this.srv.movie$.subscribe(item => {
      if(item && this.favoriteUpdate){
        console.log('movie$ sub ' + item!.id);
        this.favoriteUpdate = false;
        this.stopCharge(item!);
      }

    });
  }

  ngOnInit(): void {
    this.srv.getMovies().subscribe(lista => this.movies = lista);
    this.srv.getFavorites().subscribe(lista => {
      this.favourites = lista
      console.log('ricaricata lista favoriti.');
    });
  }

ngAfterViewChecked(): void {

}

  register(item: Movie){
    this.srv.register(item);
  }

  isFavourite(item: Movie):boolean{
    return this.getFavourite(item)? true : false;
  }

  getFavourite(item: Movie):Favourite | undefined{
    return this.favourites.find(fav => fav.movieId == item.id)
  }

  toggleFavourite(item: Movie){
    console.log('toggle favourite');
    let fav = this.getFavourite(item);
    this.charging.push(item.id);
    if(fav){
      this.srv.removeFavourite(fav).subscribe(res =>{
        this.ricaricaFavoriti();
        console.table(res);
      }, err=> {
        alert('errore aggiornamento favoriti.');
        console.error(err);
      }, () => {

        this.srv.register(item);
      });
    }else{
      this.srv.addFavourite(item).subscribe(res =>{
        this.ricaricaFavoriti();
        console.table(res);
      }, err=> {
        alert('errore aggiornamento favoriti.');
        console.error(err);
      }, () => {

        this.srv.register(item);
      });
    }



  }

  stopCharge(item: Movie):void{
    this.charging.splice(this.charging.indexOf(item.id), 1);
  }

  isCharging(item: Movie):boolean{
    return this.charging.indexOf(item.id) != -1;
  }

  ricaricaFavoriti():void{
    this.srv.getFavorites().subscribe(lista => {

      this.favourites = lista
      this.favoriteUpdate = true;
      console.log('ricaricata lista favoriti.');


    });
  }

  getImgPath(item: Movie):string{
    return this.isFavourite(item)? '../../../assets/img/like.svg' : '../../../assets/img/likeoff.svg';
  }

  dettagli(item:Movie):void{
    this.srv.register(item);
    this.router.navigate(['dettaglio']);
  }

}
