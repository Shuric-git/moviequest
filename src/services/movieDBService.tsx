import { IPopular, IReqItem } from '../interfaces';

export class MovieDBService {
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
  // https://api.themoviedb.org/3/authentication/guest_session/new?api_key=<<api_key>>
  async getGuestSession() {
    const request: any = await fetch(`${this._baseUrl}authentication/guest_session/new?api_key=${this._apiKey}`);
    return await request.json();
  }

  async rateMovie(movie_id: number, guestSession: string, rating: number) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${this._apiKey}&guest_session_id=${guestSession}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value: 7,
        }),
      }
    );
    // let result = await response.json();
    // console.log(result);
  }

  async getPopular(page: number): Promise<Array<IReqItem>> {
    const res: IPopular = await this.fetcher('movie/popular', '', page);
    return res.results;
  }

  async getSearch(query: string, page: number): Promise<Array<IReqItem>> {
    const res: any = await this.fetcher('search/movie', query, page);
    return res;
  }

  async getTopRated(page: number): Promise<Array<IReqItem>> {
    const res: any = await this.fetcher('movie/top_rated', '', page);
    return await res.json();
  }

  async getMovie(id: number, page: number) {
    return this.fetcher(`movie/${id}`, '', page);
  }
}
