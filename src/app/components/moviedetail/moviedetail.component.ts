import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/model/movie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.scss']
})
export class MoviedetailComponent implements OnInit{

  movie?: Movie | null;
  imgUrl = environment.imageURL;

  constructor(private srv: MoviesService){}

  ngOnInit(): void {
    this.srv.movie$.subscribe(item => this.movie = item);
  }

}
