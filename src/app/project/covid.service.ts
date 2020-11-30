import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  getCovidStatics(): Observable<any>{
        return this.http.get<any>('https://hpb.health.gov.lk/api/get-current-statistical/')
  }
  getCountries(): Observable<any>{
    return this.http.get<any>('https://api.covid19api.com/countries')
}
}



