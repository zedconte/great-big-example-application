import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';
import { AppConfig } from '../../../../app.config';

@Injectable()
export class ApiService {
    constructor(
        private http: Http,
        private jwtService: JwtService, private config: AppConfig
    ) { }

    private setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (this.jwtService.getToken()) {
            headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
        }
        return new Headers(headersConfig);
    }

    private formatErrors(error: any) {
        return Observable.throw(error.json());
    }

    get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
        return this.http.get(`${this.config.conduitApiUrl}${path}`, { headers: this.setHeaders(), search: params })
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${this.config.conduitApiUrl}${path}`,
            JSON.stringify(body),
            { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${this.config.conduitApiUrl}${path}`,
            JSON.stringify(body),
            { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${this.config.conduitApiUrl}${path}`,
            { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }
}
