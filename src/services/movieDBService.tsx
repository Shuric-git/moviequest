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

  async getPopular(page: number): Promise<Array<IReqItem>> {
    const res: IPopular = await this.fetcher('movie/popular', '', page);
    return res.results;
  }

  async getSearch(query: string, page: number): Promise<Array<IReqItem>> {
    const res: IPopular = await this.fetcher('search/movie', query, page);
    return res.results;
  }

  async getTopRated(page: number): Promise<Array<IReqItem>> {
    const res: IPopular = await this.fetcher('movie/top_rated', '', page);
    return res.results;
  }

  async getMovie(id: number, page: number) {
    return this.fetcher(`movie/${id}`, '', page);
  }
}
