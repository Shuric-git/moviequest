import { IPopular, IReqItem } from '../interfaces';

export class MovieDBService {
  _baseUrl: string = 'https://api.themoviedb.org/3/';

  _apiKey: string = 'f7e88ab48889b711cf5ed287d894ccbc';

  async fetcher(url: string, query: string) {
    let resString = `${this._baseUrl}${url}?api_key=${this._apiKey}&language=en-US`;
    if (url === 'search/movie') {
      resString += `&query=${query}&page=1&include_adult=false`;
    }
    let res = await fetch(resString);
    console.log(res);
    if (!res.ok) {
      throw new Error(`could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getPopular(): Promise<Array<IReqItem>> {
    const res: IPopular = await this.fetcher('movie/popular', '');
    return res.results;
  }

  async getSearch(query: string): Promise<Array<IReqItem>> {
    const res: IPopular = await this.fetcher('search/movie', query);
    return res.results;
  }

  async getTopRated(): Promise<Array<IReqItem>> {
    const res: IPopular = await this.fetcher('movie/top_rated', '');
    return res.results;
  }

  async getMovie(id: number) {
    return this.fetcher(`movie/${id}`, '');
  }
}
