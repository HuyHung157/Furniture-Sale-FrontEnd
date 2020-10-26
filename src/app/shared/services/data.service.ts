import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from 'src/environments/variables';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  public get(uri: string) {
    return this.http.get(HOST + uri).pipe(map((res) => res));
  }

  public post(uri: string) {
    return this.http.get(HOST + uri).pipe(map((res) => res));
  }

  public delete(uri: string) {
    return this.http.get(HOST + uri).pipe(map((res) => res));
  }
}
