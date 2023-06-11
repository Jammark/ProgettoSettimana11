import { Component, OnInit , OnDestroy} from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/model/movie';
import { environment } from 'src/environments/environment';
import { Genere } from 'src/app/model/genere';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.scss']
})
export class MoviedetailComponent implements OnInit, OnDestroy{

  movie?: Movie | null;
  imgUrl = environment.imageURL;
  generi: Genere[] = [];

  constructor(private srv: MoviesService){}

  ngOnInit(): void {
    this.srv.movie$.subscribe(item => this.movie = item);
    this.srv.getGeneri().subscribe(lista => {
      this.generi = lista.filter(item => this.movie && this.movie.genre_ids.find(id => id == item.id));
      console.table(this.generi);
    });
  }

  ngOnDestroy(): void {
    this.srv.deregister();
  }

  format():string{
    if(this.movie?.release_date){
     // return formatDate(this.movie.release_date, "dd MM yyyy", "it-IT");
   //  const options = {weekday: 'long',month: '2-digit', year: 'full'};
      var date = new Date(this.movie!.release_date).toLocaleDateString('it-IT', {weekday:'long', month:'long', day:'2-digit', year:'numeric'});
      console.log('data: '+date);
      return date;
    }else{
      return '';
    }

  }
}
