import { IPopular, IReqItem } from '../interfaces';

class MovieDBService {
  _baseUrl: string = 'https://api.themoviedb.org/3/';

  _apiKey: string = 'f7e88ab48889b711cf5ed287d894ccbc';

  async fetcher(url: string, query: string, page: number) {
    let resString = `${this._baseUrl}${url}?api_key=${this._apiKey}&language=en-US`;
    if (url === 'search/movie') {
      resString += `&query=${query}&page=${page}&include_adult=false`;
    }
    let res = await fetch(resString);
    if (!res.ok) {
      throw new Error(`could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getGuestSession() {
    const response = await fetch(`${this._baseUrl}authentication/guest_session/new?api_key=${this._apiKey}`);
    return await response.json();
  }

  async rateMovie(movie_id: number, rating: number, guestSession: string) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${this._apiKey}&guest_session_id=${guestSession}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value: rating,
        }),
      }
    );
    return response;
  }

  async getPopular(page: number): Promise<Array<IReqItem>> {
    const res: IPopular = await this.fetcher('movie/popular', '', page);
    return res.results;
  }

  async getSearch(query: string, page: number): Promise<IPopular> {
    const res = await this.fetcher('search/movie', query, page);
    return res;
  }

  async getTopRated(page: number): Promise<Array<IReqItem>> {
    const res = await this.fetcher('movie/top_rated', '', page);
    return res;
  }

  async getRated(session: string) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${session}/rated/movies?api_key=${this._apiKey}&language=en-US&sort_by=created_at.asc`
    );
    return await res.json();
  }

  async getMovie(id: number, page: number) {
    return this.fetcher(`movie/${id}`, '', page);
  }

  async getGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}&language=en-US`);
    return await res.json();
  }
}

export const movieDBService = new MovieDBService();
