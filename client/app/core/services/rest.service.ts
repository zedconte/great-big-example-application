import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
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
import { FeathersService } from './feathers.service';

@Injectable()
export class RESTService {
  public restApp: any
  private JSON_HEADER = { headers: new Headers({ 'Content-Type': 'application/json', 'Accepts': 'application/json' }) };

  constructor(private http: Http, feathersService: FeathersService) {
    this.restApp = feathersService.restApp;
  }

  // login(payload) {
  //   return this.http.post(`${config.apiUrl}/auth/login`, payload, this.JSON_HEADER)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  getEntities(table: string): Observable<any[]> {
    console.log('RESTService.getEntities ' + table);
    const entities = this.restApp.service(table);
    return Observable.from(
      this.restApp.authenticate()
        .then(() => {
          return entities.find()
            .then((data, err) => this.extractData(data))
            .catch(this.handleError);
        })
        .catch(this.handleError));
  }

  getEntity(id: number | string, table: string): Observable<any> {
    return Observable.from(this.restApp.authenticate().then(() => {
      const entities = this.restApp.service(table);
      return entities.find(`${config.apiUrl}/${table}/${id}`)
        .then((data, err) => {
          return this.extractData(data)
        });
    })
      .catch(this.handleError));
  }

  add(entity: any, table): Observable<any> {
    return Observable.from(this.restApp.authenticate().then(() => {
      const entities = this.restApp.service(table);
      return entities.create(this.prepareRecord(entity))
        .then((data, err) => {
          return this.extractData(data)
        });
    })
      .catch(this.handleError));
  }

  update(entity: any, table: string): Observable<any> {
    console.log('RESTService.update ' + JSON.stringify(entity))
    return Observable.from(this.restApp.authenticate()
      .then(() => {
        const entities = this.restApp.service(table);
        let obj = this.prepareRecord(entity);
        return entities.patch(obj._id, obj)
          .then((data, err) => this.extractData(data))
          .catch(this.handleError);
      })
      .catch(this.handleError));
  }

  prepareRecord(record: any) {
    // replace the id field with _id for Mongoose
    let id = record.id
    let newRecord = Object.assign({}, record, { _id: id });
    delete newRecord.id;

    // remove the dirty field
    newRecord.dirty && delete newRecord.dirty;
    return newRecord;
  }

  extractData(res: any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    console.log('RESPONSE    ' + JSON.stringify(res))

    let obj = res.data || res;
    if (!obj) {
      return {};
    }

    if (Array.isArray(obj)) {
      return obj.map(fixUpFields);
    }

    return fixUpFields(obj);

    // Mongoose uses the field _id instead of id
    function fixUpFields(obj) {
      obj.__v && delete obj.__v; // I don't know what this is for
      obj.updatedAt && delete obj.updatedAt;
      obj.createdAt && delete obj.createdAt;
      let id = obj._id;
      delete obj._id;
      return Object.assign({}, obj, { id });
    }

  }

  // extractDataOld(res: Response) {
  //   if (res.status < 200 || res.status >= 300) {
  //     throw new Error('Bad response status: ' + res.status);
  //   }

  //   let body = res.json();

  //   console.log('RESPONSE    ' + JSON.stringify(res))

  //   let obj = body.data || body;  // TODO: I don't know why sometimes body is the object and sometimes body.data is
  //   if (!obj) {
  //     return {};
  //   }

  //   if (Array.isArray(obj)) {
  //     return obj.map(fixUpFields);
  //   }

  //   return fixUpFields(obj);

  //   // Mongoose uses the field _id instead of id
  //   function fixUpFields(obj) {
  //     obj.__v && delete obj.__v; // I don't know what this is for
  //     obj.updatedAt && delete obj.updatedAt;
  //     obj.createdAt && delete obj.createdAt;
  //     let id = obj._id;
  //     delete obj._id;
  //     return Object.assign({}, obj, { id });
  //   }

  // }

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
