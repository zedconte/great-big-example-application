import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/from';
var mongoose = require('mongoose');

import { Claim } from '../store/claim/claim.model';
import { ClaimRebuttal } from '../store/claim-rebuttal/claim-rebuttal.model';
import { Contact } from '../store/contact/contact.model';
import { Crisis } from '../store/crisis/crisis.model';
import { Hero } from '../store/hero/hero.model';
import { Note } from '../store/note/note.model';
import { Rebuttal } from '../store/rebuttal/rebuttal.model';
import { config } from '../../../config/config';

@Injectable()
export class DataService {
  private JSON_HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

  constructor(private http: Http) { }

  // login(payload) {
  //   return this.http.post(`${config.apiUrl}/auth/login`, payload, this.JSON_HEADER)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  getEntities(table: string): Observable<any[]> {
    return this.http.get(`${config.apiUrl}/${table}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getEntity(id: number | string, table: string): Observable<any> {
    return this.http.get(`${config.apiUrl}/${table}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // add(entity: any, table): Observable<any> {
  //   return this.http.post(`${config.apiUrl}/${table}`, this.prepareRecord(entity), this.JSON_HEADER)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  update(entity: any, table: string): Observable<any> {
    return this.http.patch(`${config.apiUrl}/${table}`, this.prepareRecord(entity), this.JSON_HEADER)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // addOrUpdate(entity: any, table): Observable<any> {
  //   return this.http.post(`${config.apiUrl}/${table}`, this.prepareRecord(entity), this.JSON_HEADER)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  prepareRecord(record: any) {
    // replace the id field with _id for Mongoose
    // console.log('record.id.toString(16)  ' + record.id.toString(16))
    var id = record.id //mongoose.Types.ObjectId(record.id.toString(16));
    let newRecord = Object.assign({}, record, { _id: id });
    delete newRecord.id;

    // remove the dirty field
    newRecord.dirty && delete newRecord.dirty;
    return JSON.stringify(newRecord);
  }

  extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    let body = res.json();

    console.log('RESPONSE    ' + JSON.stringify(res))

    let obj = body.data;
    if (!obj) {
      return {};
    }

    if (Array.isArray(obj)) {
      return obj.map(renameIdField);
    }

    return renameIdField(obj);

    // Mongoose uses the field _id instead of id
    function renameIdField(obj) {
      let id = obj._id;
      delete obj._id;
      return Object.assign({}, obj, { id });
    }

  }

  handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
