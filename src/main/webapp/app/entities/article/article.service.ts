import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Article } from './article.model';
import { DateUtils } from 'ng-jhipster';

@Injectable()
export class ArticleService {

  private resourceUrl = 'api/articles';
  private resourceSearchUrl = 'api/_search/articles';

  constructor(private http: Http, private dateUtils: DateUtils) { }

  create(article: Article): Observable<Article> {
    const copy = this.convert(article);
    return this.http.post(this.resourceUrl, copy).map((res: Response) => {
      return res.json();
    });
  }

  update(article: Article): Observable<Article> {
    const copy = this.convert(article);
    return this.http.put(this.resourceUrl, copy).map((res: Response) => {
      return res.json();
    });
  }

  find(id: number): Observable<Article> {
    return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
      const jsonResponse = res.json();
      jsonResponse.date = this.dateUtils
        .convertDateTimeFromServer(jsonResponse.date);
      return jsonResponse;
    });
  }

  query(req?: any): Observable<Response> {
    const options = this.createRequestOption(req);
    return this.http.get(this.resourceUrl, options)
      .map((res: Response) => this.convertResponse(res))
      ;
  }

  delete(id: number): Observable<Response> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  search(req?: any): Observable<Response> {
    const options = this.createRequestOption(req);
    return this.http.get(this.resourceSearchUrl, options)
      .map((res: any) => this.convertResponse(res))
      ;
  }

  private convertResponse(res: Response): Response {
    const jsonResponse = res.json();
    for (let i = 0; i < jsonResponse.length; i++) {
      jsonResponse[i].date = this.dateUtils
        .convertDateTimeFromServer(jsonResponse[i].date);
    }
    res.json().data = jsonResponse;
    return res;
  }

  private createRequestOption(req?: any): BaseRequestOptions {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
      const params: URLSearchParams = new URLSearchParams();
      params.set('page', req.page);
      params.set('size', req.size);
      if (req.sort) {
        params.paramsMap.set('sort', req.sort);
      }
      params.set('query', req.query);

      options.search = params;
    }
    return options;
  }

  private convert(article: Article): Article {
    const copy: Article = Object.assign({}, article);

    copy.date = this.dateUtils.toDate(article.date);
    copy.contentType = 'text';  // TODO: do something with this field
    return copy;
  }
}
