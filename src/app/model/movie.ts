export interface Movie {
  id:number;
  poster_path: string;

  adult: boolean;
      backdrop_path: string;
      genre_ids: number[];

      original_language: string;
      original_title: string,
      overview:  string;
      popularity: number;

      release_date: Date;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
}
