import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from 'src/environments/variables';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  private path = '/api';

  constructor(
    private http: HttpClient
  ) { }

  public get(uri: string) {
    return this.http.get(HOST + this.path + uri).pipe(map((res) => res));
  }

  public post(uri: string, input?) {
    return this.http.post(HOST + this.path + uri, input).pipe(map((res) => res));
  }

  public put(uri: string, input?) {
    return this.http.put(HOST + this.path + uri, JSON.stringify(input)).pipe(map((res) => res));
  }

  public delete(uri: string) {
    return this.http.delete(HOST + this.path + uri).pipe(map((res) => res));
  }

}
